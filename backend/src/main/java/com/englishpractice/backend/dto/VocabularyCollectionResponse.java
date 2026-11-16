package com.englishpractice.backend.dto;

import com.englishpractice.backend.entity.VocabularyCollection;
import java.util.List;
import java.util.UUID;

public record VocabularyCollectionResponse(
    UUID id,
    String name,
    String slug,
    String description,
    String imageUrl,
    Long studyCount,
    List<ClassificationOptionResponse> topics,
    List<ClassificationOptionResponse> levels,
    List<ClassificationOptionResponse> purposes) {
  public static VocabularyCollectionResponse from(VocabularyCollection collection) {
    return new VocabularyCollectionResponse(
        collection.getId(),
        collection.getName(),
        collection.getSlug(),
        collection.getDescription(),
        collection.getImageUrl(),
        collection.getStudyCount(),
        collection.getTopics().stream()
            .map(
                item ->
                    new ClassificationOptionResponse(item.getId(), item.getName(), item.getSlug()))
            .toList(),
        collection.getLevels().stream()
            .map(
                item ->
                    new ClassificationOptionResponse(item.getId(), item.getName(), item.getSlug()))
            .toList(),
        collection.getPurposes().stream()
            .map(
                item ->
                    new ClassificationOptionResponse(item.getId(), item.getName(), item.getSlug()))
            .toList());
  }
}
