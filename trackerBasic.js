const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: process.env.PORT || 3306,
    user: "root",
    password: "rootroot",
    database: "employeeTracker_DB"
});

connection.connect(err => {
    if (err) throw err;
    start();
});

const start = () => {
    
}