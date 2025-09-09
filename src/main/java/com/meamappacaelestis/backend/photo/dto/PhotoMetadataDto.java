package com.meamappacaelestis.backend.photo.dto;

import com.meamappacaelestis.backend.photo.domain.Photo;

import java.time.LocalDateTime;

public record PhotoMetadataDto(
        Long id,
        String filename,
        Double lat,
        Double lon,
        String cameraMake,
        String cameraModel,
        Double focalMm,
        Integer iso,
        Double exposureS,
        Double apertureF,
        Double exposureB,
        Integer whiteBalance,
        LocalDateTime captureAt,

        String addressName,
        String sido
) {
    public PhotoMetadataDto(Photo photo) {
        this(
                photo.getId(), photo.getFilename(), photo.getLat(), photo.getLon(), photo.getCameraMake(), photo.getCameraModel(), photo.getFocalMm(), photo.getIso(),
                photo.getExposureS(), photo.getApertureF(), photo.getExposureB(), photo.getWhiteBalance(), photo.getCaptureAt(), photo.getLocation().getAddressName(), photo.getLocation().getSido()
        );

    }
}
