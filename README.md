
# 📚 Study-Stuff

### *An E-Commerce Platform for Buying Stationery & Study Accessories*

---

📌 1. Overview

**Study-Stuff** is an e-commerce platform designed to help students at **Rishihood University** easily access stationery, lab materials, art supplies, and other essential study accessories **without leaving campus**.

Due to limited local stores, students often waste time traveling to nearby cities for basic supplies. Study-Stuff solves this by providing all study essentials in **one online platform**, ensuring convenience, accessibility, and timely availability.

---
🎯 2. Problem Statement

Students frequently face:

* Lack of on-campus stationery sources
* Time wasted traveling to outside markets
* Inconsistent availability of essential items
* Disruptions during study/exam schedules

**Solution → Study-Stuff**
A centralized online platform where students can browse, compare, and purchase all necessary study materials instantly.

---

 🏗️ 3. System Architecture

**Architecture Flow:**

```
Frontend → Backend (API Layer) → Database
```

**Tech Stack:**

| Layer        | Technology Used                              |
| ------------ | -------------------------------------------- |
| **Frontend** | React.js / Next.js, TailwindCSS or Bootstrap |
| **Backend**  | Node.js, Express.js                          |
| **Database** | MySQL (Relational DB)                        |
| **Auth**     | JWT Authentication + Bcrypt                  |
| **Hosting**  | Vercel, Netlify, Render, Railway             |

**Hosting Overview:**

| Component | Platform             |
| --------- | -------------------- |
| Frontend  | Netlify / Vercel     |
| Backend   | Render / Railway     |
| Database  | MySQL Cloud Instance |

---

⭐ 5. Key Features

### ✔ Authentication & Authorization

* User Signup / Login / Logout
* JWT-based protected routes
* Buyer profile access

### ✔ CRUD Operations

Manage all core entities:

* Products
* Users
* Cart
* Orders

### ✔ Frontend Routing

Pages include:

* Home
* Login / Register
* Dashboard
* Product Details
* Cart
* User Profile
* About

### ✔ Sorting

* Price (Low → High / High → Low)

### ✔ Filtering

Filter by attributes like:

* Category (Stationery, Art, Electronics, etc.)

### ✔ Pagination

* Efficient browsing
* Products divided into pages

### ✔ Hosting

Frontend + Backend deployed on cloud services.

---

## 🛠️ 6. Tech Stack Summary

| Layer              | Technologies                     |
| ------------------ | -------------------------------- |
| **Frontend**       | Next.js, TailwindCSS / Bootstrap |
| **Backend**        | Node.js, Express.js              |
| **Database**       | MySQL                            |
| **Authentication** | JWT + Bcrypt                     |
| **Hosting**        | Vercel, Render, Netlify, Railway |

---

## 🔌 7. API Overview

---

### **1. 🛒 Product APIs**

| Method     | Endpoint                      | Description       |
| ---------- | ----------------------------- | ----------------- |
| **POST**   | `/api/products`               | Add a new product |
| **GET**    | `/api/products`               | Get all products  |
| **GET**    | `/api/products/:id`           | Get product by ID |
| **GET**    | `/api/products/search?query=` | Search products   |
| **PUT**    | `/api/products/:id`           | Update product    |
| **DELETE** | `/api/products/:id`           | Delete product    |

---

### **2. 👤 User (Auth) APIs**

| Method   | Endpoint             | Description          |
| -------- | -------------------- | -------------------- |
| **POST** | `/api/user/register` | Register new user    |
| **POST** | `/api/user/login`    | Login & get JWT      |
| **GET**  | `/api/user/profile`  | Fetch logged-in user |
| **PUT**  | `/api/user/profile`  | Update profile       |
| **POST** | `/api/user/logout`   | Logout user          |

---

### **3. 🛍 Cart APIs**

| Method     | Endpoint               | Description           |
| ---------- | ---------------------- | --------------------- |
| **POST**   | `/api/cart`            | Add item to cart      |
| **GET**    | `/api/cart`            | Get user’s cart items |
| **PUT**    | `/api/cart/:productId` | Update quantity       |
| **DELETE** | `/api/cart/:productId` | Remove item           |
| **DELETE** | `/api/cart/clear`      | Empty the cart        |

---

### **4. 📦 Orders APIs**

| Method     | Endpoint                 | Description             |
| ---------- | ------------------------ | ----------------------- |
| **POST**   | `/api/orders`            | Place an order          |
| **GET**    | `/api/orders`            | Get user orders         |
| **GET**    | `/api/orders/:id`        | Order details           |
| **PUT**    | `/api/orders/:id/status` | Update status *(Admin)* |
| **DELETE** | `/api/orders/:id`        | Cancel order            |

---

## 📄 License

This project is for educational purposes and can be extended commercially with proper implementation.

---

## 🤝 Contributions

Feel free to open issues or submit PRs to improve the project.

---
