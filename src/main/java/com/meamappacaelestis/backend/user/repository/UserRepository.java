package com.meamappacaelestis.backend.user.repository;

import com.meamappacaelestis.backend.common.SocialType;
import com.meamappacaelestis.backend.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User , Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findBySocialTypeAndSocialId(SocialType socialType, String socialId);

    Optional<User> findByRefreshToken(String refreshToken);
}
