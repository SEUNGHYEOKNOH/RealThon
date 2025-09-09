package com.meamappacaelestis.backend.user.domain;

import com.meamappacaelestis.backend.common.SocialType;
import com.meamappacaelestis.backend.location.domain.Location;
import com.meamappacaelestis.backend.oauth2.userinfo.OAuth2UserInfo;
import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.FetchType.LAZY;

@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA 요구사항
@AllArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String nickname;

    private String refreshToken;

    @Column(name = "user_name")
    private String name;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Enumerated(EnumType.STRING)
    private SocialType socialType; // KAKAO, GOOGLE, NAVER

    private String socialId;

    private Double lat;
    private Double lon;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "location_id")
    private Location location;


    /**
     * Refresh Token 업데이트
     *
     * @param refreshToken 새로운 Refresh Token
     */
    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void updateLocation(Double lat, Double lon, Location location) {
        this.lat = lat;
        this.lon = lon;
        this.location = location;
    }

}