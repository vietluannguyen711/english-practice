package com.englishpractice.backend.service;

import com.englishpractice.backend.dto.UserProfileResponse;
import com.englishpractice.backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  public UserProfileResponse getCurrentUser() {
    User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return UserProfileResponse.builder()
        .id(currentUser.getId())
        .firstName(currentUser.getFirstName())
        .lastName(currentUser.getLastName())
        .email(currentUser.getEmail())
        .dateOfBirth(currentUser.getDateOfBirth())
        .role(currentUser.getRole())
        .avatar(currentUser.getAvatar())
        .build();
  }
}
