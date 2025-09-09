package com.meamappacaelestis.backend.photo.exception;

public class PhotoNotFoundException extends RuntimeException{

    public static final String DEFAULT_MESSAGE = "사진을 찾을 수 없습니다.";

    public PhotoNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public PhotoNotFoundException(String message) {
        super(message);
    }

    public PhotoNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
