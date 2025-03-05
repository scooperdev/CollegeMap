CREATE DATABASE IF NOT EXISTS college_map;
USE college_map;

CREATE TABLE IF NOT EXISTS buildings (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    floor_plan_image VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS rooms (
    id VARCHAR(50) PRIMARY KEY,
    building_id VARCHAR(50) NOT NULL,
    room_number VARCHAR(20) NOT NULL,
    room_name VARCHAR(100),
    floor_number INT,
    FOREIGN KEY (building_id) REFERENCES buildings(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;