# 🧾 Point of Sale (POS) Inventory System

Inventory and sales management system designed for small businesses.
This project focuses on handling products, sales transactions, and authentication through a REST API, integrated with a companion authentication service ([pos-auth-module](https://github.com/Mateoquil/pos-auth-module)).

---

## 🚀 Features

- 📦 Product inventory management (CRUD)
- 🏷️ Product categories / tags
- 🔐 JWT Authentication (via pos-auth-module) with role-based access control
- 🛒 Shopping cart with quantity management
- 👤 User login and account page (frontend)
- 🧾 Sales transactions (in progress)
- 🖨️ Receipt generation (in progress)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MySQL
- **ORM:** Sequelize
- **Authentication:** JWT, verified against [pos-auth-module](https://github.com/Mateoquil/pos-auth-module)
- **Frontend:** Vanilla JavaScript, Bootstrap

---

## 🗂️ Database Structure

Main entities:

- **Product**
- **Tag**
- **ProductTag** (junction table for many-to-many relationship)
- **SaleTicket** / **SaleTicketProducts**

---

## 📡 API Overview

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/api/products` | Get all products | No |
| GET | `/api/product/:name` | Get a product by name | No |
| POST | `/api/create-product` | Create a new product | Yes |
| POST | `/api/create-tag` | Create a new tag | Yes |

> Protected routes require a valid JWT issued by `pos-auth-module`.

---

## ⚙️ Installation

This project requires [pos-auth-module](https://github.com/Mateoquil/pos-auth-module) running alongside it for authentication.

```bash
# Clone repository
git clone https://github.com/Mateoquil/pos-inventory-system.git
cd pos-inventory-system/backend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file with your MySQL credentials and a JWT_SECRET
# (must match the JWT_SECRET used in pos-auth-module)

# Run the server
npm run dev
```

---

## 🚧 Project Status

- ✅ Backend REST API (controllers, models, routes, services)
- ✅ Product and tag CRUD operations
- ✅ JWT authentication integrated with pos-auth-module
- ✅ Role-based route protection
- ✅ Frontend: store catalog, cart, login, account page
- 🔜 Sales transactions and receipts
- 🔜 Stock control automation
- 🔜 Admin panel

---

## 🤝 Collaboration

This project started as a collaborative effort and is now maintained individually.
