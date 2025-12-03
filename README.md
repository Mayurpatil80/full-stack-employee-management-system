Employee Management System 🚀

A full-stack Employee Management System built with Spring Boot (Backend) and Vanilla JavaScript (Frontend). This application demonstrates a clean 3-Layer Architecture, RESTful API implementation, database integration, and a modern, responsive user interface with CSS animations.

📋 Table of Contents

Features

Tech Stack

Architecture

Prerequisites

Installation & Setup

Database Setup

Backend Setup

Frontend Setup

API Endpoints

Screenshots

✨ Features

Frontend (Client-Side)

Single Page Application (SPA) Flow: Seamless navigation between Login, Dashboard, Add, and List views without page reloads.

Admin Authentication: Secure login interface connected to the backend database.

Modern UI: Clean, responsive design with CSS Grid and Flexbox.

Animations: Smooth slide-in/slide-out effects for page transitions and table row operations.

Search: Real-time search functionality to filter employees by name.

Backend (Server-Side)

RESTful API: Robust endpoints for CRUD operations (Create, Read, Update, Delete).

Search Logic: Advanced JPA custom queries to search across multiple fields.

3-Layer Architecture: Strict separation of concerns (Controller → Service → Repository).

DTO Pattern: Use of Data Transfer Objects to decouple the database entities from the API response.

Admin Validation: Database-backed logic for validating admin credentials.

🛠 Tech Stack

Backend:

Java 17

Spring Boot 3+

Spring Data JPA (Hibernate)

MySQL Database

Maven

Frontend:

HTML5

CSS3 (Custom Variables & Keyframes)

Vanilla JavaScript (ES6+ Fetch API)

🏗 Architecture

The backend follows the industry-standard Controller-Service-Repository pattern:

Controller Layer: Handles HTTP requests and responses.

Service Layer: Contains business logic and handles DTO conversion.

Repository Layer: Interacts directly with the Database using Spring Data JPA.

⚙️ Prerequisites

Before running this project, ensure you have the following installed:

Java Development Kit (JDK) 17+

Maven (or use the included mvnw wrapper)

An IDE (VS Code, IntelliJ IDEA, or Eclipse)

🚀 Installation & Setup

1. Database Setup

Open your MySQL Workbench or Command Line.

Create the database:

CREATE DATABASE ems;


The application will automatically create the tables (employees, admins) when the backend runs.

Important: Insert the default admin credentials manually (since there is no registration page):

INSERT INTO admins (username, password) VALUES ('admin', 'admin');


2. Backend Setup

Clone the repository:

git clone [https://github.com/your-username/employee-management-system.git](https://github.com/your-username/employee-management-system.git)


Navigate to the project folder.

Open src/main/resources/application.properties and update your MySQL credentials:

spring.datasource.username=root
spring.datasource.password=YOUR_REAL_PASSWORD


Run the application:

VS Code: Open EmployeeManagementSystemApplication.java and click "Run".

Terminal: mvn spring-boot:run

3. Frontend Setup

Navigate to the frontend folder (where index.html is located).

Open index.html in your browser.

Recommended: In VS Code, right-click index.html and select "Open with Live Server" to avoid CORS issues.

Default Login Credentials:

Username: admin

Password: admin

🔌 API Endpoints

Method

Endpoint

Description

GET

/api/employees

Fetch all employees

GET

/api/employees/{id}

Get specific employee by ID

GET

/api/employees/search?query=name

Search employees by First or Last name

POST

/api/employees

Create a new employee

PUT

/api/employees/{id}

Update an existing employee

DELETE

/api/employees/{id}

Delete an employee

POST

/api/admin/login

Validate admin credentials

📸 Screenshots

(Add screenshots of your project here)

Login Page

Dashboard

Add Employee Form

Employee List with Search

🤝 Contributing

Fork the repository.

Create a new branch (git checkout -b feature-branch).

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature-branch).

Open a Pull Request.
