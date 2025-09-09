package com.meamappacaelestis.backend.common.config;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.HttpProtocol;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient lightPollutionWebClient() {
        // Netty 커넥션/응답 타임아웃 + HTTP/2 우선, 1.1 폴백
        HttpClient httpClient = HttpClient.create()
                .protocol(HttpProtocol.H2, HttpProtocol.HTTP11)
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5000)
                .responseTimeout(Duration.ofSeconds(10))
                .doOnConnected(c -> c
                        .addHandlerLast(new ReadTimeoutHandler(10))
                        .addHandlerLast(new WriteTimeoutHandler(10)));

        return WebClient.builder()
                .baseUrl("https://lightpollutionmap.app")
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .defaultHeader(HttpHeaders.USER_AGENT,
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
                                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36")
                .defaultHeader(HttpHeaders.REFERER, "https://lightpollutionmap.app/")
                // 일부 서버가 Accept 없으면 예민하게 굴기도 함
                .defaultHeader(HttpHeaders.ACCEPT, "application/json, */*;q=0.8")
                .exchangeStrategies(ExchangeStrategies.builder()
                        .codecs(c -> c.defaultCodecs().maxInMemorySize(10 * 1024 * 1024))
                        .build())
                //.filter(ExchangeFilterFunctions.statusError(HttpStatusCode::isError,
                //        resp -> new IllegalStateException("HTTP " + resp.statusCode())))
                //.filter(ExchangeFilterFunctions.logRequest()) // 필요시 디버그
                .build();
    }
}