package com.meamappacaelestis.backend.common.filter;

import com.meamappacaelestis.backend.oauth2.principal.PrincipalDetails;
import com.meamappacaelestis.backend.user.domain.User;
import com.meamappacaelestis.backend.oauth2.service.JwtService;
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
import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    private final GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 1) 액세스 토큰: 헤더 → 쿠키
        String accessToken = resolveAccessToken(request);

        if (accessToken != null && jwtService.isTokenValid(accessToken)) {
            setAuthenticationByAccessToken(accessToken, request);
            filterChain.doFilter(request, response);
            return;
        }

        // 2) 액세스 토큰이 없거나 무효 → 리프레시로 재발급 시도 (쿠키 → 헤더)
        String refreshToken = resolveRefreshToken(request);

        if (refreshToken != null && jwtService.isTokenValid(refreshToken)) {
            userRepository.findByRefreshToken(refreshToken).ifPresent(user -> {
                // 새 토큰 생성
                String newAccess  = jwtService.createAccessToken(user.getEmail());
                String newRefresh = reIssueRefreshToken(user); // 저장까지

                // 응답에 전송 (쿠키/헤더 설정은 jwtService 내부 정책대로)
                jwtService.sendAccessAndRefreshToken(response, newAccess, newRefresh);

                // 인증 컨텍스트 세팅
                setAuthenticationByAccessToken(newAccess, request);
            });

            // 재발급이든 아니든 필터 체인은 계속
            filterChain.doFilter(request, response);
            return;
        }

        // 3) 둘 다 없거나 무효 → 익명 상태로 진행
        filterChain.doFilter(request, response);
    }

    /** 새 리프레시 토큰 재발급+저장 */
    private String reIssueRefreshToken(User user) {
        String reIssued = jwtService.createRefreshToken(user);
        user.updateRefreshToken(reIssued);
        userRepository.saveAndFlush(user);
        return reIssued;
    }

    /** 액세스 토큰으로 사용자 조회 후 SecurityContext에 인증 저장 */
    private void setAuthenticationByAccessToken(String accessToken, HttpServletRequest request) {
        Optional<String> emailOpt = jwtService.extractEmail(accessToken);
        if (emailOpt.isEmpty()) return;

        userRepository.findByEmail(emailOpt.get()).ifPresent(this::saveAuthentication);
    }

    /** SecurityContext에 Authentication 세팅 */
    private void saveAuthentication(User user) {
        // 소셜 로그인 사용자는 비밀번호가 없으므로 임의 비밀번호
        String password = PasswordUtil.generateRandomPassword();

        UserDetails principal = org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(password)
                .roles(user.getRole() != null ? user.getRole().name() : "USER")
                .build();

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        principal,
                        null,
                        authoritiesMapper.mapAuthorities(principal.getAuthorities())
                );

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    /** Authorization 헤더 또는 쿠키에서 액세스 토큰 해석 */
    private String resolveAccessToken(HttpServletRequest request) {
        // Authorization: Bearer ...
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

    /** 헤더 또는 쿠키에서 리프레시 토큰 해석 */
    private String resolveRefreshToken(HttpServletRequest request) {
        // (선택) Authorization: Bearer ... 로도 받을 수 있게
        String header = request.getHeader("Authorization-Refresh");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        // 쿠키 REFRESH_TOKEN
        if (request.getCookies() != null) {
            for (Cookie c : request.getCookies()) {
                if ("REFRESH_TOKEN".equals(c.getName())) {
                    return c.getValue();
                }
            }
        }
        return null;
    }



}