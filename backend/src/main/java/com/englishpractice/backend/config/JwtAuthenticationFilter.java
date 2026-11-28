package com.englishpractice.backend.config;

import com.englishpractice.backend.entity.User;
import com.englishpractice.backend.repository.UserRepository;
import com.englishpractice.backend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  private final JwtService jwtService;
  private final UserRepository userRepository;
  private final SecurityErrorResponseWriter securityErrorResponseWriter;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    String authHeader = request.getHeader("Authorization");
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }
    try {
      String token = authHeader.substring(7);
      String email = jwtService.extractEmail(token);
      User user =
          userRepository
              .findByEmail(email)
              .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại"));
      if (!user.isActive()) {
        filterChain.doFilter(request, response);
        return;
      }
      UsernamePasswordAuthenticationToken authentication =
          new UsernamePasswordAuthenticationToken(
              user, null, List.of(new SimpleGrantedAuthority(user.getRole().name())));
      SecurityContextHolder.getContext().setAuthentication(authentication);
    } catch (Exception e) {
      SecurityContextHolder.clearContext();
      securityErrorResponseWriter.write(
          response, HttpStatus.UNAUTHORIZED, "Token không hợp lệ hoặc hết hạn");
      return;
    }

    filterChain.doFilter(request, response);
  }
}
