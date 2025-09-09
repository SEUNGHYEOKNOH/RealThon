package com.meamappacaelestis.backend.user.exception;

public class UserNotFoundException extends RuntimeException {

    public static final String DEFAULT_MESSAGE = "유저를 찾을 수 없습니다.";

    public UserNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
