package com.meamappacaelestis.backend.location;

import com.meamappacaelestis.backend.location.domain.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findByAddressName(String addressName);
}
