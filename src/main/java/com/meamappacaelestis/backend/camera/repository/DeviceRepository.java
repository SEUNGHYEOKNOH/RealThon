package com.meamappacaelestis.backend.camera.repository;

import com.meamappacaelestis.backend.camera.domain.Device;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device, Long> {
}
