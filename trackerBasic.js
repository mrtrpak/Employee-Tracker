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
    inquirer.prompt ({
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
    inquirer.prompt([
        {
            name: "departmentAddInput",
            type: "input",
            message: "What department would you like to add?"
        }
    ]).then(answer => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.departmentAddInput
            },
            err => {
                if (err) throw err;
                console.log(`Successfully added ${answer.departmentAddInput} to Departments!`);
                start();
            }
        );
    });
}

const addRole = () => {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "roleAddInput",
                type: "input",
                message: "What is the role you want to add?"
            },
            {
                name: "roleSalary",
                type: "input",
                message: "What is the salary?",
                validate: value => {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "roleDepartmentId",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].name);
                    }
                    return choiceArray;
                }
            }
        ]).then(answer => {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.roleAddInput,
                    Salary: answer.roleSalary,
                    department_id: answer.roleDepartmentId
                },
                err => {
                    if (err) throw err;
                    console.log(`Successfully added ${roleAddInput} to Roles!`);
                    start();
                }
            );
        });
    });
    }

const addEmployee = () => {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "employeeFirstName",
                type: "input",
                message: "What is the employees FIRST name?"
            },
            {
                name: "employeeLastName",
                type: "input",
                message: "What is the employees LAST name?"
            },
            {
                name: "employeeRoleId",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].title);
                    }
                    return choiceArray;
                },
                message: "What is their role?"
            }
        ]).then(answer => {
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: answer.employeeFirstName,
                    last_name: answer.employeeLastName,
                    role_id: answer.employeeRoleId
                },
                err => {
                    if (err) throw err;
                    console.log(`Successfully added ${answer.employeeFirstName} ${answer.employeeLastName} to Employees`);
                }
            );
        });
    });
}

// convenience variable for view functions
const viewFunction = (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
}

const viewDepartments = () => {
    connection.query("SELECT * FROM department", viewFunction);
}

const viewRoles = () => {
    connection.query("SELECT * FROM role", viewFunction);
}

const viewEmployees = () => {
    connection.query("SELECT first_name, last_name, title FROM employees LEFT JOIN role ON employees.role_id = role.id;", viewFunction);
}

const updateRole = () => {
    connection.query("SELECT * FROM employees", (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "employeeUpdate",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(`Employee id: ${res[i].id}: ${res[i].first_name} ${res[i].last_name}`)
                    }
                    return choiceArray;
                }
            },
            {
                name: "newRole",
                type: "input",
                message: "What is their new role?"
            }
        ]).then(answer => {
            connection.query(
                "UPDATE employees SET ? WHERE ?",
                [
                    {
                        role_id: parseInt(answer.newRole)
                    },
                    {
                        id: answer.employeeUpdate
                    }
                ]
            );
        });
        start();
    });
}