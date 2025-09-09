package com.meamappacaelestis.backend.photo.dto;

import com.meamappacaelestis.backend.photo.domain.Photo;

public record PhotoSimpleDto(
        Long id,
        String comment
) {
    public PhotoSimpleDto(Photo photo) {
        this(photo.getId(), photo.getComment());
    }
}
