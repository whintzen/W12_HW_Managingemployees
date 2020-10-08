
DROP DATABASE IF EXISTS company_DB;
CREATE DATABASE company_DB;

USE company_DB;

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NULL,  
  PRIMARY KEY (department_id) 
);

-- Added the ON Delete Cascade in order to remove the department 
-- from both the department table and the eerole table 
CREATE TABLE eerole (
  role_id INT NOT NULL AUTO_INCREMENT, 
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT, 
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id) REFERENCES department (department_id)
  ON DELETE CASCADE
);

-- added the fields Manager to help see the Manager Names instead of the ID
CREATE TABLE employee (
  eeid INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  manager VARCHAR (60) NULL, 
  role_id INT ,
  manager_id INT,
    PRIMARY KEY (eeid),
    FOREIGN KEY (role_id) REFERENCES eerole (role_id),
    FOREIGN KEY (manager_id) REFERENCES employee (eeid)
    ON DELETE CASCADE    
);


