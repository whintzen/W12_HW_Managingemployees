# W12_HW_Managingemployees

In this homework assignment, I need to architect and build a solution for managing a company's employees using node, inquirer, and MySQL. 

# How the Process Works
Open a terminal and type "node companydb.js", as this calls the application.  A drop down list will appear for you to select an option of what you would like to do.  You can select one of the list below.  Based on the selection you will need to either enter some information or make a select of choices from a drop dow list.  I have given a summary of what takes place as you select on of the below options 
   *  View all Employees - Employee and Role tables are Inner Joined by Role_id and ordered by the EEID         
   *  View all Employees by Manager - Employee and Role tables are Inner Joined by Role_id and ordered by the Manager
   *  View all Employees by Titles/Roles - Employee and Role tables are Inner Joined by Role_id and ordered by the
      title     
   *  View all Departments - Select All records from the Department table    
   *  View all Roles - Role and Department tables are Inner Joined by department_id and ordered by the Title        
   *  Add New Departments - A new department is INserted into the Department table    
   *  Add New Titles/Roles - A new Title/Role, along with the Salary and Department_Id is INserted into the Eerole table  
   *  Add New Employee - A new employee by First Name, Last Name, Role ID, Manager Name and Manager ID is added       
   *  Update Employee Manager - Select the Employee and using the UPDATE process assign a Manager.  The Manager can have
      the same Role Id as the employee or can be in a similar group as the employee.  For example, employee is a Sales Person and his Manager is a Sales Manager. 
   *  Remove Employee
   *  Remove Department and Titles/Roles

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
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

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