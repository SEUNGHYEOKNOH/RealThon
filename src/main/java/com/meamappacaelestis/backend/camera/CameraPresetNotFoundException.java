package com.meamappacaelestis.backend.camera;

public class CameraPresetNotFoundException extends RuntimeException {

    public static final String DEFAULT_MESSAGE = "카메라 프리셋을 찾을 수 없습니다.";

    public CameraPresetNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public CameraPresetNotFoundException(String message) {
        super(message);
    }

    public CameraPresetNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
