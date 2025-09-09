package com.meamappacaelestis.backend.location.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "locations")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double lat;

    @Column(nullable = false)
    private Double lon;

    @Column(nullable = false)
    private String addressName;

    private String regionType;
    private String code;
    private String sido;
    private String sigungu;
    private String eupmyeondong;
    private String ri;


    @Builder(access = AccessLevel.PRIVATE)

    public Location(Double lat, Double lon, String addressName, String regionType, String code, String sido, String sigungu, String eupmyeondong, String ri) {
        this.lat = lat;
        this.lon = lon;
        this.addressName = addressName;
        this.regionType = regionType;
        this.code = code;
        this.sido = sido;
        this.sigungu = sigungu;
        this.eupmyeondong = eupmyeondong;
        this.ri = ri;
    }

    public static Location create(Double lat, Double lon, String addressName, String regionType, String code, String sido, String sigungu, String eupmyeondong, String ri) {
        return Location.builder()
                .lat(lat).lon(lon).addressName(addressName).regionType(regionType).code(code)
                .sido(sido).sigungu(sigungu).eupmyeondong(eupmyeondong).ri(ri).build();
    }
}
