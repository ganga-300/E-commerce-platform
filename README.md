

## 🚀 Problem Statement

Students, especially at **Rishihood University**, often face challenges in acquiring urgent study accessories due to limited local availability. They usually have to travel to nearby cities or stores, wasting time and disrupting academics.

**StudyStuff solves this by offering an online platform where students can easily browse, order, and receive study materials on time—right on campus.**

---

## 🏗️ System Architecture

```
Frontend (Next.js)
     ↓
Backend API (Node.js + Express)
     ↓
Database (MySQL)
```

### **Tech Stack Overview:**

| Layer              | Technologies                                          |
| ------------------ | ----------------------------------------------------- |
| **Frontend**       | Next.js, TailwindCSS / Bootstrap                      |
| **Backend**        | Node.js, Express.js                                   |
| **Database**       | MySQL (Relational)                                    |
| **Authentication** | JWT + Bcrypt                                          |
| **Hosting**        | Vercel (Frontend), Render/Railway (Backend), MySQL DB |

---

## 🌟 Key Features

### 🔐 Authentication & Authorization

* User Signup/Login
* JWT-based authentication
* Role-based access (Buyer, Seller, Admin)

### 🛒 Product & User Management (CRUD)

* Create, Read, Update, Delete products
* Manage user profiles

### 🗂 Product Browsing Features

* Categories (e.g., stationery, lab supplies)
* Sorting (Price: Low→High, High→Low)
* Filtering by category
* Pagination for smoother browsing

### 🛍️ Cart Management

* Add to cart
* Update quantity
* Remove items
* Clear entire cart

### 📦 Orders

* Place orders
* Track order history
* Admin can update order status

### 🌐 Deployment

* Fully deployed frontend + backend
* Accessible API URLs

---

## 🛠️ Tech Stack

| Component          | Technology                       |
| ------------------ | -------------------------------- |
| **Frontend**       | Next.js, TailwindCSS / Bootstrap |
| **Backend**        | Node.js, Express.js              |
| **Database**       | MySQL                            |
| **Authentication** | JWT + Bcrypt                     |
| **Hosting**        | Vercel, Render, Netlify, Railway |

---

## 📡 API Overview

### **1. Product APIs**

| Method | Endpoint                         | Description               |
| ------ | -------------------------------- | ------------------------- |
| POST   | `/api/products`                  | Add a new product         |
| GET    | `/api/products`                  | Get all products          |
| GET    | `/api/products/:id`              | Get product details by ID |
| GET    | `/api/products/search?query=...` | Search products           |
| PUT    | `/api/products/:id`              | Update product            |
| DELETE | `/api/products/:id`              | Delete product            |

---

### **2. User (Auth) APIs**

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/user/register` | Register new user          |
| POST   | `/api/user/login`    | Login + generate JWT       |
| GET    | `/api/user/profile`  | Get logged-in user details |
| PUT    | `/api/user/profile`  | Update user profile        |
| POST   | `/api/user/logout`   | Logout user                |

---

### **3. Cart APIs**

| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| POST   | `/api/cart`            | Add item to cart      |
| GET    | `/api/cart`            | Get user’s cart items |
| PUT    | `/api/cart/:productId` | Update quantity       |
| DELETE | `/api/cart/:productId` | Remove item from cart |
| DELETE | `/api/cart/clear`      | Clear entire cart     |

---

### **4. Order APIs**

| Method | Endpoint                 | Description                       |
| ------ | ------------------------ | --------------------------------- |
| POST   | `/api/orders`            | Place new order                   |
| GET    | `/api/orders`            | Get all orders for logged-in user |
| GET    | `/api/orders/:id`        | Get order by ID                   |
| PUT    | `/api/orders/:id/status` | Update order status (Admin)       |
| DELETE | `/api/orders/:id`        | Cancel order                      |

---

## 📂 Project Structure (Example)

```
StudyStuff/
├── frontend/ (Next.js)
│   ├── pages/
│   ├── components/
│   ├── styles/
│   └── ...
│
├── backend/ (Node + Express)
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## 🔧 Installation & Setup

### **Clone the Repository**

```bash
git clone https://github.com/yourusername/study-stuff.git
```

### **Backend Setup**

```bash
cd backend
npm install
```

Create a `.env` file:

```
DATABASE_URL=your_mysql_url
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

### **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

---

## 🌍 Deployment

* **Frontend**: Vercel / Netlify
* **Backend**: Render / Railway
* **Database**: MySQL (Remote DB)

---

## 🤝 Contributing

Pull requests are welcome!
Feel free to open issues if you want to suggest new features.

---

## 📜 License

This project is licensed under the MIT License.

---
