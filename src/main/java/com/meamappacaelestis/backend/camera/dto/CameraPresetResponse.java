package com.meamappacaelestis.backend.camera.dto;

import com.meamappacaelestis.backend.camera.domain.CameraPreset;
import com.meamappacaelestis.backend.camera.domain.Target;

public record CameraPresetResponse(
        String cameraBrand,
        String cameraModel,
        Target target,
        Double focalMm,
        Integer iso,
        Double exposureS,
        Double apertureF,
        Double exposureB,
        Integer whiteBalance,
        String notes
) {

    public CameraPresetResponse(CameraPreset preset) {
        this(preset.getDevice().getBrand().toString(), preset.getDevice().getModel(),
                preset.getTarget(), preset.getFocalMm(), preset.getIso(), preset.getExposureS(), preset.getApertureF(),
                preset.getExposureB(), preset.getWhiteBalance(), preset.getNotes());

    }
}
