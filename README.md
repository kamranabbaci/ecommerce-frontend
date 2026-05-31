# 🛒 Ecommerce Angular Frontend

A modern, responsive e-commerce web application built using Angular 21 and Bootstrap 5. The application provides a complete online shopping experience with product browsing, shopping cart management, secure checkout, customer order tracking, and an administrative dashboard for managing products, categories, and orders.

---

## 🚀 Features

### Customer Features

* Responsive modern UI
* Product catalog
* Product detail page
* Product search
* Product filtering by category
* Product pagination
* Shopping cart management
* Update item quantities
* Remove items from cart
* Checkout process
* Customer registration
* Customer login
* JWT authentication
* Order placement
* Order history
* Mobile-friendly design
* Toast notifications

### Admin Features

* Secure admin login
* Admin dashboard
* Product management

  * Add product
  * Update product
  * Delete product
* Category management

  * Add category
  * Update category
  * Delete category
* Order management

  * View all orders
  * View order details
  * Update order status
* Dashboard statistics

  * Total products
  * Total categories
  * Total orders
  * Revenue overview

---

## 🏗️ Technology Stack

### Frontend

* Angular 21
* TypeScript
* Bootstrap 5
* Bootstrap Icons
* RxJS
* Angular Router
* Angular Forms

### Authentication

* JWT Token Authentication
* Route Guards
* Role-Based Authorization

---

## 📂 Project Structure

src/

├── app/

│ ├── components/

│ │ ├── home/

│ │ ├── products/

│ │ ├── product-detail/

│ │ ├── cart/

│ │ ├── checkout/

│ │ ├── login/

│ │ ├── register/

│ │ ├── my-orders/

│ │ ├── admin-dashboard/

│ │ ├── admin-products/

│ │ ├── admin-categories/

│ │ └── admin-orders/

│

│ ├── services/

│ │ ├── auth.service.ts

│ │ ├── product.service.ts

│ │ ├── category.service.ts

│ │ ├── order.service.ts

│ │ ├── cart.service.ts

│ │ ├── toast.service.ts

│ │ └── confirm.service.ts

│

│ ├── guards/

│ │ ├── auth.guard.ts

│ │ └── admin.guard.ts

│

│ ├── shared/

│ │ ├── navbar/

│ │ ├── toast/

│ │ └── confirm-modal/

│

│ └── models/

---

## 🔐 Authentication Flow

### Customer

1. Register account
2. Login
3. JWT token stored locally
4. Access customer features
5. Place orders
6. Track order history

### Admin

1. Login with admin account
2. Access admin dashboard
3. Manage products
4. Manage categories
5. Manage orders

---

## 📦 Installation

### Install Dependencies

npm install

### Run Application

ng serve

Application will run on:

http://localhost:4200

---

## 🔧 Build Production Version

ng build

Build files will be generated in:

dist/

---

## 📱 Responsive Design

The application is fully responsive and supports:

* Mobile Phones
* Tablets
* Laptops
* Desktop Screens

---

## 🎨 UI Features

* Modern gradient theme
* Responsive navigation
* Toast notifications
* Confirmation modals
* Dashboard cards
* Product cards
* Modern checkout experience
* Professional admin panel

---


## 👨‍💻 Author

Kamran Abbasi
