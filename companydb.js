// This application process is run in Node.js using console table, Inquirer and MySQL database
// It uses the information from the CompanyDB, a MySQL databases, with tables Employees, EErole and Department
// The application Adds, deletes and updates the Database tables;  It views the tables by employees, by departments,
// by employee titles/Roles and by Manager

const cTable = require('console.table');
const inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
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
      type: "rawlist",
      message: "What would you like to do?",
      name: "action",
      choices: [
        "View all Employees", //Done
        // "View all Employees by Departments", 
        "View all Employees by Manager",
        "View all Employees by Titles/Roles",      
        "View all Departments",   //Done
        "View all Roles",        
        "Add New Departments",    //done
        "Add New Titles/Roles",   //done
        "Add New Employee",       //done
        "Update Employee Manager",  //done
        "Remove Employee",
        "Remove Department",
        "Remove Title/Role"      
      ]
    }
  ]).then(answer => {
      switch(answer.action) {
          case 'View all Employees':
              viewallEes();
              break;
          // case 'View all Employees by Departments':
          //     vieweebyDept();
          //     break;
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
          case 'Remove Title/Role':
                remRole();
                break;          
          case 'Exit':
              connection.end(); 
              break;             
    }    
  }
)}

//View all Employees
function viewallEes() {
  const eeinnerJoin = "SELECT eeid, first_name, last_name, manager, manager_id, t2.role_id, title, salary, department_id FROM employee t1 INNER JOIN eerole t2 ON t1.role_id = t2.role_id ORDER BY eeid;"
   console.log("Selecting all employees...\n");  // REMOVE
  connection.query(eeinnerJoin, function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement which is selecting All Employees by inner joining the  
    // Employee table to the EErole table by eerole_id 
    console.table(res);

    // Re-prompt the user what they want to do next
    startPrompts();
  });
}

// View all Employees by Department
// function vieweebyDept() {
//   const eeinnerJoin = "SELECT eeid, first_name, last_name, manager, manager_id, t2.role_id, title, salary, department_id FROM employee t1 INNER JOIN eerole t2 ON t1.role_id = t2.role_id ORDER BY department_id;"
//   console.log("Selecting all employees by Department...\n");  //REMOVE
//   connection.query("SELECT * FROM employee", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement which is selecting All Employees by Departments
//     console.table(res);

//     //Restart the prompts from the beginning
//     startPrompts();
//   });
// }

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
  const eeinnerJoin = "SELECT eeid, first_name, last_name, manager, manager_id, t2.role_id, title, salary, department_id FROM employee t1 INNER JOIN eerole t2 ON t1.role_id = t2.role_id ORDER BY title;"
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
        //DONE
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
    // DONE
//View all Roles and Salary
function viewallRoles() {
  console.log("Selecting all Titles/Roles by Department...\n");
    const eeinnerJoin = "SELECT title, salary, t2.department_id, department FROM eerole t1 INNER JOIN department t2 ON t1.department_id = t2.department_id ORDER BY title;"
    connection.query(eeinnerJoin, function(err, res) {
      if (err) throw err;
    // Log all results of the SELECT statement which is selecting All Employee Roles by inner joining the  
    // Employee Role table to the Department table by department ID and ordering by title
    console.table(res);

    // Re-prompt the user what they want to do next
    startPrompts();
  });
}
            // DONE
// This function adds a department to the Department database table
function addnewDept() {
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
        }
      );
    });
}

                // DONE
// This function adds a Title/Role, Salary and Department ID
function addnewRole() {
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
        }
      );
    });
}
            ///DONE
  // This function adds an Employee
function addnewEes() {
  // prompt for adding employees to the database
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
        type: "list",
        message: "What is the Employee's role ID?",
         // This Numbered list represents the Employees Titles/Roles, with Lead Engineer=1, Software Engineer=2,
         // Sales Manager = 3, Sales Person = 4, Accountant = 5, Legal Team Lead = 6, Lawyer = 7 etc          
        choices: [
           1, 
           2, 
           3,
           4,
           5,
           6,
           7
         ]
     },
      {
        name: "manager",
        type: "list",
        message: "Who is Employee's Manager?",        
        choices: [
          "Ashley Rodriquez", 
          "Kevin Tupik", 
          "Galal Tammer",
          "John Doe",
          "Mike Chan",
          "Malia Brown",
          "Sarah Lourd",
          "Tom Allen"
        ]
      },
      {
        type: "list",
        message: "What is the Employee's Manager ID: Select the same Manager to get the ID?",
        name: "mgrid",
        // This Manager_id corresponds to the list of Employees ID, Ashley =1, Kevin =2 etc
        choices: [
          "1 Ashley Rodriquez", 
          "2 Kevin Tupik", 
          "3 Galal Tammer",
          "4 John Doe",
          "5 Mike Chan",
          "6 Malia Brown",
          "7 Sarah Lourd",
          "8 Tom Allen"
          // 1, 
          // 2, 
          // 3,
          // 4,
          // 5,
          // 6,
          // 7,
          // 8
        ]
      } 
    ])
    .then(function(answer) {
      // Substring the response for Manager_id to pass only the first number value
      let mgrId = answer.mgrid.substring(0, answer.mgrid.indexOf(" "));
      let manId = parseInt(mgrId);
      // let mgrId = answer.mgrid.substring(0, answer.mgrid.indexOf(" "));
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.fname,
          last_name: answer.lname,
          role_id: answer.roleid,          
          manager: answer.manager,
          manager_id: manId
          // manager_id: answer.mgrid       
        },
        function(err) {
          if (err) throw err;
          console.log("Employee added successfully!");
          // Re-prompt the user what they want to do next
          startPrompts();
        }
      );
    });
}

// This Function Updates the Employees Manager in the Employees database Table
function updateManager() {
  // prompt for updating the employees Manage in the Employees table
  inquirer
    .prompt([
      {
        type: "rawlist",
        message: "Which employee's do you want to update with a Manager?",
        name: "eename",
        choices: [
          "Ashley Rodriquez", 
          "Kevin Tupik", 
          "Galal Tammer",
          "John Doe",
          "Mike Chan",
          "Malia Brown",
          "Sarah Lourd",
          "Tom Allen"
        ]
      },
      {
        type: "rawlist",
        message: "Which Manager do you want to set for the selected Employee?",
        name: "mgrname",
        choices: [
          "Ashley Rodriquez", 
          "Kevin Tupik", 
          "Galal Tammer",
          "John Doe",
          "Mike Chan",
          "Malia Brown",
          "Sarah Lourd",
          "Tom Allen"
        ]
      },
      {
        type: "rawlist",
        message: "What is the Manager ID for the selected Employee?",
        name: "mgrid",
        // This Manager_id corresponds to the Employees ID, for Example, Ashley's manager_id =1, Kevin's manager_id =2 etc
        // Since the Manager_id is an interger, the numbers will be parsed out of the response, so that only the interger
        // number is passed 
        choices: [
          "1 Ashley Rodriquez", 
          "2 Kevin Tupik", 
          "3 Galal Tammer",
          "4 John Doe",
          "5 Mike Chan",
          "6 Malia Brown",
          "7 Sarah Lourd",
          "8 Tom Allen"
        ]
      }      
    ])
    .then(function(answer) {
      // Substring the response to pass only the First Name
      let eeName = answer.eename.substring(0, answer.eename.indexOf(" "));

      console.log("answer: ", answer);
      console.log(eeName);
      // Substring the response for Manager_id to pass only the first number value
      let mgrId = answer.mgrid.substring(0, answer.mgrid.indexOf(" "));
      console.log(mgrId);
      // Parse the response number value which is a string in order to turn it into a numeric value, 
      // since manager_id is an Integer
      let manId = parseInt(mgrId);
      console.log(manId);
      
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "UPDATE employee SET ? WHERE ? ",
        [
          {              
              manager: answer.mgrname,
              manager_id: manId
          },
          {
              first_name: eeName
                       
          }
          
        ],      
      function(err) {
        if (err) throw err;
        console.log("Manager Updated successfully!");
        // Rre-prompt the user for if they want to bid or post
        startPrompts();
        // connection.end();
    });

  });
}

 // This Function Removes an employee from the Database
function remEes() {
  // prompt for removing employees from the database
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the First Name of the employee you want to remove?",
        name: "fname",
        // choices: [
        //   "Ashley Rodriquez", 
        //   "Kevin Tupik", 
        //   "Galal Tammer",
        //   "John Doe",
        //   "Mike Chan",
        //   "Malia Brown",
        //   "Sarah Lourd",
        //   "Tom Allen"
        // ]
      },
      {
        type: "input",
        message: "What is the Last Name of the employee you want to remove?",
        name: "lname",
      }   
    ])
    .then(function(answer) {
      // console.log("answer: ", answer);
      // console.log("empty space index: ", answer.name.indexOf(" "));
      // This step will read the string of full name until it encounters the first space in the full name.  That means the  
      // first space is after the First Name, so the step will place that result into the response 
      // let firstName = answer.name.substring(0, answer.name.indexOf(" "));

      // console.log("firstName: ", firstName);
      // when finished prompting, delete the employee by their first name
      connection.query(
        "DELETE FROM employee WHERE ?",
      {
          first_name: fname,
          last_name: lname
        
      },
      function(err) {
        if (err) throw err;
        console.log("Employee deleted successfully!");
        // re-prompt the user for if they want to bid or post
        startPrompts();
    });

  });
}

// This function removes a department from the Department database table
function remDept() {  
  // prompt for removing a Department from the database table, Department ID required
  // This is 1 = Engineering; 2= Sales; 3= Finance; 4=Legal; 
  // Note:   you need to get the list by wiewing the Department first
  inquirer
    .prompt([
      {
        type: "input",
        message: "What Department would you like to Delete? Enter Department ID",
        name: "deptid"       
      }
    ])      
    .then(function(answer) {
      // let dept = answer.deptid;
      // const eeinnerJoin = `DELETE department , eerole FROM department INNER JOIN eerole ON eerole.department_id = department.department_id WHERE department.department_id=${dept}`
      // SELECT title, salary, t2.department_id, department FROM eerole t1 INNER JOIN department t2 ON t1.department_id = t2.department_id ORDER BY department_id;"
           
      // when finished prompting, insert a new item into the db with that info
      // connection.query(eeinnerJoin,
      connection.query(
        "DELETE FROM department WHERE ?",
        {
          // department: answer.deptname
          department_id: answer.deptid             
        },        
        function(err) {
          if (err) throw err;
          console.log("Department deleted successfully!");
          // re-prompt the user what they want to do next
          startPrompts();
        }
      );
    });
}
 

