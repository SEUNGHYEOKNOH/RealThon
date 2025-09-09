package com.meamappacaelestis.backend.user;

import com.meamappacaelestis.backend.location.domain.Location;
import com.meamappacaelestis.backend.user.dto.LocationRequestDto;
import com.meamappacaelestis.backend.user.dto.LocationResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PatchMapping("/location")
    public ResponseEntity<LocationResponseDto> updateLocation(
            @AuthenticationPrincipal UserDetails userinfo,
            @RequestBody LocationRequestDto requestDto) {
        Location location = userService.updateLocation(userinfo.getUsername(), requestDto.lat(), requestDto.lon());
        return ResponseEntity.ok(new LocationResponseDto(location.getLat(), location.getLon(), location.getAddressName()));
    }

    @GetMapping("/location")
    public ResponseEntity<LocationResponseDto> getLocation(
            @AuthenticationPrincipal UserDetails userInfo) {
        Location location = userService.getLocation(userInfo.getUsername());
        return ResponseEntity.ok(new LocationResponseDto(location.getLat(), location.getLon(), location.getAddressName()));
    }


}
