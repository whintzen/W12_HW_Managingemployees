// This application process is run in Node.js using console table, Inquirer and MySQL database
// It uses the information from the CompanyDB, a MySQL databases, with tables Employees, EErole and Department
// The application Adds, deletes and updates the Database tables;  It views the tables by employees, by departments,
// by employee titles/Roles and by Manager

const cTable = require('console.table');
const inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  multipleStatement: true,

  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  
  // Your username
  user: "root",

  // Your password
  password: "Computer12",
  database: "company_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  startPrompts();
});

function startPrompts() {
  inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "action",
      choices: [
        "View all Employees",          
        "View all Employees by Manager",
        "View all Employees by Titles/Roles",      
        "View all Departments",   
        "View all Roles",        
        "Add New Departments",   
        "Add New Titles/Roles",   
        "Add New Employee",       
        "Update Employee Manager", 
        "Remove Employee",
        "Remove Department"
              
      ]
    }
  ]).then(answer => {
      switch(answer.action) {
          case 'View all Employees':
              viewallEes();
              break;          
          case 'View all Employees by Manager':
              vieweebyManager();
              break;
          case 'View all Employees by Titles/Roles':
              vieweebyRole();
              break;
          case 'View all Departments':
              viewallDept();
              break;
          case 'View all Roles':
              viewallRoles();
              break;
          case 'Add New Departments':
              addnewDept();
              break;          
          case 'Add New Titles/Roles':
              addnewRole();
              break;
          case 'Add New Employee':
              addnewEes();
              break;
          case 'Update Employee Manager':
              updateManager();
              break;
          case 'Remove Employee':
              remEes();
              break;
          case 'Remove Department':
              remDept();
              break;                 
          case 'Exit':
              connection.end(); 
              break;             
    }    
  }
)}

//View all Employees
function viewallEes() {
  // const eeinnerJoin = "SELECT eeid, first_name, last_name, manager, manager_id, t2.role_id, title, salary, department_id FROM employee t1 INNER JOIN eerole t2 ON t1.role_id = t2.role_id ORDER BY eeid;"
  const eeinnerJoin = "SELECT eeid, first_name, last_name, manager, manager_id, t2.role_id, title, salary, t3.department_id, department FROM employee t1 INNER JOIN eerole t2 USING (role_id) INNER JOIN department t3 USING (department_id) ORDER BY eeid;"
  console.log("Selecting all employees ordered by EEid...\n");  
  connection.query(eeinnerJoin, function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement which is selecting All Employees by inner joining the  
    // Employee table to the EErole table by eerole_id 
    console.table(res);
    
    // Re-prompt the user what they want to do next
    startPrompts();
  });
}

// View all Employees by Manager
function vieweebyManager() {
  const eeinnerJoin = "SELECT eeid, first_name, last_name, manager, manager_id, t2.role_id, title, salary, department_id FROM employee t1 INNER JOIN eerole t2 ON t1.role_id = t2.role_id ORDER BY manager;"
 
  console.log("Selecting all employees by Manager...\n");
  connection.query(eeinnerJoin, function(err, res) {
    if (err) throw err; 

    // Log all results of the SELECT statement which is selecting All Employees by inner joining the  
    // Employee table to the EErole table by eerole_id and ordering by manager
    console.table(res);

    // Re-prompt the user what they want to do next
    startPrompts();
  });
}

// View all Employees by Titles/Roles
function vieweebyRole() {
  // const eeinnerJoin = "SELECT eeid, first_name, last_name, manager, manager_id, t2.role_id, title, salary, department_id FROM employee t1 INNER JOIN eerole t2 ON t1.role_id = t2.role_id ORDER BY title;"
  const eeinnerJoin = "SELECT eeid, first_name, last_name, manager, manager_id, t2.role_id, title, salary, t3.department_id, department FROM employee t1 INNER JOIN eerole t2 USING (role_id) INNER JOIN department t3 USING (department_id) ORDER BY title;"
  console.log("Selecting all employees by Title/Roles...\n");
  connection.query(eeinnerJoin, function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement which is selecting All Employees by inner joining the  
    // Employee table to the EErole table by eerole_id and ordering by title
    console.table(res);

    // Re-prompt the user what they want to do next
    startPrompts();
  });
}
       
//View all Departments
function viewallDept() {
  console.log("Selecting all departments...\n");
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);

   // Re-prompt the user what they want to do next
    startPrompts();
  });
}
   
//View all Roles and Salary
function viewallRoles() {
  console.log("Selecting all Titles/Roles by Department...\n");
    const eeinnerJoin = "SELECT title, salary, role_id, t2.department_id, department FROM eerole t1 INNER JOIN department t2 ON t1.department_id = t2.department_id ORDER BY title;"
    connection.query(eeinnerJoin, function(err, res) {
      if (err) throw err;

    // Log all results of the SELECT statement which is selecting All Employee Roles by inner joining the  
    // Employee Role table to the Department table by department ID and ordering by title
    console.table(res);

    // Re-prompt the user what they want to do next
    startPrompts();
  });
}
        
// This function adds a department to the Department database table
function addnewDept() {
  console.log("Adding New Department...\n");
  // prompt for adding a new Department to the database table
  inquirer
    .prompt([
      {
        type: "input",
        message: "What Department would you like to Add?",
        name: "deptname"
      }
    ])      
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          department: answer.deptname             
        },
        function(err) {
          if (err) throw err;
          console.log("Department added successfully!");

          // Re-prompt the user what they want to do next
          startPrompts();
        });
    });
}
              
// This function adds a Title/Role, Salary and Department ID
function addnewRole() {
  console.log("Adding a New Title/Role...\n");
  // prompt for adding a New Title/Role, Salary and Department ID to the EEROLE database table
  inquirer
    .prompt([
      {
        type: "input",
        message: "What Title/Role would you like to Add?",
        name: "rolename"
      },
      {
        type: "input",
        message: "What is the Salary for this Title/Role?",
        name: "salary"        
      },
      {
        type: "input",
        message: "What is the Department ID?",
        name: "deptid"        
      }
    ])      
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO eerole SET ?",
        {
          title: answer.rolename,
          salary: answer.salary,
          department_id: answer.deptid             
        },
        function(err) {
          if (err) throw err;
          console.log("Title/Role added successfully!");
          // Re-prompt the user what they want to do next
          startPrompts();
        });
    });
}
           
  // This function allows you to add an Employee
function addnewEes() {
  //Select all the employees currently in the Database as this will provide helpful information with the prompts
  const eeinnerJoin = "SELECT title, salary, role_id, t2.department_id, department FROM eerole t1 INNER JOIN department t2 ON t1.department_id = t2.department_id ORDER BY title;"
  console.log("Adding a new Employee...\n");
  connection.query(eeinnerJoin, function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement which is selecting All Employees by inner joining the  
    // Employee table to the EErole table by eerole_id 
    console.table(res);
    addeeInquirer();
  });
  // prompt for adding employees to the database
  let addeeInquirer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your Employee First Name?",
        name: "fname"
      },
      {
        type: "input",
        message: "What is your Employee Last Name?",
        name: "lname"
      },
      {
        name: "roleid",        
        type: "input",
        message: "What is the Employee's role ID?"
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.fname,
          last_name: answer.lname,
          role_id: answer.roleid,
                                   
        },
        function(err) {
          if (err) throw err;
          console.log("Employee added successfully!");
          // Re-prompt the user what they want to do next
          startPrompts();
        }
      );
    });
}}

// This step Updates the Employee's Manager in the Employees database Table
function updateManager() {
  // const eeinnerJoin = "SELECT eeid, first_name, last_name, manager, manager_id, t2.role_id, title, salary, department_id FROM employee t1 INNER JOIN eerole t2 ON t1.role_id = t2.role_id ORDER BY eeid;"
  const eeinnerJoin = "SELECT eeid, first_name, last_name, manager, manager_id, t2.role_id, title, salary, t3.department_id, department FROM employee t1 INNER JOIN eerole t2 USING (role_id) INNER JOIN department t3 USING (department_id) ORDER BY eeid;"
  console.log("Updating an Employee with a Manager...\n");
  connection.query(eeinnerJoin, function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement which is selecting All Employees by inner joining the  
    // Employee table to the EErole table by eerole_id 
    console.table(res);
    updatemgrInquirer();
  });
  // prompt for updating the employees Manage in the Employees table
  let updatemgrInquirer = () => {
  inquirer
    .prompt([
      {
        // type: "list",
        type: "input",
        message: "Which employee do you want to update with a Manager?",
        name: "eename"        
      },
      {
        // type: "list",
        type: "input",
        message: "Enter a Manager for the employee, that is in the same department",
        name: "mgrname"        
      },
      {
        // type: "list",
        type: "input",
        message: "What is the Manager ID? Select the EEid of the Manager selected",
        name: "mgrid"        
      }      
    ])
    .then(function(answer) {
      // Substring the response to pass only the First Name
      let eeName = answer.eename.substring(0, answer.eename.indexOf(" "));      
           
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "UPDATE employee SET ? WHERE ? ",
        [
          {              
              manager: answer.mgrname,
              manager_id: answer.mgrid
          },
          {
              first_name: eeName
                       
          }
          
        ],      
      function(err) {
        if (err) throw err;
        console.log("Manager Updated successfully!");
        // Re-prompt the user for if they want to bid or post
        startPrompts();
        
    });

  });
}}

 // This Function Removes an employee from the Database
function remEes() {
  //Select all the employees currently in the Database as this will provide helpful information with the prompts
  // const eeinnerJoin = "SELECT eeid, first_name, last_name, manager, manager_id, t2.role_id, title, salary, department_id FROM employee t1 INNER JOIN eerole t2 ON t1.role_id = t2.role_id ORDER BY eeid;"
  const eeinnerJoin = "SELECT eeid, first_name, last_name, manager, manager_id, t2.role_id, title, salary, t3.department_id, department FROM employee t1 INNER JOIN eerole t2 USING (role_id) INNER JOIN department t3 USING (department_id) ORDER BY eeid;"
  console.log("Removing an Employee...\n");
  connection.query(eeinnerJoin, function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement which is selecting All Employees by inner joining the  
    // Employee table to the EErole table by eerole_id 
    console.table(res);
    removeEesInquirer();
  });
  // prompt for removing employees from the database
  let removeEesInquirer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Name of the employee you want to remove?",
        name: "name"
      },
      {
        type: "input",
        message: "What is the Employee ID? Select the EEid of the Employee",
        name: "eeid"
        
      } 
       
    ])
    .then(function(answer) {
      // Substring the response for Employee's name to only get the first number value
      let firstName = answer.name.substring(0, answer.name.indexOf(" "));

      //The Manager id is a foreign key to Employee id
      let mgrId = answer.eeid;      
      
     connection.query(
      "SELECT * FROM employee WHERE ?",
      [
        {
          manager_id: mgrId
      }
      ],
        function(err, res) {
          if (err) throw err;
     connection.query(
      "UPDATE employee SET ? WHERE ? ",
          [
            {
              manager: null,
              manager_id: null
            },
            {
                manager_id: mgrId
            }
          ],
          function(err, res) {
            if (err) throw err;            
    connection.query(
      "DELETE FROM employee WHERE ?",
            {          
               first_name: firstName      
            },
          function(err) {
            if (err) throw err;
             console.log("Employee deleted successfully!");
                // re-prompt the user for if they want to bid or post
             startPrompts();
              
            });
        });    
    });    
   
  });
}}

// This step removes a department from the Department and EERole database tables
function remDept() {
  //Select all the employees currently in the Database as this will provide helpful information with the prompts
  const eeinnerJoin = "SELECT title, salary, role_id, t2.department_id, department FROM eerole t1 INNER JOIN department t2 ON t1.department_id = t2.department_id ORDER BY title;"
  console.log("Deleting a Department...\n");
  connection.query(eeinnerJoin, function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement which is selecting All Employees by inner joining the  
    // Employee table to the EErole table by eerole_id 
    console.table(res);
    removeDeptInquirer();
  });

  // when finished prompting, delete a Department record from the EEROLE table first, then 
  // also delete the record from the Department table.   This is done because the Department_id is a 
  // Foreign key in the EEROLE table and the database will not allow you to do a straight delete from the 
  // the Department table without first removing the record from the EEROLE table.  Because of this linkage, 
  // ON DELETE CASCADE was added to the EEROLE table so there is a cascade effect
  let removeDeptInquirer = () => {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What Department would you like to Delete? Enter Department ID",
        name: "deptid" 
        
      } 
       
    ])
    .then(function(answer) {
     connection.query(
        "DELETE FROM department WHERE ?",
        {
          department_id: answer.deptid            
        },
        function(err) {
          if (err) throw err;
          console.log("Department deleted successfully!");
          // Re-prompt the user what they want to do next
          startPrompts();
        });
    });

  }
}
