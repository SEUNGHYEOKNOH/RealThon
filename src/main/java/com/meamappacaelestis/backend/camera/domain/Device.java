package com.meamappacaelestis.backend.camera.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "devices",
uniqueConstraints = @UniqueConstraint(
        name = "unique_brand_model", columnNames = {"brand", "model"}))
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Brand brand;

    @Column(nullable = false)
    private String model;

    public Device(Brand brand, String model) {
        this.brand = brand;
        this.model = model;
    }
}
