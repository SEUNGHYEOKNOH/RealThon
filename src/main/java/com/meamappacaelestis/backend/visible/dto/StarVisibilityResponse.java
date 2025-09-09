package com.meamappacaelestis.backend.visible.dto;

import java.time.OffsetDateTime;

public record StarVisibilityResponse(
        int score,                 // 0~10
        double cloudCoverPercent,  // 선택된 시각의 구름량(%)
        double lightPollution,     // 네 서비스가 준 광해값
        String grade,              // "최상/좋음/보통/나쁨/매우나쁨"
        OffsetDateTime sampleTime  // 구름값이 측정된 시간(Asia/Seoul)
) {}