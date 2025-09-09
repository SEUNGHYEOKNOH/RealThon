package com.meamappacaelestis.backend.photo;

import com.meamappacaelestis.backend.photo.domain.Photo;
import com.meamappacaelestis.backend.photo.dto.PhotoMetadataDto;
import com.meamappacaelestis.backend.photo.dto.PhotoSimpleDto;
import com.meamappacaelestis.backend.photo.dto.PhotoUploadResponse;
import com.meamappacaelestis.backend.user.UserService;
import com.meamappacaelestis.backend.user.domain.User;
import com.meamappacaelestis.backend.user.dto.LocationRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/photos")
public class PhotoController {

    private final PhotoService photoService;
    private final UserService userService;

    // /api/photos/{uuid}.jpg/content <-  Get 요청시 실제 사진만 보낼 예정 (nginx)
    @PostMapping
    public ResponseEntity<PhotoUploadResponse> upload(
            @AuthenticationPrincipal UserDetails userInfo,
            @RequestPart("file") MultipartFile file,
            @RequestPart(value = "comment", required = false) String comment) throws Exception {
        User user = userService.findByEmail(userInfo.getUsername());
        Photo photo = photoService.upload(file, comment, user);
        URI location = URI.create("/api/photos/" + photo.getFilename());
        return ResponseEntity.created(location).body(new PhotoUploadResponse(photo));
    }


    @GetMapping("/{id}")
    public ResponseEntity<PhotoMetadataDto> getPhotoMeta(
            @AuthenticationPrincipal UserDetails userInfo,
            @PathVariable Long id) {
        User user = userService.findByEmail(userInfo.getUsername());
        Photo photo = photoService.findByIdWithValidation(id, user.getId());
        return ResponseEntity.ok().body(new PhotoMetadataDto(photo));
    }

    @PatchMapping("/{id}/comment")
    public ResponseEntity<PhotoSimpleDto> updateComment(
            @AuthenticationPrincipal UserDetails userInfo,
            @PathVariable Long id,
            @RequestBody PhotoSimpleDto requestDto) {
        User user = userService.findByEmail(userInfo.getUsername());
        String updateComment = photoService.updateComment(id, user.getId(), requestDto.comment());
        return ResponseEntity.ok(new PhotoSimpleDto(id, updateComment));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<PhotoMetadataDto> updatePhotoLocation(
            @AuthenticationPrincipal UserDetails userInfo,
            @PathVariable Long id,
            @RequestBody LocationRequestDto requestDto
    ) {
        User user = userService.findByEmail(userInfo.getUsername());
        Photo photo = photoService.updatePhotoLocation(id, user.getId(), requestDto.lat(), requestDto.lon());
        return ResponseEntity.ok(new PhotoMetadataDto(photo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhoto(
            @AuthenticationPrincipal UserDetails userInfo,
            @PathVariable Long id) {
        User user = userService.findByEmail(userInfo.getUsername());
        photoService.deletePhoto(user.getId(), id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<PhotoMetadataDto> getPhotos(
            @AuthenticationPrincipal UserDetails userInfo,
            @RequestParam String sido) {

        User user = userService.findByEmail(userInfo.getUsername());
        return photoService.getPhotosBySido(sido, user.getId()).stream().map(PhotoMetadataDto::new).toList();
    }

}
