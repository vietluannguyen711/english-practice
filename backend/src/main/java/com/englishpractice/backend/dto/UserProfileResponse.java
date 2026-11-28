package com.englishpractice.backend.dto;

import com.englishpractice.backend.enums.UserRole;
import java.time.LocalDate;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfileResponse {
  private UUID id;
  private String firstName;
  private String lastName;
  private String email;
  private LocalDate dateOfBirth;
  private UserRole role;
  private String avatar;
}
