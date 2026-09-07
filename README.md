# 🍔 Food Delivery Application

<p align="center">
  A full-stack food delivery web application for browsing food, managing carts,
  placing orders, and handling food orders through an admin panel.
</p>

<p align="center">
  <a href="https://github.com/ichadni/FOOD_DELIVERY">
    <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github" alt="GitHub">
  </a>
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-API-black?style=for-the-badge&logo=express" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/Vite-Build%20Tool-purple?style=for-the-badge&logo=vite" alt="Vite">
</p>

---

## 📌 Overview

**Food Delivery Application** is a full-stack web application developed to provide a convenient online food ordering experience.

Users can browse food items, select products, manage their shopping cart, proceed through checkout, confirm orders, and view their order history.

The application also includes an **Admin Panel** for adding food items and managing customer orders.

The project uses a **React + Vite frontend** and a separate **Node.js + Express backend**, with **MongoDB/Mongoose** used for database operations.

---

## ✨ Features

### 👤 User Features

- 🔐 User registration
- 🔑 User login
- 🏠 Home page
- 🍔 Browse food items
- 📂 Food categories
- 🛒 Add items to cart
- ➕ Increase/decrease quantity
- 🗑️ Remove items from cart
- 💰 View cart total
- 🧾 Checkout
- ✅ Confirm orders
- 📦 View previous orders

### 👨‍💼 Admin Features

- 🔐 Admin access
- 📊 Admin interface
- ➕ Add food items
- 🍔 Manage food data
- 📋 View customer orders
- ✅ Approve/process orders

### ⚙️ Backend Features

- REST API architecture
- User API routes
- Food data API routes
- Order API routes
- Admin API routes
- Order approval routes
- MongoDB integration
- Mongoose models
- Password hashing
- JWT-based authentication support
- Request validation
- Email/OTP-related backend dependencies

---

# 🖥️ Application Preview

> Screenshots from the application can be added here.

### 🏠 Home Page

![Home Page](screenshots/home.png)

### 🍔 Food Menu

![Food Menu](screenshots/food-menu.png)

### 🛒 Shopping Cart

![Shopping Cart](screenshots/cart.png)

### 🧾 Checkout

![Checkout](screenshots/checkout.png)

### 📦 My Orders

![My Orders](screenshots/my-orders.png)

### 👨‍💼 Admin Panel

![Admin Panel](screenshots/admin.png)

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      + Vite         │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │     + Mongoose      │
                    └─────────────────────┘
                               ▲
                               │
                    ┌──────────┴──────────┐
                    │     Admin Panel     │
                    │ Food & Order Mgmt.  │
                    └─────────────────────┘
