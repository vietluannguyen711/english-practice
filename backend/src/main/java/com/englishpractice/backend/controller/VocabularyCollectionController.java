package com.englishpractice.backend.controller;

import com.englishpractice.backend.dto.PageResponse;
import com.englishpractice.backend.dto.VocabularyCollectionResponse;
import com.englishpractice.backend.service.VocabularyCollectionService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/vocabulary-collections")
@RequiredArgsConstructor
public class VocabularyCollectionController {

  private final VocabularyCollectionService service;

  @GetMapping
  public PageResponse<VocabularyCollectionResponse> getVocabularyCollections(
      @RequestParam(required = false) Integer page,
      @RequestParam(required = false) Integer size,
      @RequestParam(required = false) String keyword,
      @RequestParam(required = false) UUID topicId,
      @RequestParam(required = false) UUID levelId,
      @RequestParam(required = false) UUID purposeId,
      @RequestParam(required = false) Boolean popular) {
    Page<VocabularyCollectionResponse> result =
        service.search(page, size, keyword, topicId, levelId, purposeId, popular);

    return PageResponse.from(result);
  }
}
