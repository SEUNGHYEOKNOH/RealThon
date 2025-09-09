package com.meamappacaelestis.backend.visible.controller;


import com.meamappacaelestis.backend.visible.dto.StarVisibilityResponse;
import com.meamappacaelestis.backend.visible.service.StarVisibilityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/stars")
@RequiredArgsConstructor
@Tag(name = "별 관측 가능성 API", description = "별 관측 가능성 관련 API")
public class StarVisibilityController {
    private final StarVisibilityService service;

    /**
     * 예: /api/stars/visibility?lat=37.57&lon=126.98&hoursAhead=0
     */
    @GetMapping("/visibility")
    @Operation(
            summary = "별 관측 가능성 조회",
            description = "주어진 위도(lat)와 경도(lon)에 대해 별 관측 가능성을 조회합니다. " +
                    "hoursAhead 파라미터를 통해 몇 시간 후의 관측 가능성을 조회할지 지정할 수 있습니다." +
                    " 가충치: 구름량(60%) + 광해량(40%)"
    )
    public Mono<StarVisibilityResponse> visibility(@RequestParam double lat,
                                                   @RequestParam double lon,
                                                   @RequestParam(defaultValue = "0") int hoursAhead) {
        return service.getScore(lat, lon, hoursAhead);
    }
}