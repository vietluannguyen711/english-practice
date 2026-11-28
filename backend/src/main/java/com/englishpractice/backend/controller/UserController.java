package com.englishpractice.backend.controller;

import com.englishpractice.backend.dto.UserProfileResponse;
import com.englishpractice.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @GetMapping("/me")
  public UserProfileResponse getCurrentUser() {
    return userService.getCurrentUser();
  }
}
