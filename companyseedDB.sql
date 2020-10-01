DROP DATABASE IF EXISTS company_DB;
CREATE DATABASE company_DB;

USE company_DB;

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NULL,  
  PRIMARY KEY (department_id) 
);

CREATE TABLE eerole (
  role_id INT NOT NULL AUTO_INCREMENT, 
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT, 
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id) REFERENCES department (department_id)
);

-- added the fields Manager and Title
CREATE TABLE employee (
  eeid INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  manager VARCHAR (60) NULL,
  title VARCHAR (30) NULL,
  role_id INT ,
  manager_id INT,
    PRIMARY KEY (eeid),
    FOREIGN KEY (role_id) REFERENCES eerole (role_id),
    FOREIGN KEY (manager_id) REFERENCES employee (eeid)
);

INSERT INTO department (department) VALUES ('Engineering');
INSERT INTO department (department) VALUES ('Sales');
INSERT INTO department (department) VALUES ('Finance');
INSERT INTO department (department) VALUES ('Legal');

Select * from department;

INSERT INTO eerole (title, salary, department_id) VALUES ('Lead Engineer', 150000, 1);
INSERT INTO eerole (title, salary, department_id) VALUES ('Software Engineer', 120000, 1);
INSERT INTO eerole (title, salary, department_id) VALUES ('Sales Manager', 100000, 2);
INSERT INTO eerole (title, salary, department_id) VALUES ('Sales Person', 80000, 2);
INSERT INTO eerole (title, salary, department_id) VALUES ('Accountant', 125000, 3);
INSERT INTO eerole (title, salary, department_id) VALUES ('Legal Team Lead', 250000, 4);
INSERT INTO eerole (title, salary, department_id) VALUES ('Lawyer', 190000, 4);

Select * from eerole;
Select * from department;

INSERT INTO employee (first_name, last_name, title, role_id) VALUES ('Ashley', 'Rodriquez', 'Lead Engineer', 1);
INSERT INTO employee (first_name, last_name, title, role_id) VALUES ('Kevin', 'Tupik', 'Software Engineer', 2);
INSERT INTO employee (first_name, last_name, title, role_id) VALUES ('Galal', 'Tammer', 'Software Engineer', 2);
INSERT INTO employee (first_name, last_name, title, role_id) VALUES ('John', 'Doe', 'Sales Manager', 3);
INSERT INTO employee (first_name, last_name, title, role_id) VALUES ('Mike', 'Chan', 'Sales Person', 4);
INSERT INTO employee (first_name, last_name, title, role_id) VALUES ('Malia', 'Brown', 'Accountant', 5);
INSERT INTO employee (first_name, last_name, title, role_id) VALUES ('Sarah', 'Lourd', 'Legal Team Lead', 6);
INSERT INTO employee (first_name, last_name, title, role_id) VALUES ('Tom', 'Allen', 'Lawyer', 7);

UPDATE employee
SET manager_id=1, manager="Ashley Rodriquez"
WHERE eeid=4 ;

UPDATE employee
SET role_id=5
WHERE last_name="Hintzen";

-- INSERT INTO employee (first_name, last_name, role_id) VALUES ('Ashley', 'Rodriquez', 1);
-- INSERT INTO employee (first_name, last_name, role_id) VALUES ('Kevin', 'Tupik', 2);
-- INSERT INTO employee (first_name, last_name, role_id) VALUES ('Galal', 'Tammer', 3);
-- INSERT INTO employee (first_name, last_name, role_id) VALUES ('John', 'Doe', 4);
-- INSERT INTO employee (first_name, last_name, role_id) VALUES ('Mike', 'Chan', 5);
-- INSERT INTO employee (first_name, last_name, role_id) VALUES ('Malia', 'Brown', 6);
-- INSERT INTO employee (first_name, last_name, role_id) VALUES ('Sarah', 'Lourd', 7);
-- INSERT INTO employee (first_name, last_name, role_id) VALUES ('Tom', 'Allen', 8);


-- INSERT INTO employee (first_name, last_name, role_id, title, manager) VALUES ('Ashley', 'Rodriquez', 1, '', 'Lead Engineer','' );
-- INSERT INTO employee (first_name, last_name, role_id, title, manager) VALUES ('Kevin', 'Tupik', 2, '', '', '');
-- INSERT INTO employee (first_name, last_name, role_id, title, manager) VALUES ('Galal', 'Tammer', 3, '', '', '');
-- INSERT INTO employee (first_name, last_name, role_id, title, manager) VALUES ('John', 'Doe', 4, '', '', '');
-- INSERT INTO employee (first_name, last_name, role_id, title, manager) VALUES ('Mike', 'Chan', 5, '', '', '');
-- INSERT INTO employee (first_name, last_name, role_id, title, manager) VALUES ('Malia', 'Brown', 6, '', '', '');
-- INSERT INTO employee (first_name, last_name, role_id, title, manager) VALUES ('Sarah', 'Lourd', 7, '', '', '');
-- INSERT INTO employee (first_name, last_name, role_id, title, manager) VALUES ('Tom', 'Allen', 8, '', '', '');

UPDATE employee
SET manager_id=1, manager="Ashley Rodriquez", title='Sales Manager'
WHERE eeid=4 ;

DELETE FROM eerole WHERE salary = 10000;
DELETE FROM eerole;










# Do not use 
ALTER TABLE eerole
ADD FOREIGN KEY (department_id) REFERENCES department (department_id);

ALTER TABLE employee
ADD FOREIGN KEY (role_id) REFERENCES eerole (role_id);

ALTER TABLE employee
ADD FOREIGN KEY (manager_id) REFERENCES eerole (manager_id);