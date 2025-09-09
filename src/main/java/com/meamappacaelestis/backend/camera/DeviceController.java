package com.meamappacaelestis.backend.camera;

import com.meamappacaelestis.backend.camera.domain.CameraPreset;
import com.meamappacaelestis.backend.camera.domain.Device;
import com.meamappacaelestis.backend.camera.domain.Target;
import com.meamappacaelestis.backend.camera.dto.CameraModel;
import com.meamappacaelestis.backend.camera.dto.CameraModelList;
import com.meamappacaelestis.backend.camera.dto.CameraPresetResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cameras")
public class DeviceController {

    private final DeviceService deviceService;

    @GetMapping("/models")
    public ResponseEntity<CameraModelList> getCameraModels() {
        List<Device> devices = deviceService.findAllDevice();
        List<CameraModel> models = devices.stream().map(d -> new CameraModel(d.getId(), d.getBrand(), d.getModel())).toList();
        return ResponseEntity.ok(new CameraModelList(models, models.size()));
    }

    @GetMapping("/models/{id}")
    public ResponseEntity<CameraPresetResponse> getCameraPreset(
            @RequestParam(defaultValue = "CONSTELLATION", required = false) Target target,
            @PathVariable Long id
    ) {
        CameraPreset preset = deviceService.findCameraPresetByTarget(id, target);
        return ResponseEntity.ok(new CameraPresetResponse(preset));
    }
}
