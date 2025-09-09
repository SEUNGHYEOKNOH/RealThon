package com.meamappacaelestis.backend.camera;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Data
@Configuration
@ConfigurationProperties(prefix = "device.samsung")
public class SamsungDeviceProps {

    private Map<String, String> map = new HashMap<>();
}
