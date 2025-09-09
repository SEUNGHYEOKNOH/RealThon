package com.meamappacaelestis.backend.common.filter;

import com.meamappacaelestis.backend.oauth2.service.JwtService;
import com.meamappacaelestis.backend.user.domain.User;
import com.meamappacaelestis.backend.user.repository.UserRepository;
import com.meamappacaelestis.backend.common.util.PasswordUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        log.info("➡️ JwtAuthenticationFilter: path = {}", request.getRequestURI());

        // 쿠키 확인
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            Arrays.stream(cookies).forEach(c ->
                    log.info("🍪 Cookie: {}={}", c.getName(), c.getValue()));
        } else {
            log.info("❌ No cookies found");
        }

        // 액세스 토큰 추출
        String accessToken = resolveAccessToken(request);
        log.info("🔑 Extracted AccessToken = {}", accessToken);

        if (accessToken != null && jwtService.isTokenValid(accessToken)) {
            log.info("✅ AccessToken valid");
            setAuthenticationByAccessToken(accessToken);
        } else {
            log.info("❌ AccessToken missing or invalid");
        }

        filterChain.doFilter(request, response);
    }

    private void setAuthenticationByAccessToken(String accessToken) {
        Optional<String> emailOpt = jwtService.extractEmail(accessToken);
        if (emailOpt.isEmpty()) {
            log.warn("⚠️ Could not extract email from token");
            return;
        }

        userRepository.findByEmail(emailOpt.get()).ifPresent(user -> {
            log.info("👤 User loaded from DB = {}", user.getEmail());
            saveAuthentication(user);
        });
    }

    private void saveAuthentication(User user) {
        String password = PasswordUtil.generateRandomPassword();

        UserDetails principal = org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(password)
                .roles(user.getRole() != null ? user.getRole().name() : "USER")
                .build();

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                principal,
                null,
                authoritiesMapper.mapAuthorities(principal.getAuthorities())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        log.info("🔐 SecurityContext updated for user = {}", user.getEmail());
    }

    private String resolveAccessToken(HttpServletRequest request) {
        // Authorization 헤더
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        // 쿠키 ACCESS_TOKEN
        if (request.getCookies() != null) {
            for (Cookie c : request.getCookies()) {
                if ("ACCESS_TOKEN".equals(c.getName())) {
                    return c.getValue();
                }
            }
        }
        return null;
    }
}