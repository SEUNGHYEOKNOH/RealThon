package com.meamappacaelestis.backend.common.util;

//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)


import com.meamappacaelestis.backend.user.domain.User;
import com.meamappacaelestis.backend.user.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final Logger log = LoggerFactory.getLogger(JwtUtil.class);

    private final Key key;
    private final long accessTokenExpiration;
    private final long refreshTokenExpiration;
    private final UserRepository userRepository;

    // JWT 헤더 이름들
    private final String ACCESS_TOKEN_HEADER = "Authorization";
    private final String REFRESH_TOKEN_HEADER = "Authorization-Refresh";

    // 설정 파일에서 JWT 관련 값들을 주입받는 생성자
    public JwtUtil(
            @Value("${jwt.secret-key}") String secretKey,
            @Value("${jwt.access.expiration}") long accessTokenExpiration,
            @Value("${jwt.refresh.expiration}") long refreshTokenExpiration,
             UserRepository userRepository
    ) {
        // 시크릿이 Base64인지/평문인지에 상관없이 안전하게 Key 생성
        this.key = buildHmacKey(secretKey);
        this.accessTokenExpiration = accessTokenExpiration;
        this.refreshTokenExpiration = refreshTokenExpiration;
        this.userRepository = userRepository;
    }

    /** HS512용 안전 Key 생성: Base64 또는 평문(UTF-8) 모두 지원, 길이 검증 */
    private Key buildHmacKey(String secret) {
        byte[] keyBytes;
        try {
            keyBytes = Decoders.BASE64.decode(secret);
            log.info("JWT secret interpreted as Base64 ({} bytes after decode).", keyBytes.length);
        } catch (IllegalArgumentException e) {
            keyBytes = secret.getBytes(StandardCharsets.UTF_8);
            log.info("JWT secret interpreted as plain text ({} bytes).", keyBytes.length);
        }
        try {
            return Keys.hmacShaKeyFor(keyBytes); // 길이 부족하면 IllegalArgumentException 발생
        } catch (IllegalArgumentException ex) {
            log.error("JWT secret too short for HS512. Need at least 64 bytes, actual={} bytes.", keyBytes.length);
            throw ex;
        }
    }

    /** 쿠키/헤더에서 넘어온 토큰 정규화 (따옴표, URL인코딩 등) */
    private String normalizeToken(String token) {
        if (token == null) return null;
        String t = token.trim();
        if (t.startsWith("\"") && t.endsWith("\"") && t.length() >= 2) {
            t = t.substring(1, t.length() - 1);
        }
        try {
            t = java.net.URLDecoder.decode(t, StandardCharsets.UTF_8);
        } catch (Exception ignore) {}
        return t;
    }

    /** 검증 전 header/claims를 안전하게 디코딩하여 로깅(서명검증 없이) */
    private void debugJwtParts(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) {
                log.warn("JWT does not have 3 parts. tokenParts={}", parts.length);
                return;
            }
            String headerJson = new String(io.jsonwebtoken.io.Decoders.BASE64URL.decode(parts[0]), StandardCharsets.UTF_8);
            String claimsJson = new String(io.jsonwebtoken.io.Decoders.BASE64URL.decode(parts[1]), StandardCharsets.UTF_8);
            log.info("JWT header: {}", headerJson);
            log.info("JWT claims: {}", claimsJson);
        } catch (Exception e) {
            log.warn("Failed to decode JWT header/claims for debug.", e);
        }
    }

    /**
     * Access Token 생성
     *
     * @param email 사용자 이메일
     * @return JWT Access Token
     */
    public String generateAccessToken(String email) {
        Date now = new Date();
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + this.accessTokenExpiration))
                .signWith(this.key, SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Refresh Token 생성
     *
     * @param email 사용자 이메일
     * @return JWT Refresh Token
     */
    public String generateRefreshToken(String email) {
        Date now = new Date();
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + this.refreshTokenExpiration))
                .signWith(this.key, SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Access Token 헤더 이름 반환
     *
     * @return Access Token 헤더 이름
     */
    public String getAccessHeader() {
        return ACCESS_TOKEN_HEADER;
    }

    /**
     * Refresh Token 헤더 이름 반환
     *
     * @return Refresh Token 헤더 이름
     */
    public String getRefreshHeader() {
        return REFRESH_TOKEN_HEADER;
    }

    /**
     * 응답에 Access Token과 Refresh Token 추가
     *
     * @param response HttpServletResponse
     * @param accessToken Access Token
     * @param refreshToken Refresh Token
     */
    public void sendAccessAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken) {
        response.setStatus(HttpServletResponse.SC_OK);

        if (accessToken != null) {
            response.addHeader(getAccessHeader(), "Bearer " + accessToken);
        }

        if (refreshToken != null) {
            response.addHeader(getRefreshHeader(), "Bearer " + refreshToken);
        }
    }

    /**
     * OAuth2 사용자의 Refresh Token 업데이트
     *
     * @param email 사용자 이메일
     * @param refreshToken 새로운 Refresh Token
     */
    public void updateRefreshTokenOAuth2(String email, String refreshToken) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 이메일의 사용자를 찾을 수 없습니다: " + email));

        user.updateRefreshToken(refreshToken);
        userRepository.save(user);
    }

    /**
     * JWT 토큰 유효성 검증
     *
     * @param token 검증할 JWT 토큰
     * @return 유효하면 true, 그렇지 않으면 false
     */
    public boolean validateToken(String token) {
        String normalized = normalizeToken(token);
        try {
            // 검증 전에 헤더/클레임 확인이 필요하면 주석 해제
            // debugJwtParts(normalized);
            Jwts.parserBuilder()
                    .setSigningKey(this.key)
                    .build()
                    .parseClaimsJws(normalized);
            return true;
        } catch (io.jsonwebtoken.security.SignatureException e) {
            log.warn("잘못된 JWT 서명입니다. (SignatureException)", e);
        } catch (MalformedJwtException | SecurityException e) {
            log.warn("잘못된 JWT 형식입니다.", e);
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.", e);
        } catch (UnsupportedJwtException e) {
            log.warn("지원되지 않는 JWT 토큰입니다.", e);
        } catch (IllegalArgumentException e) {
            log.warn("JWT 클레임이 비어 있습니다.", e);
        }
        return false;
    }

    /**
     * JWT 토큰에서 이메일 추출
     *
     * @param token JWT 토큰
     * @return 사용자 이메일
     */
    public String getEmailFromToken(String token) {
        return this.parseClaims(token).getSubject();
    }

    /**
     * JWT 토큰 만료 시간 추출
     *
     * @param token JWT 토큰
     * @return 만료 시간
     */
    public Date getExpiration(String token) {
        return this.parseClaims(token).getExpiration();
    }

    /**
     * JWT 토큰에서 Claims 추출
     *
     * @param token JWT 토큰
     * @return Claims 객체
     */
    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(this.key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
