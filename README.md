# Employee-Tracker

## Synopsis 
This app is designed to allow the user to view and track employees, departments, and roles. This app is an easy way to keep track of employees with their job title and salary. This also allows to add new departments, employees and roles to keep up to date with an ever growing and changing workforce.

## What I learned
While creating this app I was able to learn new tools which I will be able to incorporate into future applications. I learned how to reference 2 different mysql tables to grab information from them both. I learned how to setup a database with multiple tables and how to show those tables within node. I was able to update mysql tables based on user prompts using inquirer. I can now save user input into a database and call that new data as well as the existing data.

## Difficulties
The most difficult part of this app for me was to figure out how to reference 2 different tables into another separate table and that is something I will be working further with to understand and master. I had a tough time getting the add a role and add an employee function to work. The issue I had was in my database the department_id and role_id needed to be an integer, but the answer I had been generating was a string. Once I changed the setup of the question into a list input and then I was able to use map to get the info I needed and it was able to function.

## App Gif
![Gif of Application](/gifs/employeeAppDemo.gif)

Demo of Adding Employee and Role
![Gif of addDemo](/gifs/addDemo.gif)

Demo of Viewing Roles, Employees and Departments
![Gif of viewDemo](/gifs/viewDemo.gif)


