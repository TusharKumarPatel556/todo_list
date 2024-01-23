CREATE DATABASE todolist

CREATE TABLE task(
task_id SERIAL PRIMARY KEY,
title VARCHAR(200),
description VARCHAR(500),
status BOOLEAN
);