-- Database: cityconnect

-- DROP DATABASE IF EXISTS cityconnect;

CREATE DATABASE cityconnect
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_India.1252'
    LC_CTYPE = 'English_India.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

select * from users;

-- =========================
-- USERS TABLE (Simplified)
-- =========================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    email VARCHAR(254) UNIQUE,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    eco_coins INTEGER DEFAULT 0,
    area VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- DEPARTMENTS TABLE
-- =========================
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- =========================
-- ADMINS TABLE (Separate from users)
-- =========================
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    email VARCHAR(254) UNIQUE,
    first_name VARCHAR(150) DEFAULT '',
    last_name VARCHAR(150) DEFAULT '',
    role VARCHAR(20) CHECK (
        role IN ('superadmin', 'department_admin', 'officer')
    ) NOT NULL,
    department_id INT REFERENCES departments(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- REPORTS TABLE
-- =========================
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(20) CHECK (category IN ('pothole', 'garbage', 'lighting', 'other')),
    title VARCHAR(100),
    description TEXT,
    image VARCHAR(255),
    location VARCHAR(255) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Pending', 'Resolved', 'Rejected')) DEFAULT 'Pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    admin_feedback TEXT
);

-- =========================
-- TASKS TABLE
-- =========================
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100),
    description TEXT,
    proof_image VARCHAR(255),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    admin_feedback TEXT,
    eco_coins_awarded INTEGER NOT NULL DEFAULT 0,
    task_type VARCHAR(20) CHECK (task_type IN ('cleanup', 'awareness', 'donation'))
);

-- =========================
-- NEWS TABLE
-- =========================
CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    created_by INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- CONTACT MESSAGES TABLE
-- =========================
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    subject VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    email VARCHAR(254) NOT NULL,
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- REDEMPTIONS TABLE
-- =========================
CREATE TABLE redemptions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_name VARCHAR(100) NOT NULL,
    coins_spent INTEGER NOT NULL,
    requested_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(10) CHECK (status IN ('Pending', 'Approved', 'Rejected')) DEFAULT 'Pending'
);
