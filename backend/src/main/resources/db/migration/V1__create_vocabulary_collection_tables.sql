
-- =========================================
-- 1. TOPICS
-- =========================================

CREATE TABLE topics (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

-- =========================================
-- 2. LEVELS
-- =========================================

CREATE TABLE levels (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

-- =========================================
-- 3. PURPOSES
-- =========================================

CREATE TABLE purposes (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

-- =========================================
-- 4. VOCABULARY COLLECTIONS
-- =========================================

CREATE TABLE vocabulary_collections (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(500),
    study_count BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

-- =========================================
-- 5. COLLECTION TOPICS
-- =========================================

CREATE TABLE collection_topics (
    vocabulary_collection_id UUID NOT NULL,
    topic_id UUID NOT NULL,

    PRIMARY KEY (vocabulary_collection_id, topic_id),

    CONSTRAINT fk_collection_topics_collection
        FOREIGN KEY (vocabulary_collection_id)
        REFERENCES vocabulary_collections(id),

    CONSTRAINT fk_collection_topics_topic
        FOREIGN KEY (topic_id)
        REFERENCES topics(id)
);

-- =========================================
-- 6. COLLECTION LEVELS
-- =========================================

CREATE TABLE collection_levels (
    vocabulary_collection_id UUID NOT NULL,
    level_id UUID NOT NULL,

    PRIMARY KEY (vocabulary_collection_id, level_id),

    CONSTRAINT fk_collection_levels_collection
        FOREIGN KEY (vocabulary_collection_id)
        REFERENCES vocabulary_collections(id),

    CONSTRAINT fk_collection_levels_level
        FOREIGN KEY (level_id)
        REFERENCES levels(id)
);

-- =========================================
-- 7. COLLECTION PURPOSES
-- =========================================

CREATE TABLE collection_purposes (
    vocabulary_collection_id UUID NOT NULL,
    purpose_id UUID NOT NULL,

    PRIMARY KEY (vocabulary_collection_id, purpose_id),

    CONSTRAINT fk_collection_purposes_collection
        FOREIGN KEY (vocabulary_collection_id)
        REFERENCES vocabulary_collections(id),

    CONSTRAINT fk_collection_purposes_purpose
        FOREIGN KEY (purpose_id)
        REFERENCES purposes(id)
);
