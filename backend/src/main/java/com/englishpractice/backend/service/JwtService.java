package com.englishpractice.backend.service;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.englishpractice.backend.entity.User;

@Service
public class JwtService {
  @Value("${jwt.secret}")
  private String secret;

  private SecretKey getSigningKey() {
    return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
  }

  public String generateAccessToken(User user) {
    long expiration = 1000L * 60 * 60;
    return Jwts.builder()
        .subject(user.getEmail())
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(getSigningKey())
        .claim("type", "access")
        .compact();
  }

  public String generateRefreshToken(User user) {
    long expiration = 1000L * 60 * 60 * 24 * 7;
    return Jwts.builder()
        .subject(user.getEmail())
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(getSigningKey())
        .claim("type", "refresh")
        .compact();
  }

  public boolean isRefreshToken(String token) {
    String tokenType =
        Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .get("type", String.class);
    return "refresh".equals(tokenType);
  }

  public String extractEmail(String token) {
    return Jwts.parser()
        .verifyWith(getSigningKey())
        .build()
        .parseSignedClaims(token)
        .getPayload()
        .getSubject();
  }
}
