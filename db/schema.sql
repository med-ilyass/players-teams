DROP TABLE IF EXISTS players;

DROP TABLE IF EXISTS teams;

CREATE TABLE teams(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    city VARCHAR(255) NOT NULL,
    coach VARCHAR(255),
    founded_year INT
);

CREATE TABLE players(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    number INT NOT NULL,
    age INT CHECK (age >= 15),
    team_id INT REFERENCES teams(id) ON DELETE SET NULL
);