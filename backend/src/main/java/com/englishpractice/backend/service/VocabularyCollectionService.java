package com.englishpractice.backend.service;

import com.englishpractice.backend.dto.VocabularyCollectionResponse;
import com.englishpractice.backend.repository.VocabularyCollectionRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VocabularyCollectionService {

  private static final int DEFAULT_PAGE = 0;
  private static final int DEFAULT_SIZE = 12;
  private static final int MAX_SIZE = 48;

  private final VocabularyCollectionRepository repository;

  public Page<VocabularyCollectionResponse> search(
      Integer page,
      Integer size,
      String keyword,
      UUID topicId,
      UUID levelId,
      UUID purposeId,
      Boolean popular) {
    // 1. Normalize keyword
    if (keyword != null && keyword.isBlank()) {
      keyword = null;
    }

    // 2. Normalize pagination
    int pageNumber = page == null || page < 0 ? DEFAULT_PAGE : page;

    int pageSize = size == null || size <= 0 ? DEFAULT_SIZE : Math.min(size, MAX_SIZE);

    Pageable pageable =
        PageRequest.of(
            pageNumber, pageSize, Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id")));

    // 3. Search
    return repository
        .search(keyword, topicId, levelId, purposeId, popular, pageable)
        .map(VocabularyCollectionResponse::from);
  }
}
