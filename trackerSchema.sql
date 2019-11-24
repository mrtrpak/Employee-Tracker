DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);

INSERT INTO department (name) VALUES
("Accounting"), ("Human Resources"), ("Programming"), ("Sales");

INSERT INTO role (title, salary, department_id) VALUES
("Accounting Manager", 100000, 1), ("Accountant", 70000, 1),
("HR Manager", 80000, 2), ("HR Assistant", 55000, 2),
("Senior Software Developer", 150000, 3), ("Junior Developer", 65000, 3),
("Sales Manager", 80000, 4), ("Sales Associate", 50000, 4), ("Intern", 30000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
("Ashley", "Moon", 1, null), ("Bradley", "Vargas", 2, 1), 
("John", "Milton", 3, null), ("Katalina", "Susso", 4, 3),
("Lily", "Shelton", 5, null), ("Marvin", "Jetson", 6, 5),
("Henry", "Caster", 7, null), ("Emily", "Bloom", 8, 5), ("Shannon", "Finch", 9, 5);

