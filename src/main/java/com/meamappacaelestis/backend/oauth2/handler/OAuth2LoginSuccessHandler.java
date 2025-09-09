package com.meamappacaelestis.backend.oauth2.handler;

import com.meamappacaelestis.backend.oauth2.CustomOAuth2User;
import com.meamappacaelestis.backend.common.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private static final String FRONTEND_URL = "http://localhost:3000"; // prod에서는 https 도메인으로 교체

    @Override
    public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res, Authentication auth) throws IOException {
        CustomOAuth2User user = (CustomOAuth2User) auth.getPrincipal();

        // 토큰 생성 + refreshToken 저장
        String accessToken  = jwtUtil.generateAccessToken(user.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());
        jwtUtil.updateRefreshTokenOAuth2(user.getEmail(), refreshToken);

        // 환경 구분 (로컬/운영)
        boolean isProd = req.getServerName().endsWith("ajb.kr"); // 필요하면 더 정확히 분기

        // HttpOnly 쿠키로 전달 (URL 파라미터 X)
        ResponseCookie accessCookie = ResponseCookie.from("ACCESS_TOKEN", accessToken)
                .httpOnly(true)
                .secure(isProd)                         // 운영: true (HTTPS 필수)
                .sameSite(isProd ? "None" : "Lax")      // 크로스도메인일 때 None
                .path("/")
                .maxAge(60 * 60)                        // 1시간
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("REFRESH_TOKEN", refreshToken)
                .httpOnly(true)
                .secure(isProd)
                .sameSite(isProd ? "None" : "Lax")
                .path("/")
                .maxAge(60L * 60 * 24 * 14)             // 14일
                .build();

        res.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        res.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        // 깔끔한 리다이렉트 (토큰 노출 없음)
        res.sendRedirect(FRONTEND_URL + "/auth/callback");
    }
}