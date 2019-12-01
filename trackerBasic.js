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
            "INSERT INTO departments SET ?",
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
    connection.query("SELECT * FROM departments", (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "newRole",
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
                name: "roleDeptId",
                type: "list",
                message: "Department?",
                choices: function(answer) {
                    return res.map(row => {
                        return { name: row.name, value:row.id, short: row.name };
                    });
                }
            }
        ]).then(answer => {
            connection.query(
                "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
                [answer.newRole, answer.roleSalary, answer.roleDeptId],
                    err => {
                    if (err) throw err;
                    console.log(`Successfully added ${answer.newRole} with a salary of ${answer.roleSalary}`);
                    start();
                }
            );
        });
    });
    }

const addEmployee = () => {
    connection.query("SELECT * FROM roles", (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employees FIRST name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employees LAST name?"
            },
            {
                name: "roleId",
                type: "list",
                message: "role?",
                choices: function() {
                    return res.map(role => {
                        return{ name: role.title, value: role.id, short: role.title}
                    });
                }
            }
        ]).then(answer => {
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleId
                },
                err => {
                    if (err) throw err;
                    console.log(`Successfully added ${answer.firstName} ${answer.lastName}`);
                    start();
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
    connection.query("SELECT * FROM departments", viewFunction);
}

const viewRoles = () => {
    connection.query("SELECT * FROM roles", viewFunction);
}

const viewEmployees = () => {
    connection.query("SELECT first_name, last_name, title FROM employees LEFT JOIN roles ON employees.role_id = roles.id;", viewFunction);
}

const updateRole = () => {
    connection.query("SELECT * FROM employees", (err, emp) => {
        if (err) throw err;
        connection.query("SELECT * FROM roles", (err, role) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: "employeeUpdate",
                    type: "list",
                    message: "Which employee?",
                    choices: () => {
                        return emp.map(employee => {
                            return{ name: `${employee.first_name} ${employee.last_name}`, value: employee.id, short: employee.last_name };
                        });
                    }
                },
                {
                    name: "newRole",
                    type: "list",
                    message: "What is their new role?",
                    choices: () => {
                        return role.map(updRole => {
                            return{ name: updRole.title, value: updRole.id, short: updRole.title };
                        });
                    }
                }
            ]).then(answer => {
                connection.query(
                    "UPDATE employees SET ? WHERE ?",
                    [
                        {
                            role_id: answer.newRole
                        },
                        {
                            id: answer.employeeUpdate
                        }
                    ],
                    err => {
                        if (err) throw err;
                        start();
                    }
                    );
            });
        });
    });
}