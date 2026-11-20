# FLOWS

| STT | Flow     | Mô tả                   |
| --- | -------- | ----------------------- |
| 1   | Register | Đăng ký người dùng mới. |
| 2   | Login    | Người dùng đăng nhập.   |
| 3   | Log out  | Thoát khỏi ứng dụng.    |


# FLOW 1: REGISTER

## 1. Mục đích

Cho phép người dùng đăng ký tài khoản trước khi có thể đăng nhập vào hệ thống, để tận dụng 1 số tính năng chỉ dành riêng cho người dùng đã đăng ký.


---

## 2. Các bước

### 2.1. Flyway migration

```sql
CREATE TABLE
    app_user (
        id UUID PRIMARY KEY,
        username VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        date_of_birth DATE,
        avatar VARCHAR(500),
        role VARCHAR(50) NOT NULL DEFAULT 'ROLE_USER',
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL
    );
    
```
### 2.2. User entity
```java
package com.englishpractice.backend.entity;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

import com.englishpractice.backend.enums.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "app_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String username;
    private String password;
    @Column(nullable = false, unique = true)
    private String email;

    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private UserRole role = UserRole.ROLE_USER;
    @Column
    private String avatar;
    @Column(nullable = false)
    @Builder.Default
    private boolean isActive = true;
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    protected void onCreate() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }
}
```
### 2.3. DTO RegisterRequest (email, password, firstName, lastName) với @Valid

```java
package com.englishpractice.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "Email không được để trống")
    @Email
    private String email;

    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;

    @NotBlank(message = "Mật khẩu xác nhận không được để trống")
    private String confirmPassword;

    @NotBlank(message = "Tên không được để trống")
    private String firstName;

    @NotBlank(message = "Họ tên không được để trống")
    private String lastName;

}

```
### 2.4. UserRepository
	- kiểm tra sự tồn tại của người dùng dựa vào email (duy nhất)

```java
package com.englishpractice.backend.repository;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.englishpractice.backend.entity.User;

public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByEmail(String email);
}
```
### 2.5. AuthService (RegisterRequest)
	- kiểm tra sự tồn tại của người dùng dựa vào email duy nhất.
		- nếu đã tồn tại thì ném ra ngoại lệ IllegalArgumentException
	- encode password rồi lưu vào DB bởi UserRepository 
	- trả về RegisterResponse

```java
package com.englishpractice.backend.service;

import java.util.Objects;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.englishpractice.backend.dto.RegisterRequest;
import com.englishpractice.backend.dto.RegisterResponse;
import com.englishpractice.backend.entity.User;
import com.englishpractice.backend.enums.UserRole;
import com.englishpractice.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public RegisterResponse register(RegisterRequest request) {

        if (!Objects.equals(request.getPassword(), request.getConfirmPassword())) {

            throw new IllegalArgumentException("Mật khẩu xác nhận không khớp.");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Đăng ký không thành công. Vui lòng thử lại sau.");
        }
        String hashPassword = passwordEncoder.encode(request.getPassword());

        User savedUser = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(hashPassword)
                .isActive(true)
                .role(UserRole.ROLE_USER)
                .build();

        userRepository.save(savedUser);
        return new RegisterResponse("Đăng ký thành công");
    }
}


```
### 2.6. Bổ sung IllegalArgumentException và thêm vào GlobalExceptionHandler.


```java
package com.englishpractice.backend.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.englishpractice.backend.dto.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ErrorResponse handleResourceNotFoundException(ResourceNotFoundException ex) {

    return ErrorResponse.builder()
        .status(HttpStatus.NOT_FOUND.value())
        .message(ex.getMessage())
        .timestamp(LocalDateTime.now())
        .build();
  }

  @ExceptionHandler(IllegalArgumentException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorResponse handleIllegalArgumentException(IllegalArgumentException ex) {

    return ErrorResponse.builder()
        .status(HttpStatus.BAD_REQUEST.value())
        .message(ex.getMessage())
        .timestamp(LocalDateTime.now())
        .build();
  }

  @ExceptionHandler(AccessDeniedException.class)
  @ResponseStatus(HttpStatus.FORBIDDEN)
  public ErrorResponse handleAccessDeniedException(AccessDeniedException ex) {

    return ErrorResponse.builder()
        .status(HttpStatus.FORBIDDEN.value())
        .message(ex.getMessage())
        .timestamp(LocalDateTime.now())
        .build();
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {

    String message = ex.getBindingResult().getFieldErrors().stream()
        .findFirst()
        .map(error -> error.getDefaultMessage())
        .orElse("Dữ liệu yêu cầu không hợp lệ");

    return ErrorResponse.builder()
        .status(HttpStatus.BAD_REQUEST.value())
        .message(message)
        .timestamp(LocalDateTime.now())
        .build();
  }

  @ExceptionHandler(HttpMessageNotReadableException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {

    return ErrorResponse.builder()
        .status(HttpStatus.BAD_REQUEST.value())
        .message("Dữ liệu yêu cầu không hợp lệ")
        .timestamp(LocalDateTime.now())
        .build();
  }
}

```


```java
package com.englishpractice.backend.exception;

public class ResourceNotFoundException extends RuntimeException {

  public ResourceNotFoundException(String message) {
    super(message);
  }
}

```

```java
package com.englishpractice.backend.exception;

public class AccessDeniedException extends RuntimeException {

  public AccessDeniedException(String message) {
    super(message);
  }
}

```
### 2.7. AuthController
	- gọi AuthService.register (Register Request)
	- trả về `ResponseEntity<RegisterResponse>`
```java
package com.englishpractice.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.englishpractice.backend.dto.RegisterRequest;
import com.englishpractice.backend.dto.RegisterResponse;
import com.englishpractice.backend.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
  private final AuthService authService;

  @PostMapping("/register")
  public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
  }

}

```

### 2.8. SecurityConfig: permitAll đối với (/register, /login)


```java
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

```

```java
package com.englishpractice.backend.config;


import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import com.englishpractice.backend.dto.ErrorResponse;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import tools.jackson.databind.ObjectMapper;

@Component
@RequiredArgsConstructor
public class SecurityErrorResponseWriter {
  private final ObjectMapper objectMapper;

  public void write(HttpServletResponse response, HttpStatus status, String message)
      throws IOException {
    response.setStatus(status.value());
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    objectMapper.writeValue(
        response.getOutputStream(),
        ErrorResponse.builder()
            .status(status.value())
            .message(message)
            .timestamp(LocalDateTime.now())
            .build());
  }
}

```
### 2.9. Frontend:

	- RegisterPage.tsx và RegisterPageClient.tsx
	- gọi tới action register của auth.ts để gọi tới api bên trên.
		- Validate các trường bắt buộc.
		- Validate email.
		- Validate password và confirmPassword phải trùng nhau.
		- Hiển thị lỗi tương ứng trên UI.
	- đọc lỗi trả về để hiển thị trên UI
	- nếu ko lỗi thì redirect tới /login
