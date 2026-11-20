package com.englishpractice.backend.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum UserRole {
    ROLE_ADMIN("Admin"),
    ROLE_USER("User"),
    ROLE_MODERATOR("Moderator");

    private final String displayName;

    public String getDisplayName() {
        return displayName;
    }

}
