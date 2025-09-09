package com.meamappacaelestis.backend.infra.kakaoMap;

import com.meamappacaelestis.backend.location.dto.LocationResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
@Slf4j
@RequiredArgsConstructor
public class KakaoLocationService {

    private final RestTemplate kakaoRestTemplate;

    @Value("${location.kakao.key}")
    private String key;

    @Value("${location.kakao.base-url}")
    private String baseUrl;

    @Value("${location.kakao.coord2address-path}")
    private String path;
    public LocationResult getAddress(double lat, double lon) {
        URI uri = UriComponentsBuilder.fromUriString(baseUrl)
                .path(path)
                .queryParam("x", lon)
                .queryParam("y", lat)
                .build(true)
                .toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + key);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<KakaoLocationResponse> result = kakaoRestTemplate.exchange(uri, HttpMethod.GET, entity, KakaoLocationResponse.class);

        KakaoLocationResponse body = result.getBody();
        if (!result.getStatusCode().is2xxSuccessful() || body == null || body.documents() == null) {
            throw new IllegalArgumentException("카카오 로컬 api 호출 실패");
        }

        // 행정동 우선 선택 없으면 법정동
        Document document = body.documents().stream().filter(d1 -> "H".equals(d1.region_type())).findFirst().orElseGet(
                () -> body.documents().stream().filter(d -> "B".equals(d.region_type())).findFirst().orElseThrow(
                        () -> new IllegalArgumentException("적합한 동 정보를 찾을수 없습니다. ")));

        return new LocationResult(
                document.address_name(), document.region_type(), document.code(),
                document.region_1depth_name(), document.region_2depth_name(),
                document.region_3depth_name(), document.region_4depth_name()
        );


    }
}
