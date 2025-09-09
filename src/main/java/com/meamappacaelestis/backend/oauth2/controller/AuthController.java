package com.meamappacaelestis.backend.oauth2.controller;

import com.meamappacaelestis.backend.oauth2.principal.PrincipalDetails;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user") // SecurityConfig와 맞추기
public class AuthController {

    @GetMapping("/me")
    public Map<String, Object> me(@AuthenticationPrincipal Object principal, HttpServletRequest request) {
        Map<String, Object> res = new HashMap<>();
        res.put("principalClass", principal == null ? "null" : principal.getClass().getName());

        // PrincipalDetails인 경우와 기본 UserDetails 모두 대응
        if (principal instanceof PrincipalDetails pd) {
            res.put("principalNull", false);
            res.put("userId", pd.getUser().getId());
            res.put("role", pd.getUser().getRole());
            res.put("username", pd.getUser().getNickname());
            res.put("nickname", pd.getUser().getNickname());
        } else if (principal instanceof org.springframework.security.core.userdetails.User u) {
            res.put("principalNull", false);
            res.put("username", u.getUsername());
            res.put("authorities", u.getAuthorities());
        } else {
            res.put("principalNull", true);
        }

        if (request.getCookies()!= null){
            for (Cookie c : request.getCookies()){
                if ("ACCESS_TOKEN".equals(c.getName())) {
                    res.put("hasAccessTokenCookie", true); // 값 노출은 위험하니 플래그만
                }
            }
        }
        return res;
    }
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        Cookie cookie_access = new Cookie("ACCESS_TOKEN", null);// 쿠키 이름 맞게 수정
        cookie_access.setHttpOnly(true);
        cookie_access.setSecure(true); // HTTPS 환경일 경우
        cookie_access.setPath("/"); // 애플리케이션 전체 경로
        cookie_access.setMaxAge(0); // 만료 시간 0으로 설정 -> 삭제됨

        Cookie cookie_refresh = new Cookie("REFRESH_TOKEN", null); // 쿠키 이름 맞게 수정
        cookie_refresh.setHttpOnly(true);
        cookie_refresh.setSecure(true); // HTTPS 환경일 경우
        cookie_refresh.setPath("/"); // 애플리케이션 전체 경로
        cookie_refresh.setMaxAge(0); // 만료 시간 0으로 설정 -> 삭제됨


        response.addCookie(cookie_access);
        response.addCookie(cookie_refresh);

        return ResponseEntity.ok().build();
    }

}