package com.meamappacaelestis.backend.photo.infra;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ParsedMeta {

    private Double focalMm;
    private Integer iso;
    private Double exposureS;
    private Double apertureF;
    private Double exposureB;
    private Integer whiteBalance;
    private LocalDateTime captureAt;
    private Double lat;
    private Double lon;
    private String cameraMake;
    private String cameraModel;

}
