const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employeeTracker_DB"
});

connection.connect(err => {
    if (err) throw err;
    start();
});

const start = () => {
    inquirer.prompt({
        name: "userOptions",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add Department", "Add a Role", "Add an Employee",
        "View Departments", "View Roles", "View Employees", "Update Employee Role", "EXIT"],
        default: 4
    })
    .then(answer => {
        if (answer.userOptions === "Add Department") {
            addDepartment();
        }
        else if (answer.userOptions === "Add a Role") {
            addRole();
        }
        else if (answer.userOptions === "Add an Employee") {
            addEmployee();
        }
        else if (answer.userOptions === "View Departments") {
            viewDepartments();
        }
        else if (answer.userOptions === "View Roles") {
            viewRoles();
        }
        else if (answer.userOptions === "View Employees") {
            viewEmployees();
        }
        else if (answer.userOptions === "Update Employee Role") {
            updateRole();
        } else {
            connection.end();
        }
    });
}

const addDepartment = () => {

}

const addRole = () => {

}

const addEmployee = () => {

}

const viewDepartments = () => {

}

const viewRoles = () => {

}

const viewEmployees = () => {

}

const updateRole = () => {
    
}