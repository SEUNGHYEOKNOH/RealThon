package com.meamappacaelestis.backend.photo;

import com.meamappacaelestis.backend.camera.SamsungModelMapper;
import com.meamappacaelestis.backend.location.domain.Location;
import com.meamappacaelestis.backend.location.LocationService;
import com.meamappacaelestis.backend.photo.domain.Photo;
import com.meamappacaelestis.backend.photo.exception.PhotoNotFoundException;
import com.meamappacaelestis.backend.photo.infra.ExifExtractor;
import com.meamappacaelestis.backend.photo.infra.ParsedMeta;
import com.meamappacaelestis.backend.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class PhotoService {

    private final PhotoRepository photoRepository;
    private final SamsungModelMapper mapper;
    private final LocationService locationService;

    @Value("${app.storage.base-dir}")
    private String baseDir;
    private static final Set<String> ALLOWED_TYPES = Set.of("image/jpeg", "image/jpg", "image/png");

    public Photo upload(MultipartFile file,String comment, User user) throws Exception {

        if (file.isEmpty()) {
            throw new IllegalArgumentException("빈 파일은 업로드할 수 없습니다.");
        }
        Path base = Paths.get(baseDir).toAbsolutePath().normalize();
        Files.createDirectories(base);

        String contentType = file.getContentType();

        if (contentType == null || !ALLOWED_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("허용되지 않는 파일 형식입니다.");
        }

        String ext = contentType.equals("image/png") ? "png" : "jpg";
        String filename = UUID.randomUUID() + "." + ext;
        Path target = safeResolve(base, filename);

        file.transferTo(target);

        ParsedMeta meta = ExifExtractor.parse(file.getInputStream());

        String cameraMake = meta.getCameraMake();
        String cameraModel = meta.getCameraModel();

        if (cameraMake.equalsIgnoreCase("samsung")) {
            cameraModel = mapper.toMarketingName(cameraModel);
        }
        Photo photo = Photo.create(user, filename, meta.getLat(), meta.getLon(), cameraMake,
                cameraModel, meta.getFocalMm(), meta.getIso(), meta.getExposureS(), meta.getApertureF(),
                meta.getExposureB(), meta.getWhiteBalance(), meta.getCaptureAt(), comment);

        if (meta.getLat() != null && meta.getLon() != null) {
            Location location = locationService.findOrCreateByAddress(meta.getLat(), meta.getLon());
            photo.attachLocation(location);

        }
        photoRepository.save(photo);


        return photo;
    }

    public Photo findById(Long id) {
        return photoRepository.findById(id).orElseThrow(PhotoNotFoundException::new);
    }

    public Photo findByIdWithValidation(Long photoId, Long userId) {
        Photo photo = findById(photoId);
        if (!photo.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("삭제 권한이 없습니다.");
        }
        return photo;
    }

    public List<Photo> getPhotosBySido(String sido, Long userId) {
        return photoRepository.findByLocation_SidoAndUser_Id(sido, userId);
    }

    public Photo updatePhotoLocation(Long photoId, Long userId, Double lat, Double lon) {
        Photo photo = findByIdWithValidation(photoId, userId);
        Location location = locationService.findOrCreateByAddress(lat, lon);
        photo.attachLocation(location);
        return photo;
    }

    public String updateComment(Long photoId , Long userId, String comment) throws AccessDeniedException {
        Photo photo = findByIdWithValidation(photoId, userId);
        photo.updateComment(comment);
        return comment;
    }

    public void deletePhoto(Long userId, Long id) {
        Photo photo = findByIdWithValidation(id, userId);

        Path path = Paths.get("uploads/" + photo.getFilename());
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            throw new RuntimeException("사진 파일 삭제 실패:", e);
        }

        photoRepository.deleteById(id);
    }

    private Path safeResolve(Path base, String name) {
        Path p = base.resolve(name).normalize();
        if(!p.startsWith(base)) throw new IllegalArgumentException("잘못된 경로입니다.");
        return p;
    }


}
