package com.englishpractice.backend.dto;

import java.util.UUID;

public record ClassificationOptionResponse(
        UUID id,
        String name,
        String slug
) {
}
