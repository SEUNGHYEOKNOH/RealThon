package com.meamappacaelestis.backend.camera;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class SamsungModelMapper {

    private final SamsungDeviceProps props;

    public String toMarketingName(String model) {
        String code = normalize(model);
        return props.getMap().getOrDefault(code.toUpperCase(Locale.ROOT), model);
    }


    private String normalize(String model) {
        String m = model.trim().toUpperCase(Locale.ROOT);
        return m.replaceFirst("^(SM-[A-Z]\\d{3})([A-Z0-9].*)?$", "$1");
    }

}
