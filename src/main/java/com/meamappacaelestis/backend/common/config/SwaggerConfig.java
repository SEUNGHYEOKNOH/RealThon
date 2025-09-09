package com.meamappacaelestis.backend.common.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    public SwaggerConfig() {
    }

    @Bean
    public OpenAPI openAPI() {
        return (new OpenAPI()).info((new Info()).title("리얼톤").version("0.0.1").description("<h3>리얼톤</h3>"));


    }
}
