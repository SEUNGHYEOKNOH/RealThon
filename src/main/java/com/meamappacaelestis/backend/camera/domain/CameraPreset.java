package com.meamappacaelestis.backend.camera.domain;

import jakarta.persistence.*;
import lombok.Getter;

import static jakarta.persistence.FetchType.*;

@Entity
@Table(name = "camera_presets")
@Getter
public class CameraPreset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "device_id", nullable = false)
    private Device device;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Target target;

    private Double focalMm;             // EXIF focalLength 초첨거리
    private Integer iso;

    @Column(name = "exposure_s")
    private Double exposureS;

    @Column(name = "aperture_f")
    private Double apertureF;

    @Column(name = "exposure_b")
    private Double exposureB;

    private Integer whiteBalance;

    private String notes;
}

