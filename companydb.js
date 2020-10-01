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
      type: "list",
      message: "What would you like to do?",
      name: "action",
      choices: [
      "View all Employees", 
      "View all Employees by Departments", 
      "View all Employees by Manager",
      "View all Employees by Titles/Roles",      
      "View all Departments",
      "Add New Departments",
      "Add New Titles/Roles",
      "Add New Employee",       
      "Update Employee Manager",
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
          case 'View all Employees by Departments':
              vieweebyDept();
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
  const eeinnerJoin = "SELECT eeid, first_name, last_name, manager, manager_id, t2.role_id, title, salary, department_id FROM employee t1 INNER JOIN eerole t2 ON t1.role_id = t2.role_id;"
  // console.cTable("Selecting all employees...\n");
  console.log("Selecting all employees...\n");
  connection.query(eeinnerJoin, function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);

    // console.cTable(res);
    startPrompts();
  });
}

// View all Employees by Department
function vieweebyDept() {
  // console.cTable("Selecting all employees...\n");
  console.log("Selecting all employees by Department...\n");
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    // console.cTable(res);
    startPrompts();
  });
}

// View all Employees by Manager
function vieweebyManager() {
  // console.cTable("Selecting all employees...\n");
  console.log("Selecting all employees by Manager...\n");
  connection.query("SELECT * FROM employee ORDER by manager", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    // console.cTable(res);
    startPrompts();
  });
}

// View all Employees by Titles
function vieweebyRole() {
  const eeinnerJoin = "SELECT eeid, first_name, last_name, manager, manager_id, t2.role_id, title, salary, department_id FROM employee t1 INNER JOIN eerole t2 ON t1.role_id = t2.role_id ORDER BY title; "
  // console.cTable("Selecting all employees...\n");
  console.log("Selecting all employees by Title/Roles...\n");
  connection.query(eeinnerJoin, function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    // console.cTable(res);
    startPrompts();
  });
}

//View all Departments
function viewallDept() {
  // console.cTable("Selecting all employees...\n");
  console.log("Selecting all departments...\n");
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);

    // console.cTable(res);
    startPrompts();
  });
}

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
          // re-prompt the user what they want to do next
          startPrompts();
        }
      );
    });
}


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
          // re-prompt the user what they want to do next
          startPrompts();
        }
      );
    });
}

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
          // "1 Ashley Rodriquez", 
          // "2 Kevin Tupik", 
          // "3 Galal Tammer",
          // "4 John Doe",
          // "5 Mike Chan",
          // "6 Malia Brown",
          // "7 Sarah Lourd",
          // "8 Tom Allen"
          1, 
          2, 
          3,
          4,
          5,
          6,
          7,
          8
        ]
      } 
    ])
    .then(function(answer) {
      // let mgrId = answer.mgrid.substring(0, answer.mgrid.indexOf(" "));
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.fname,
          last_name: answer.lname,
          role_id: answer.roleid,          
          manager: answer.manager,
          manager_id: mgrId       
        },
        function(err) {
          if (err) throw err;
          console.log("Employee added successfully!");
          // re-prompt the user what they want to do next
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
        type: "list",
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
        type: "list",
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
        type: "list",
        message: "What is the Manager ID for the selected Employee?",
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
      console.log("answer: ", answer);
      console.log("empty space index: ", answer.eename.indexOf(" "));
      let eeName = answer.eename.substring(0, answer.eename.indexOf(" "));

      console.log("answer: ", answer);
      console.log("empty space index: ", answer.mgrid.indexOf(" "));
      let mgrId = answer.mgrid.substring(0, answer.mgrid.indexOf(" "));
      let manId = parseInt(mgrId);

      // let mgrName = answer.mgrname;

      // console.log("firstName: ", eeName);
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
          {              
              manager: answer.mgrname
              // manager_id: answer.mgrid
          },
          {
              first_name: eeName
                       
          },
          {
              manager_id: manId            
          }
        ],      
      function(err) {
        if (err) throw err;
        console.log("Manager Updated successfully!");
        // re-prompt the user for if they want to bid or post
        startPrompts();
        // connection.end();
    });

  });
}

 // This Function Removes an employee
function remEes() {
  // prompt for removing employees from the database
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee do you want to remove?",
        name: "name",
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
      }  
    ])
    .then(function(answer) {
      console.log("answer: ", answer);
      console.log("empty space index: ", answer.name.indexOf(" "));
      let firstName = answer.name.substring(0, answer.name.indexOf(" "));

      console.log("firstName: ", firstName);
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "DELETE FROM employee WHERE ?",
      {
          first_name: firstName

      // first_name: answer.name     
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
  // prompt for removing a Department from the database table
  inquirer
    .prompt([
      {
        type: "input",
        message: "What Department would you like to Delete?",
        name: "deptname",
        // choices: [
        //   "Engineer", 
        //   "Sales",
        //   "Finance",
        //   "Legal"          
        // ]
      }
    ])      
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "DELETE FROM department WHERE ?",
        {
          department: answer.deptname             
        },
        function(err) {
          if (err) throw err;
          console.log("Department added successfully!");
          // re-prompt the user what they want to do next
          // startPrompts();
        }
      );
    });
}
 

