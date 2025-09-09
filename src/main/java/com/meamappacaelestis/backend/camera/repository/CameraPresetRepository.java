package com.meamappacaelestis.backend.camera.repository;

import com.meamappacaelestis.backend.camera.domain.CameraPreset;
import com.meamappacaelestis.backend.camera.domain.Target;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CameraPresetRepository extends JpaRepository<CameraPreset, Long> {
    @EntityGraph(attributePaths = "device")
    Optional<CameraPreset> findFirstByDevice_IdAndTarget(Long deviceId, Target target);
}
