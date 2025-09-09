package com.meamappacaelestis.backend.location.dto;

public record LocationResult(
        String addressName,
        String regionType,
        String code,
        String depth1,String depth2, String depth3, String depth4

) {
}
