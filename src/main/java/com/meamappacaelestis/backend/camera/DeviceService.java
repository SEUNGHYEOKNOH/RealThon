package com.meamappacaelestis.backend.camera;

import com.meamappacaelestis.backend.camera.domain.CameraPreset;
import com.meamappacaelestis.backend.camera.domain.Device;
import com.meamappacaelestis.backend.camera.domain.Target;
import com.meamappacaelestis.backend.camera.repository.CameraPresetRepository;
import com.meamappacaelestis.backend.camera.repository.DeviceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DeviceService {

    private final DeviceRepository deviceRepository;
    private final CameraPresetRepository cameraPresetRepository;

    public List<Device> findAllDevice() {
        return deviceRepository.findAll();
    }

    public CameraPreset findCameraPresetByTarget(Long deviceId, Target target) {
        return cameraPresetRepository.findFirstByDevice_IdAndTarget(deviceId, target).orElseThrow(CameraPresetNotFoundException::new);
    }
}
