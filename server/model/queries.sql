CREATE DATABASE todolist;



CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(500),
    email VARCHAR(500),
    mobile VARCHAR(500),
    password VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(200),
    description VARCHAR(500),
    status BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);