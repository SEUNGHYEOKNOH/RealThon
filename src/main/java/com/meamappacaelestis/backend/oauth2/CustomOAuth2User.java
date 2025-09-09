package com.meamappacaelestis.backend.oauth2;

import com.meamappacaelestis.backend.user.domain.UserRole;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import java.util.Collection;
import java.util.Map;

@Getter
public class CustomOAuth2User extends DefaultOAuth2User {
    private String email;
    private UserRole role;

    public CustomOAuth2User(Collection<? extends GrantedAuthority> authorities,
                            Map<String, Object> attribute, String nameAttributeKey,
                            String email, UserRole role) {
        super(authorities, attribute, nameAttributeKey);
        this.email = email;
        this.role = role;
    }
}
