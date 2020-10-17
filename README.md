# W12_HW_Managingemployees

# Concept
In this homework assignment, I need to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

# User Story
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business 

## Instructions
Design the following database schema containing three tables:

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may
                     be null if the employee has no manager

# How the Process Works
Open a terminal and type "node companydb.js", as this calls the application.  A drop down list will appear for you to select an option of what you would like to do (see the list below).  You can select one of the list below.  Based on the selection you will need to either enter some information or make a select of choices from a drop dow list.  Here is a summary of what takes place as you select one of the below options

   *  View all Employees - This selection will return a view of all the Employees ordered by Department. (Employee
      and EERole tables are Inner Joined using Role_id, and the results is then Inner Joined
      to Department using Department_id and everything is ordered by the department ID)

   *  View all Employees by Manager - This selection will return a view of the Managers associated with an
      employee, ordered by department ID. (Employee and EERole tables are Inner Joined using Role_id, and the results is Inner Joined to Department using Department_id and everything is ordered by the department ID)

   *  View all Employees by Titles/Roles - This selection will return a view of the employees by their Titles/
      Roles.  (Employee and EERole tables are Inner Joined using Role_id and the results
      is then Inner Joined to Department using Department_id and everything is ordered by the TITLE)

   *  View all Departments - This selection will return a view of All records from the Department table

   *  View all Roles - This selection will return all the Title\Roles. (EERole and Department tables are Inner 
      Joined by department_id and ordered by the department_id)

   *  Add New Departments - For this selection the user is asked "What Department would you like to Add?", once
      answered a new department is INserted into the Department table.  To see the
      new department, select the "View all Departments" from the list. 

   *  Add New Titles/Roles - This selection will ask Three questions:
      1: What Title/Role would you like to Add?
      2: What is the Salary for this Title/Role?
      3: What is the Department ID?
         Once all questions are answered, it will insert/add a new Title/Role to the EERole table.  To view the new
         record, select the "View all Employees" from the list.  

   *  Add New Employee - This selection will firstly return a view of all the employee records by department ID,
      then it prompts the users with ask three questions
      1: What is your Employee First Name?
      2: What is your Employee Last Name?
      3: What is the Employee's role ID
         Once all questions are answered A new employee is added/Inserted to the Employee table. To view the new
         record, select the "View all Employees" from the list. 

   *  Update Employee Manager - This selection will firstly return a view of all the employee records by
      department ID, then it prompts the users with three questions. 
      1: Which employee do you want to update with a Manager?
      2: Enter a Manager for the employee, that is in the same department"
      3: What is the Manager ID? Select the EEid of the Manager selected
         Once all questions are answered, the process will UPDATE the Employee table and assign a Manager.  Note: The Manager should be in the same department as the employee, that is they should have the same department ID.  For example, employee is a Sales Person and his Manager is a Sales Manager and department ID is 6.
         To view the updated record, select the "View all Employees" from the list.  

   *  Remove Employee - This selection will firstly return a view of all the employee records by
      department ID, then it prompts the users with two questions.
      1: What is the Name of the employee you want to remove?
      2: What is the Employee ID? Select the EEid of the Employee
         NOTE: The Manager_ID is a foreign Key in the Employee table.  Because of that there is a constraint if the there is a manager assigned to the record the user is trying to remove.  Once the prompts are answered, the process will perform three connection to the database.

      1: Select all the records from the Employee table WHERE the Manager_id is equal to the Employee ID
      2: Update any record where the manager ID is found.  The Manager and Manager ID are set to NULL.
      3: DELETE the employee record by the employee's first name and the EEID entered.
         To view if the employee was removed, select the "View all Employees" from the list. 

   *  Remove Department - NOTE: Because the department ID is a foreign key in the EEROLE table, a department
      cannot be deleted from the department table unless the Employees assigned to that depart are first 
      deleted/Removed.  Once the employees are removed, when this selection is processed, the department is removed.
      To view if the department was removed, select the "View all Departments" from the list.     

# Tools:
 * Inquirer NPM Package – to prompt the user to either enter specific information or to select a item
   from the drop down list          
 * Package json
 * Control Table - so that the data can be viewed on the terminal
 * MySQL WorkBench - in order to load the Employee, Department and Role data to the database 
 * Run as Node CLI to gather the information 
  
# Links:
    GitHub Repository: https://github.com/whintzen/W12_HW_Managingemployees
    
    Screencastify video:   
    
    #Image:
    <img src="images/Teams.png" alt="EngineeringTeam">