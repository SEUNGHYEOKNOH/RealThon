package com.meamappacaelestis.backend.photo.dto;

import com.meamappacaelestis.backend.photo.domain.Photo;

import java.time.LocalDateTime;

public record PhotoUploadResponse(
        Long id,
        String filename,
        LocalDateTime captureAt,
        String comment
) {

    public PhotoUploadResponse(Photo photo) {
        this(
                photo.getId(),
                photo.getFilename(),
                photo.getCaptureAt(),
                photo.getComment()
        );
    }
}
