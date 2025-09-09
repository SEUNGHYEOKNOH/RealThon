package com.meamappacaelestis.backend.infra.kakaoMap;

public record Document(
        String region_type,          // "B"(법정동) or "H"(행정동)
        String address_name,         // 전체 동 이름
        String region_1depth_name,   // 시/도
        String region_2depth_name,   // 시/군/구
        String region_3depth_name,   // 읍/면/동
        String region_4depth_name,   // 리(없을 수 있음)
        String code,                 // 행정코드
        double x,                    // 경도
        double y                     // 위도
) {
}
