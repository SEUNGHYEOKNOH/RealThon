package com.meamappacaelestis.backend.light.controller;


import com.meamappacaelestis.backend.light.dto.LightPollutionInfo;
import com.meamappacaelestis.backend.light.service.LightPollutionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lightpollution")
@RequiredArgsConstructor
@Tag(name = "Light Pollution API", description = "API for fetching light pollution data based on geographic coordinates")
public class LightPollutionController {

    private final LightPollutionService service;

    @Operation(
            summary = "광해지도 조회",
            description = "위도와 경도를 기반으로 광해 정보를 조회합니다. " +
                    "위도(lat)와 경도(lon)를 쿼리 파라미터로 전달해야 합니다."
    )
    @GetMapping
    public ResponseEntity<LightPollutionInfo> get(@RequestParam double lat,
                                                  @RequestParam double lon) {
        return ResponseEntity.ok(service.fetch(lat, lon));
    }
}