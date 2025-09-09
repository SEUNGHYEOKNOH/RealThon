package com.meamappacaelestis.backend.common;

import java.time.LocalDateTime;

public record ErrorResponse(
        int code,
        String message,
        LocalDateTime timestamp,
        String path
) {}
