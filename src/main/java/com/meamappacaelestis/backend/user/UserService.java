package com.meamappacaelestis.backend.user;

import com.meamappacaelestis.backend.location.domain.Location;
import com.meamappacaelestis.backend.location.LocationService;
import com.meamappacaelestis.backend.user.domain.User;
import com.meamappacaelestis.backend.user.exception.UserNotFoundException;
import com.meamappacaelestis.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final LocationService locationService;

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
    }



    public Location updateLocation(String email, Double lat, Double lon) {
        Location location = locationService.findOrCreateByAddress(lat, lon);
        User user = findByEmail(email);
        user.updateLocation(lat, lon, location);
        return location;
    }

    public Location getLocation(String email) {
        User user = findByEmail(email);
        return locationService.findById(user.getLocation().getId());
    }
}
