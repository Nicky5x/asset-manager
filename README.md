Asset Manager - Full Stack
A comprehensive asset tracking and assignment system built with a React frontend, and a Node.js/Express backend. This project manages the lifecycle of company equipment, from procurement to employee assignment.
Tech Stack
-----------
Frontend: React, HTML5, CSS3

Backend: Node.js, Express.js

Database: PostgreSQL

ORM: Sequelize

Version Control: Git & GitHub
-------------------------------
Database Schema
---------------
The project utilizes a relation PostgrSQL database managed via sequelize. The core logic revolves around four primary tables currently.
Assets: Stores equipment details (Laptops, Monitors, etc.).

Employees: Profiles of staff members eligible for assignments.

Departments: Organizational units used to categorize employees.

Assignments: The join table that tracks which Asset is currently assigned to which Employee.
-----------------------------------------------------------------------------------------
Future Enhancements
-------------------
Add Check in Check Out functionality on web page.
Implement user authentication.
add business to database schema to allow for scalability
-------------------------------------------------------
