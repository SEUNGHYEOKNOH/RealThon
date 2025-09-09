package com.meamappacaelestis.backend.camera.dto;

import java.util.List;

public record CameraModelList(
        List<CameraModel> models,
        int totalCount
) {
}
