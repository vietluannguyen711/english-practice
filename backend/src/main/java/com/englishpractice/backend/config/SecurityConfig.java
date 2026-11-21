package com.englishpractice.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final SecurityErrorResponseWriter securityErrorResponseWriter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(
                        auth -> auth.requestMatchers("/api/v1/auth/**")
                                .permitAll()
                                .anyRequest()
                                .authenticated())

                .exceptionHandling(
                        exceptions -> exceptions
                                .authenticationEntryPoint(
                                        (request, response, exception) -> securityErrorResponseWriter.write(
                                                response, HttpStatus.UNAUTHORIZED, "Yêu cầu xác thực"))
                                .accessDeniedHandler(
                                        (request, response, exception) -> securityErrorResponseWriter.write(
                                                response,
                                                HttpStatus.FORBIDDEN,
                                                "Bạn không đủ quyền truy cập tới tài nguyên này")));

        return http.build();
    }
}
