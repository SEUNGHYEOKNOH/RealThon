package com.meamappacaelestis.backend.location.exception;

public class LocationNotFoundException extends RuntimeException {

    public static final String DEFAULT_MESSAGE = "장소를 찾을 수 없습니다.";

    public LocationNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public LocationNotFoundException(String message) {
        super(message);
    }

    public LocationNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
