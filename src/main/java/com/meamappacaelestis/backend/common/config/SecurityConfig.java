package com.meamappacaelestis.backend.common.config;

import com.meamappacaelestis.backend.common.filter.JwtAuthenticationProcessingFilter;
import com.meamappacaelestis.backend.oauth2.handler.OAuth2LoginFailureHandler;
import com.meamappacaelestis.backend.oauth2.handler.OAuth2LoginSuccessHandler;
import com.meamappacaelestis.backend.oauth2.service.CustomOAuth2UserService;
import com.meamappacaelestis.backend.oauth2.service.JwtService;
import com.meamappacaelestis.backend.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    // ✅ 공개 경로 (JWT 필터 스킵 대상)
    private static final String[] PUBLIC_PATHS = {
            "/",
            "/login",
            "/oauth2/**",
            "/oauth2/authorization/**",
            "/login/oauth2/**",
            "/api/login/oauth2/**",     // ✅ 콜백 경로 퍼밋
            "/api/v1/oauth2/**",

            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/swagger-resources/**",
            "/swagger-ui.html",
            "/webjars/**",

            "/api/recommend/**",
            "/api/user/tags",
            "/api/user/tags/*",
            "/api/v1/oauth2/naver/**",
            "/api/v1/oauth2/google/**",
            "/api/images/upload",
            "/api/posts/**",
            "/api/search/**",
            "/api/images/download/**",
            "/api/images/download",
            "/api/auth/refresh",
            "/api/cameras/**",
            "/api/lightpollution/**",
            "/api/stars/**"
    };

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        AntPathMatcher matcher = new AntPathMatcher();

        http
                .cors(cors -> {}) // 아래 corsConfigurationSource() 사용
                .csrf(csrf -> csrf.disable())
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(PUBLIC_PATHS).permitAll()
                        .requestMatchers("/api/user/me/**").authenticated()
                        .anyRequest().authenticated()
                )

                .oauth2Login(oauth2 -> oauth2
                        // 시작 URL은 기본(/oauth2/authorization/{registrationId}) 그대로 사용
                        .redirectionEndpoint(redirection ->
                                redirection.baseUri("/api/login/oauth2/code/*") // ✅ 콜백 기본값 변경
                        )
                        .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
                        .successHandler(oAuth2LoginSuccessHandler)
                        .failureHandler(oAuth2LoginFailureHandler)

                )

                // 공개 경로는 shouldNotFilter로 JWT 필터 스킵
                .addFilterAfter(new JwtAuthenticationProcessingFilter(jwtService, userRepository) {
                    @Override
                    protected boolean shouldNotFilter(HttpServletRequest request) {
                        String path = request.getRequestURI();
                        for (String pattern : PUBLIC_PATHS) {
                            if (matcher.match(pattern, path)) {
                                return true; // 이 경로는 필터 건너뜀
                            }
                        }
                       return false; // 나머지 경로는 필터 적용
                    }
                }, LogoutFilter.class);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(List.of(
                "http://localhost:3000",
                "https://realthon.ajb.kr"
        ));
        cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        cfg.setAllowedHeaders(List.of("*"));
        cfg.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }
}