package com.meamappacaelestis.backend.location.exception;


import com.meamappacaelestis.backend.common.ErrorResponse;
import com.meamappacaelestis.backend.photo.exception.PhotoNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static java.time.LocalDateTime.*;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestControllerAdvice(basePackages = "com.meamappacaelestis.backend.location")
public class LocationExceptionHandler {

    @ExceptionHandler(LocationNotFoundException.class)
    public ResponseEntity<ErrorResponse> handelNotFound(PhotoNotFoundException e, HttpServletRequest request) {
        return ResponseEntity.status(NOT_FOUND).body(new ErrorResponse(404, e.getMessage(), now(), request.getRequestURI()));
    }
}
