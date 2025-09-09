package com.meamappacaelestis.backend.infra.kakaoMap;

import java.util.List;

public record KakaoLocationResponse(
        Meta meta,
        List<Document> documents
) {
}
