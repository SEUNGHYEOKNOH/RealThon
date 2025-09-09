package com.meamappacaelestis.backend.location;

import com.meamappacaelestis.backend.infra.kakaoMap.KakaoLocationService;
import com.meamappacaelestis.backend.location.domain.Location;
import com.meamappacaelestis.backend.location.dto.LocationResult;
import com.meamappacaelestis.backend.location.exception.LocationNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class LocationService {

    private final LocationRepository locationRepository;
    private final KakaoLocationService kakaoLocationService;

    public Location findOrCreateByAddress(double lat, double lon) {
        LocationResult address = kakaoLocationService.getAddress(lat, lon);

        if (address == null) {
            throw new IllegalArgumentException("주소가 없습니다.");
        }

        String normalizedAddress = address.addressName().trim().replaceAll("\\s+", " ");

        return locationRepository.findByAddressName(normalizedAddress).orElseGet(
                () -> {
                    Location location = Location.create(lat, lon, address.addressName(), address.regionType(), address.code(), address.depth1(), address.depth2(), address.depth3(), address.depth4());
                    return locationRepository.save(location);
                }
        );
    }

    public Location findById(Long id) {
        return locationRepository.findById(id).orElseThrow(LocationNotFoundException::new);
    }

}
