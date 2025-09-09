package com.meamappacaelestis.backend.light.service;

import com.meamappacaelestis.backend.light.dto.LightPollutionApiResponse;
import com.meamappacaelestis.backend.light.dto.LightPollutionInfo;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.util.retry.Retry;

import java.time.Duration;

@Service
public class LightPollutionService {
    private final WebClient lightPollutionWebClient;

    public LightPollutionService(WebClient lightPollutionWebClient) {
        this.lightPollutionWebClient = lightPollutionWebClient;
    }

    public LightPollutionInfo fetch(double lat, double lon) {
        LightPollutionApiResponse api = lightPollutionWebClient.get()
                .uri(uri -> uri.path("/api/lightpollution")
                        .queryParam("lat", lat)
                        .queryParam("lon", lon)
                        .build())
                .retrieve()
                .bodyToMono(LightPollutionApiResponse.class)
                .retryWhen(Retry.backoff(2, Duration.ofMillis(200)))
                .block();

        if (api == null || api.getLightPollutionInfo() == null) {
            throw new IllegalStateException("광해지도 API 응답이 비어있습니다.");
        }

        double value = api.getLightPollutionInfo().getValue();
        // 필요하면 소수 1자리 반올림
        double rounded = Math.round(value * 10.0) / 10.0;
        return new LightPollutionInfo(rounded);
    }
}
