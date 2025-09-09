package com.meamappacaelestis.backend.photo.domain;

import com.meamappacaelestis.backend.location.domain.Location;
import com.meamappacaelestis.backend.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Table(name = "photos")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name = "user_id", nullable = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    @Column(nullable = false)
    private String filename;

    private Double lat;
    private Double lon;

    private String cameraMake;          // 브랜드
    private String cameraModel;         // 기종명


    private Double focalMm;             // 초첨거리
    private Integer iso;                // 감도
    private Double exposureS;           // 노출 시간(초)
    private Double apertureF;           // 조리개 값
    private Double exposureB;           // 노출 보정 값
    private Integer whiteBalance;       // 화이트 밸런스

    private LocalDateTime captureAt;
    private String comment;


    @Builder(access = AccessLevel.PRIVATE)
    public Photo(User user, String filename, Double lat, Double lon, String cameraMake, String cameraModel,
                 Double focalMm, Integer iso, Double exposureS, Double apertureF, Double exposureB, Integer whiteBalance, LocalDateTime captureAt, String comment) {
        this.user = user;
        this.filename = filename;
        this.lat = lat;
        this.lon = lon;
        this.cameraMake = cameraMake;
        this.cameraModel = cameraModel;
        this.focalMm = focalMm;
        this.iso = iso;
        this.exposureS = exposureS;
        this.apertureF = apertureF;
        this.exposureB = exposureB;
        this.whiteBalance = whiteBalance;
        this.captureAt = captureAt;
        this.comment = comment;
    }

    public static Photo create(User user, String filename, Double lat, Double lon, String cameraMake, String cameraModel,
                               Double focalMm, Integer iso, Double exposureS, Double apertureF, Double exposureB, Integer whiteBalance, LocalDateTime captureAt, String comment) {
        return Photo.builder()
                .user(user)
                .filename(filename)
                .lat(lat).lon(lon).cameraMake(cameraMake).cameraModel(cameraModel)
                .focalMm(focalMm).iso(iso).exposureS(exposureS).apertureF(apertureF)
                .exposureB(exposureB).whiteBalance(whiteBalance).captureAt(captureAt).comment(comment).build();
    }

    public void attachLocation(Location location) {
        if (location == null) {
            throw new IllegalArgumentException("위치 정보가 없습니다.");
        }
        this.lat = location.getLat();
        this.lon = location.getLon();
        this.location = location;
    }

    public void updateComment(String comment) {
        this.comment = comment;
    }
}
