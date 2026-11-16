package com.englishpractice.backend.repository;

import com.englishpractice.backend.entity.VocabularyCollection;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VocabularyCollectionRepository extends JpaRepository<VocabularyCollection, UUID> {

  @Query(
      value =
          """
            SELECT vc
            FROM VocabularyCollection vc
            WHERE
                (:keyword IS NULL
                    OR LOWER(vc.name) LIKE LOWER(CONCAT('%', :keyword, '%')))
                AND (:topicId IS NULL
                    OR EXISTS (
                        SELECT 1 FROM vc.topics t
                        WHERE t.id = :topicId
                    ))
                AND (:levelId IS NULL
                    OR EXISTS (
                        SELECT 1 FROM vc.levels l
                        WHERE l.id = :levelId
                    ))
                AND (:purposeId IS NULL
                    OR EXISTS (
                        SELECT 1 FROM vc.purposes p
                        WHERE p.id = :purposeId
                    ))
                AND (:popular IS NULL
                    OR :popular = false
                    OR vc.studyCount >= 100)
            """,
      countQuery =
          """
            SELECT COUNT(vc)
            FROM VocabularyCollection vc
            WHERE
                (:keyword IS NULL
                    OR LOWER(vc.name) LIKE LOWER(CONCAT('%', :keyword, '%')))
                AND (:topicId IS NULL
                    OR EXISTS (
                        SELECT 1 FROM vc.topics t
                        WHERE t.id = :topicId
                    ))
                AND (:levelId IS NULL
                    OR EXISTS (
                        SELECT 1 FROM vc.levels l
                        WHERE l.id = :levelId
                    ))
                AND (:purposeId IS NULL
                    OR EXISTS (
                        SELECT 1 FROM vc.purposes p
                        WHERE p.id = :purposeId
                    ))
                AND (:popular IS NULL
                    OR :popular = false
                    OR vc.studyCount >= 100)
            """)
  Page<VocabularyCollection> search(
      @Param("keyword") String keyword,
      @Param("topicId") UUID topicId,
      @Param("levelId") UUID levelId,
      @Param("purposeId") UUID purposeId,
      @Param("popular") Boolean popular,
      Pageable pageable);
}
