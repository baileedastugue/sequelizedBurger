CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers (
	id INT(20) NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(50) NOT NULL,
    devour BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);