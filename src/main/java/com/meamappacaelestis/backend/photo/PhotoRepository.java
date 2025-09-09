package com.meamappacaelestis.backend.photo;

import com.meamappacaelestis.backend.photo.domain.Photo;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    @Override
    @NonNull
    @EntityGraph(attributePaths = "location")
    Optional<Photo> findById(@NonNull Long id);

    @EntityGraph(attributePaths = "location")
    List<Photo> findByLocation_SidoAndUser_Id(String sido, Long userId);

}
