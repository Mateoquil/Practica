# 🧾 Point of Sale (POS) Inventory System

Inventory and sales management system designed for small businesses.
This project focuses on handling products, sales transactions, and receipt generation through a REST API.

---

## 🚀 Features

- 📦 Product inventory management (CRUD)
- 🧾 Sales transactions
- 🏷️ Product categories / tags
- 📊 Sales history
- 🔐 JWT Authentication (in progress)
- 🖨️ Receipt generation (in progress)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MySQL
- **ORM:** Sequelize
- **Frontend:** Vanilla JavaScript (in progress)

---

## 🗂️ Database Structure

Main entities:

- **Products**
- **Sales**
- **Categories / Tags**
- **SalesProducts** (junction table for many-to-many relationship)

---

## 📡 API Overview

Example endpoints:

### Get product by name
`GET /api/products/:name`

### Create a new product
`POST /api/products`

### Create a sale
`POST /api/sales`

> Full API documentation coming soon.

---

## ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/Mateoquil/pos-inventory-system.git

# Install dependencies
npm install

# Configure database
# Update your MySQL credentials in config files

# Run the server
npm start
```

---

---

## 🚧 Project Status

This project is under active development.

- ✅ Backend REST API structure (controllers, models, routes, services)
- ✅ Product, sales, and category CRUD operations
- 🔄 Authentication (JWT) — in progress
- 🔄 Frontend — basic implementation, not fully functional yet
- 🔜 Role management (admin / cashier)
- 🔜 Receipt generation
- 🔜 Stock control automation
- 🔜 Reports and analytics
- 🔜 Improved UI/UX

Some parts of the codebase are still being translated from Spanish to English.

---

## 🤝 Collaboration

This project started as a collaborative effort and is now maintained individually.
