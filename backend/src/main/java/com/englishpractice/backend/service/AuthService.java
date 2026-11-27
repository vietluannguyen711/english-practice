package com.englishpractice.backend.service;

import com.englishpractice.backend.dto.LoginRequest;
import com.englishpractice.backend.dto.LoginResponse;
import com.englishpractice.backend.dto.RegisterRequest;
import com.englishpractice.backend.dto.RegisterResponse;
import com.englishpractice.backend.entity.User;
import com.englishpractice.backend.enums.UserRole;
import com.englishpractice.backend.exception.UnauthorizedException;
import com.englishpractice.backend.repository.UserRepository;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  @Transactional
  public RegisterResponse register(RegisterRequest request) {

    if (!Objects.equals(request.getPassword(), request.getConfirmPassword())) {

      throw new IllegalArgumentException("Mật khẩu xác nhận không khớp.");
    }
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new IllegalArgumentException("Đăng ký không thành công. Vui lòng thử lại sau.");
    }
    String hashPassword = passwordEncoder.encode(request.getPassword());

    User savedUser =
        User.builder()
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

  public LoginResponse login(LoginRequest request) {
    User user =
        userRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() -> new UnauthorizedException("Email hay mật khẩu không hợp lệ"));
    if (!user.isActive()) {
      throw new UnauthorizedException("Email hay mật khẩu không hợp lệ");
    }
    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
      throw new UnauthorizedException("Email hay mật khẩu không hợp lệ");
    }
    String accessToken = jwtService.generateAccessToken(user);
    String refreshToken = jwtService.generateRefreshToken(user);
    return new LoginResponse("Login successful", accessToken, refreshToken);
  }
}
