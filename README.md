# Resume-Portfolio# 🚀 Resume Portfolio

> **A modern, full-stack Resume & Portfolio platform** built to showcase professional information, projects, skills, and career opportunities — with a secure admin dashboard and contact/message management.

[![.NET](https://img.shields.io/badge/.NET-10.0-512BD4?style=for-the-badge\&logo=dotnet\&logoColor=white)](https://dotnet.microsoft.com/)
[![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-Web%20API-512BD4?style=for-the-badge\&logo=dotnet\&logoColor=white)](https://dotnet.microsoft.com/apps/aspnet)
[![EF Core](https://img.shields.io/badge/Entity%20Framework%20Core-9.0-512BD4?style=for-the-badge)](https://learn.microsoft.com/ef/core/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0.46-4479A1?style=for-the-badge\&logo=mysql\&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)](https://www.docker.com/)
[![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge\&logo=render\&logoColor=black)](https://render.com/)
[![TiDB Cloud](https://img.shields.io/badge/TiDB%20Cloud-Database-FF3B30?style=for-the-badge)](https://www.pingcap.com/tidb-cloud/)

---

## 🌐 Live Application

### 🖥️ Frontend

**Resume Portfolio**

https://resume-portfolio-hazel-alpha.vercel.app/

**Admin Login URL**

https://resume-portfolio-hazel-alpha.vercel.app/auth/login


### ⚙️ Backend

The backend is deployed as a containerized ASP.NET Core Web API and connects to a cloud MySQL-compatible database.

---

# ✨ Features

## 👤 Portfolio

The portfolio provides a professional presentation of:

* 👨‍💻 Personal profile
* 📄 Resume information
* 🛠️ Technical skills
* 💼 Professional experience
* 🎓 Education
* 🚀 Projects
* 📞 Contact information

---

## 🔐 Authentication

The application contains authentication functionality for protected areas.

### Login

Users authenticate using:

* Email
* Password

Passwords are stored as **BCrypt hashes**, rather than plain text.

Example stored password format:

```text
$2a$11$.....................................................
```

### Role-Based Access

The application supports different roles.

| Role ID | Role  |
| ------: | ----- |
|     `1` | Admin |

The **Admin** role can access protected administrative functionality.

---

# 🛡️ Security

The backend uses several security practices:

* 🔒 BCrypt password hashing
* 🔑 JWT-based authentication
* 👮 Role-based authorization
* 🔐 Environment variables for production secrets
* 🔒 TLS/SSL connection to TiDB Cloud
* 🚫 Sensitive credentials should not be committed to source control

> **Important:** Never put production database passwords, JWT secrets, API keys, or other credentials directly inside `appsettings.json` or GitHub.

---

# 🏗️ Technology Stack

## Backend

| Technology                       | Purpose              |
| -------------------------------- | -------------------- |
| C#                               | Programming language |
| .NET 10                          | Runtime / framework  |
| ASP.NET Core Web API             | REST API             |
| Entity Framework Core            | ORM                  |
| Pomelo.EntityFrameworkCore.MySql | MySQL provider       |
| BCrypt.Net-Next                  | Password hashing     |
| JWT Bearer                       | Authentication       |
| Scalar                           | API documentation    |
| Docker                           | Containerization     |

## Database

| Technology                  | Purpose                    |
| --------------------------- | -------------------------- |
| MySQL 8.0                   | Local development database |
| TiDB Cloud                  | Production cloud database  |
| Entity Framework Migrations | Database schema management |

## Frontend

The frontend is deployed through **Vercel** and communicates with the ASP.NET Core backend through HTTP APIs.

---

# 📁 Project Structure

```text
RESUME_PORTAL/
│
├── BACKEND/
│   │
│   └── Resume-Portofile-app/
│       │
│       ├── Controllers/
│       │   ├── AuthController.cs
│       │   ├── MessagesController.cs
│       │   └── ...
│       │
│       ├── Data/
│       │   └── AppdbContext.cs
│       │
│       ├── Dto/
│       │   ├── AuthDto/
│       │   ├── MessageDto/
│       │   └── ...
│       │
│       ├── Models/
│       │   ├── User.cs
│       │   ├── UserRole.cs
│       │   ├── Message.cs
│       │   └── ...
│       │
│       ├── Services/
│       │   ├── IService/
│       │   └── Service/
│       │
│       ├── Migrations/
│       │
│       ├── Certificates/
│       │   └── ca.pem
│       │
│       ├── Program.cs
│       ├── appsettings.json
│       ├── Dockerfile
│       └── Resume-Portofile-app.csproj
│
└── FRONTEND/
    └── ...
```

---

# 🧩 Backend Architecture

The backend follows a layered architecture.

```text
                ┌─────────────────────┐
                │      Frontend       │
                │      Vercel         │
                └──────────┬──────────┘
                           │
                           │ HTTP / REST API
                           ▼
                ┌─────────────────────┐
                │     Controllers     │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │      Services       │
                │ Business Logic      │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │       DTOs          │
                │ Request / Response  │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │   Entity Framework  │
                │       Core          │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │     TiDB Cloud      │
                │  MySQL Compatible   │
                └─────────────────────┘
```

---

# 🗄️ Database Design

The production database is hosted on **TiDB Cloud**.

Main database:

```text
ResumeDB
```

Main tables include:

```text
Users
UserRoles
Messages
__EFMigrationsHistory
```

---

## 👥 Users

The `Users` table stores authentication information.

```text
Users
├── UserId
├── Email
├── Password
└── RoleId
```

Example:

```text
UserId:   1
Email:    user@example.com
Password: BCrypt hashed password
RoleId:   1
```

---

## 🛡️ UserRoles

The `UserRoles` table manages application roles.

```text
UserRoles
├── RoleId
└── RoleName
```

Example:

```text
1 → Admin
2 → User
```

---

## 💬 Messages

The `Messages` table stores contact messages submitted through the portfolio.

```text
Messages
├── MessageId
├── Subject
├── Message
├── CreatedAt
├── FullName
└── Email
```

Example:

```text
Subject:
Job Opportunity

Message:
I would like to discuss a software development opportunity with you.
```

---

# 📩 Contact Message API

The portfolio allows visitors to send messages.

A typical message contains:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "subject": "Job Opportunity",
  "message": "I would like to discuss a software development opportunity with you."
}
```

### Example Subjects

```text
Job Opportunity
Project Inquiry
Freelance Opportunity
Internship Opportunity
Collaboration
General Inquiry
```

### Example Messages

**Job Opportunity**

```text
We are currently looking for a .NET developer and would like to discuss an opportunity with you.
```

**Project Inquiry**

```text
I would like to discuss a web development project and learn more about your development services.
```

**Freelance Opportunity**

```text
We have a freelance development project and would like to know about your availability.
```

**Collaboration**

```text
I am interested in collaborating with you on a software development project.
```

---

# 🔑 Authentication Flow

The login flow works approximately like this:

```text
User
 │
 │ Email + Password
 ▼
Frontend
 │
 │ POST Login API
 ▼
Auth Controller
 │
 ▼
User Service
 │
 ▼
Database
 │
 │ Find user by email
 ▼
BCrypt Password Verification
 │
 ├── ❌ Invalid → Unauthorized
 │
 └── ✅ Valid
       │
       ▼
   Generate JWT
       │
       ▼
   Return Token
       │
       ▼
    Frontend
```

---

# 🔐 Password Handling

Passwords should **never** be stored directly.

Instead:

```text
Plain Password
      │
      ▼
   BCrypt
      │
      ▼
Password Hash
      │
      ▼
    Database
```

During login:

```text
Entered Password
       │
       ▼
BCrypt.Verify()
       │
   ┌───┴────┐
   │        │
  True    False
   │        │
   ▼        ▼
 Login    Reject
```

---

# 🌍 Production Environment

Production configuration is provided through environment variables.

Example:

```text
ConnectionStrings__DefaultConnection
```

The connection string should contain the TiDB Cloud connection information.

For security, credentials should **not** be hard-coded into the repository.

---



# 🐳 Docker

The backend is containerized using a multi-stage Docker build.

### Build stage

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY . .

RUN dotnet restore

RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false
```

### Runtime stage

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

COPY Certificates/ca.pem /app/Certificates/ca.pem

ENV ASPNETCORE_URLS=http://+:10000

EXPOSE 10000

ENTRYPOINT ["dotnet", "Resume-Portofile-app.dll"]
```

This produces a smaller runtime image because the SDK is only required during the build stage.

---

# ☁️ Deployment

The project uses the following deployment architecture:

```text
                 GitHub
                    │
                    ▼
              Backend Source
                    │
                    ▼
               Render
                    │
                    ▼
              Docker Build
                    │
                    ▼
          ASP.NET Core Container
                    │
                    ▼
               TiDB Cloud
```

Frontend:

```text
GitHub
   │
   ▼
Vercel
   │
   ▼
Portfolio UI
   │
   ▼
Backend API
```

---

# 🔄 Local Development

## 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Move into the backend:

```bash
cd BACKEND/Resume-Portofile-app
```

---

## 2. Restore dependencies

```bash
dotnet restore
```

---

## 3. Configure the database

For local development, configure your MySQL connection through configuration or environment variables.

Example:

```text
Server=localhost;
Port=3306;
Database=ResumeDB;
User=root;
Password=YOUR_PASSWORD;
```

Never commit your real password.

---

# 🗃️ Entity Framework Migrations

Create a migration:

```bash
dotnet ef migrations add InitialCreate
```

Apply migrations:

```bash
dotnet ef database update
```

View migrations:

```bash
dotnet ef migrations list
```

The migration history is stored in:

```text
__EFMigrationsHistory
```

---

# ▶️ Run the Backend

```bash
dotnet run
```

The API will start on the configured ASP.NET Core URL.

For Docker:

```bash
docker build -t resume-portfolio-api .
```

Run:

```bash
docker run -p 10000:10000 resume-portfolio-api
```

---

# 🧪 API Testing

The backend can be tested using:

* Scalar
* Browser
* Postman
* Thunder Client
* Frontend application

Typical API areas include:

```text
/auth
/messages
/users
/roles
```

---

# 📋 API Example

## Login

```http
POST /api/Auth/login
```

Request:

```json
{
  "email": "user@example.com",
  "password": "YourPassword"
}
```

Successful authentication returns the authentication result/token according to the API implementation.

---

## Send Message

```http
POST /api/Messages
```

Request:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "subject": "Job Opportunity",
  "message": "We would like to discuss a software development opportunity."
}
```

---

# 🧱 DTO Pattern

The project uses DTOs to control what data enters and leaves the API.

Instead of directly exposing database entities:

```text
Database Entity
      │
      ▼
     DTO
      │
      ▼
API Response
```

This helps with:

* 🔒 Security
* 📦 Data control
* 🧹 Clean API contracts
* ✅ Validation
* 🔄 Easier API changes

---

# ✅ Validation

Input validation should be applied to important request fields such as:

### Email

```text
Must be a valid email address.
```

### Password

```text
Must satisfy the application's password requirements.
```

### Full Name

```text
Should contain a valid name format.
```

### Message

```text
Should not be empty.
```

### Subject

```text
Should contain a meaningful subject.
```

Validation prevents invalid data from reaching the business logic and database.

---

# 📬 Message Examples

### Job Opportunity

**Subject**

```text
Job Opportunity
```

**Message**

```text
Hello,

I came across your portfolio and was impressed by your development experience. We currently have a software development opportunity that may be a good fit for your profile.

Please let me know if you would be interested in discussing the opportunity.

Regards,
Hiring Team
```

### Project Inquiry

**Subject**

```text
Project Inquiry
```

**Message**

```text
Hello,

I am interested in discussing a web application project with you. Please let me know your availability so we can discuss the project requirements.

Regards,
Client
```

### Collaboration

**Subject**

```text
Collaboration Opportunity
```

**Message**

```text
Hello,

I am interested in collaborating with you on a software development project. I would be happy to discuss the idea and possible implementation.

Regards,
Developer
```

---

# 🛠️ Development Tools

Recommended tools for development:

* Visual Studio
* Visual Studio Code
* .NET CLI
* Git
* GitHub
* Docker
* MySQL Workbench
* TiDB Cloud SQL Editor
* Postman / Thunder Client
* Scalar




Use environment variables for production secrets.

Example:

```text
ConnectionStrings__DefaultConnection
JWT__Key
```

---

# 📦 Important Project Files

| File / Folder         | Purpose                       |
| --------------------- | ----------------------------- |
| `Program.cs`          | Application configuration     |
| `appsettings.json`    | Application settings          |
| `Controllers/`        | API endpoints                 |
| `Services/`           | Business logic                |
| `Dto/`                | API request/response objects  |
| `Models/`             | Database entities             |
| `Data/`               | EF Core database context      |
| `Migrations/`         | Database schema migrations    |
| `Certificates/ca.pem` | TiDB Cloud CA certificate     |
| `Dockerfile`          | Container build configuration |





## Login Returns "Invalid email or password"

Check:

1. The application is connected to the correct database.
2. The `Users` table contains the user.
3. The email exactly matches.
4. The password was stored as a BCrypt hash.
5. `BCrypt.Verify()` is being used during login.
6. The frontend is sending the correct password.
7. The production API is pointing to the same database you are checking in TiDB Cloud.



# 🚀 Deployment Checklist

Before deploying a new version:

```text
☐ Build succeeds locally
☐ Database connection works
☐ EF migrations are up to date
☐ Login works
☐ BCrypt password verification works
☐ JWT authentication works
☐ Role authorization works
☐ Contact message submission works
☐ CA certificate exists
☐ Docker build succeeds
☐ Production environment variables are configured
☐ Secrets are not committed to GitHub
☐ Frontend points to the production API
```

---

# 📈 Future Improvements

Possible future enhancements include:

* 📧 Email notification when a new message arrives
* 📊 Admin dashboard analytics
* 🔄 Password reset
* 👤 User profile management
* 🖼️ Project image management
* 📁 Resume PDF download
* 🔔 Admin notifications
* 🔎 Message search and filtering
* 📄 Pagination
* 🧾 API documentation
* 🛡️ Refresh tokens
* 🚦 Rate limiting
* 📝 Audit logging
* 🌙 Dark/light theme
* 📱 Improved mobile responsiveness

---

# 🎯 Project Goal

The goal of this project is to create a professional portfolio platform that is more than a static resume.

It combines:

```text
Professional Portfolio
        +
REST API
        +
Authentication
        +
Role-Based Authorization
        +
Database
        +
Cloud Deployment
        +
Docker
```

The result is a complete full-stack application demonstrating practical software development and deployment skills.

---

# 👨‍💻 Developer

**Dhruvi Savaliya**

Full-Stack Developer | .NET Developer

Interested in:

```text
C#
.NET
ASP.NET Core
REST APIs
Entity Framework Core
MySQL
Cloud Databases
Docker
Full-Stack Development
Software Engineering
```

---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

## 📜 License

This project is intended for portfolio and educational purposes.

© 2026 Dhruvi Savaliya. All rights reserved.
