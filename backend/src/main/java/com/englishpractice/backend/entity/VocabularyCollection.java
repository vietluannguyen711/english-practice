package com.englishpractice.backend.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "vocabulary_collections")
public class VocabularyCollection {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "name", nullable = false, length = 255)
  private String name;

  @Column(name = "slug", nullable = false, unique = true, length = 255)
  private String slug;

  @Column(name = "description", columnDefinition = "TEXT")
  private String description;

  @Column(name = "image_url", length = 500)
  private String imageUrl;

  @Column(name = "study_count", nullable = false)
  private Long studyCount = 0L;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  // Many-to-Many: VocabularyCollection <-> Topic
  @ManyToMany
  @JoinTable(
      name = "collection_topics",
      joinColumns = @JoinColumn(name = "vocabulary_collection_id"),
      inverseJoinColumns = @JoinColumn(name = "topic_id"))
  private Set<Topic> topics = new HashSet<>();

  // Many-to-Many: VocabularyCollection <-> Level
  @ManyToMany
  @JoinTable(
      name = "collection_levels",
      joinColumns = @JoinColumn(name = "vocabulary_collection_id"),
      inverseJoinColumns = @JoinColumn(name = "level_id"))
  private Set<Level> levels = new HashSet<>();

  // Many-to-Many: VocabularyCollection <-> Purpose
  @ManyToMany
  @JoinTable(
      name = "collection_purposes",
      joinColumns = @JoinColumn(name = "vocabulary_collection_id"),
      inverseJoinColumns = @JoinColumn(name = "purpose_id"))
  private Set<Purpose> purposes = new HashSet<>();

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
