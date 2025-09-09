package com.meamappacaelestis.backend.visible.service;

import com.meamappacaelestis.backend.light.dto.LightPollutionInfo;
import com.meamappacaelestis.backend.light.service.LightPollutionService;
import com.meamappacaelestis.backend.visible.dto.StarVisibilityResponse;
import com.meamappacaelestis.backend.visible.dto.StarVisibilityResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StarVisibilityService {

    private final WebClient openMeteo = WebClient.builder()
            .baseUrl("https://api.open-meteo.com")
            .build();

    private final LightPollutionService lightPollutionService;

    // 광해 스케일(필요시 조정)
    private static final double LP_MIN = 0.0;
    private static final double LP_MAX = 100.0;

    /**
     * hoursAhead: 0이면 현재시각 슬롯, 1이면 +1시간 슬롯...
     */
    public Mono<StarVisibilityResponse> getScore(double lat, double lon, int hoursAhead) {

        // 1) 구름량 호출 (Open-Meteo)
        Mono<Map<String, Object>> cloudMono = openMeteo.get()
                .uri(uri -> uri.path("/v1/forecast")
                        .queryParam("latitude", lat)
                        .queryParam("longitude", lon)
                        .queryParam("hourly", "cloud_cover")
                        .queryParam("timezone", "Asia/Seoul")
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<>() {});

        // 2) 광해값 (네 서비스는 현재 블로킹이므로 Mono로 감싸서 실행)
        Mono<LightPollutionInfo> lpMono = Mono.fromCallable(() -> lightPollutionService.fetch(lat, lon));

        return Mono.zip(cloudMono, lpMono)
                .map(tuple -> {
                    Map<String, Object> cloudMap = tuple.getT1();
                    LightPollutionInfo lp = tuple.getT2();

                    var extracted = extractCloud(cloudMap, hoursAhead);
                    double cloudPct = extracted.cloudPct();
                    OffsetDateTime sampleTime = extracted.sampleTime();

                    // 구름 0% -> 10점, 100% -> 0점
                    double cloudComponent = 10.0 * (1.0 - (cloudPct / 100.0));

                    // 광해 정규화(값이 클수록 밝다 → 감점)
                    double lpVal = lp.value();
                    double normLp = clamp((lpVal - LP_MIN) / (LP_MAX - LP_MIN), 0.0, 1.0);
                    double lpComponent = 10.0 * (1.0 - normLp);

                    // 가중합 (구름 60%, 광해 40%)
                    double rawScore = 0.6 * cloudComponent + 0.4 * lpComponent;
                    int finalScore = (int) Math.round(clamp(rawScore, 0.0, 10.0));

                    String grade = toGrade(finalScore);

                    return new StarVisibilityResponse(
                            finalScore,
                            round1(cloudPct),
                            round1(lpVal),
                            grade,
                            sampleTime
                    );
                });
    }

    private record CloudExtract(double cloudPct, OffsetDateTime sampleTime) {}

    @SuppressWarnings("unchecked")
    private CloudExtract extractCloud(Map<String, Object> cloudMap, int hoursAhead) {
        Map<String, Object> hourly = (Map<String, Object>) cloudMap.get("hourly");
        if (hourly == null) throw new IllegalStateException("Open-Meteo 응답에 hourly가 없습니다.");

        List<String> times = (List<String>) hourly.get("time");
        List<Number> clouds = (List<Number>) hourly.get("cloud_cover");
        if (times == null || clouds == null || times.isEmpty() || clouds.isEmpty())
            throw new IllegalStateException("Open-Meteo 응답에 time/cloud_cover 데이터가 비어있습니다.");

        int idx = Math.min(Math.max(0, hoursAhead), Math.min(times.size(), clouds.size()) - 1);

        String iso = times.get(idx);              // 예: "2025-08-15T22:00"
        double cloudPct = clouds.get(idx).doubleValue();

        // Asia/Seoul 오프셋으로 표기
        OffsetDateTime sampleTime = OffsetDateTime
                .parse(iso + ":00+09:00") // 분:초 보정
                .withOffsetSameInstant(ZoneId.of("Asia/Seoul").getRules().getOffset(OffsetDateTime.now().toInstant()));

        return new CloudExtract(cloudPct, sampleTime);
    }

    private static double clamp(double v, double min, double max) {
        return Math.max(min, Math.min(max, v));
    }

    private static double round1(double v) {
        return Math.round(v * 10.0) / 10.0;
    }

    private static String toGrade(int score) {
        if (score >= 9) return "최상";
        if (score >= 7) return "좋음";
        if (score >= 5) return "보통";
        if (score >= 3) return "나쁨";
        return "매우나쁨";
    }
}
