package com.meamappacaelestis.backend.user.dto;

public record LocationResponseDto(
        Double lat,
        Double lon,
        String addressName
) {
}
