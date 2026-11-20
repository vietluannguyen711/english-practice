CREATE TABLE
    app_user (
        id UUID PRIMARY KEY,
        username VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        date_of_birth DATE,
        avatar VARCHAR(500),
        role VARCHAR(50) NOT NULL DEFAULT 'ROLE_USER',
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL
    );