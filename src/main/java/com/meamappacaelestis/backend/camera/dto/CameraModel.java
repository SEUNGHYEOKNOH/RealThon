package com.meamappacaelestis.backend.camera.dto;

import com.meamappacaelestis.backend.camera.domain.Brand;
import com.meamappacaelestis.backend.camera.domain.Device;

public record CameraModel(
        Long id,
        Brand brand,
        String model

) {
    public CameraModel(Device device) {
        this(device.getId(), device.getBrand(), device.getModel());
    }
}
