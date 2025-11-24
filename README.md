# 📚 Library Management System (LMS)

A full-stack Library Management System built using a modern MERN-like architecture with secure role-based access, personalized dashboards, and a cloud-hosted MongoDB Atlas database.  
The frontend is deployed on **Vercel**, and the backend can be deployed on platforms like Render, Heroku, or a VPS.

---

## 💡 Overview

The **Library Management System (LMS)** is a scalable and user-friendly web application designed for both **Students** and **Administrators**. It simplifies library operations such as book management, borrowing, returning, and student account handling.

### 🎯 Purpose
To modernize traditional library operations with:
- Online catalog access  
- Digital book management  
- Borrow/return tracking  
- Admin–student role separation  

---

## ✨ Key Features

### 👩‍🎓 **Student Dashboard**
Students can:
- View and update their **personal profile**
- See a complete list of **borrowed books**, including:
  - Borrow Date  
  - Due Date  
  - Current Status (Borrowed / Returned / Overdue)
- Browse books by **category** and explore the library catalog

---

### 🧑‍💻 **Admin Dashboard**
Admins can manage the entire system through a dedicated panel:

#### 📚 Book Management
- Add new books  
- Edit/update book details  
- Manage book quantities  
- Track borrow and return records  

#### 👥 Student Management
- View registered students  
- Reset student passwords  
- Monitor user activities  

---

## ⚙️ Technologies Used

| Layer | Technology |
|-------|-------------|
| Frontend | React (JavaScript), HTML, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (cloud) |
| Authentication | JWT (JSON Web Token) |
| Deployment | Vercel (Frontend), Render/Heroku/VPS for Backend |

---

## 📁 Project Structure

Library-Management-System/
│
├── MM-library-frontend-main/ # React Frontend
├── MM-library-backend-main/ # Node.js Express Backend
└── README.md

## 🌐 Live Website Access

You can access the live application here:

👉 **https://mm-library-frontend-7c8c.vercel.app/**

## 🔐 Login Access (Example)
If your system requires seeded credentials, use the accounts created in your database.

Common example login format:
- **Admin:** `admin1` / `adminpassword123`
- **Student:** `ak1` / `Test@123`

