INSERT INTO department (department) VALUES ('Engineering');
INSERT INTO department (department) VALUES ('Sales');
INSERT INTO department (department) VALUES ('Finance');
INSERT INTO department (department) VALUES ('Legal');


INSERT INTO eerole (title, salary, department_id) VALUES ('Lead Engineer', 150000, 1);
INSERT INTO eerole (title, salary, department_id) VALUES ('Software Engineer', 120000, 1);
INSERT INTO eerole (title, salary, department_id) VALUES ('Sales Manager', 100000, 2);
INSERT INTO eerole (title, salary, department_id) VALUES ('Sales Person', 80000, 2);
INSERT INTO eerole (title, salary, department_id) VALUES ('Accountant', 125000, 3);
INSERT INTO eerole (title, salary, department_id) VALUES ('Legal Team Lead', 250000, 4);
INSERT INTO eerole (title, salary, department_id) VALUES ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id) VALUES ('Ashley', 'Rodriquez', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Kevin', 'Tupik', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Galal', 'Tammer', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('John', 'Doe', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Mike', 'Chan', 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Malia', 'Brown', 5);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Sarah', 'Lourd', 6);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Tom', 'Allen', 7);

SELECT eeid, first_name, last_name, manager, manager_id, t2.role_id, title, salary, department_id 
FROM employee t1 
    INNER JOIN eerole t2 ON t1.role_id = t2.role_id ORDER BY eeid;




