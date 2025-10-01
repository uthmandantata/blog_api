# 📝 Blog API

A simple and scalable **Blog REST API** built with **Node.js, Express, and MongoDB**.  
It includes authentication, role-based authorization, user management, post management, and admin features.

---

## 🚀 Features

- User Authentication (Register/Login with JWT)
- Role-based Authorization (Admin & Author)
- CRUD operations for Posts
- User Profile (view, update, delete)
- Admin Controls: manage users, ban users, delete posts
- Middleware for protected routes
- MongoDB with Mongoose ORM

---

## 📂 Project Structure

```
blog_api/
│-- src/
│   │-- config/          # Database connection
│   │-- controllers/     # Route controllers (Auth, Users, Posts, Admin)
│   │-- middleware/      # Protect & isAdmin middlewares
│   │-- models/          # Mongoose models (User, Post)
│   │-- routes/          # Express routes (Auth, User, Post, Admin)
|   │-- utis/            # Token
│   │-- index.js        # App entry point
│-- package.json
│-- .env (ignored)
│-- README.md
```

---

## 🔧 Installation & Setup

1. **Clone repo**
   ```bash
   git clone https://github.com/uthmandantata/blog_api.git
   cd blog_api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root with:**
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the server**
   ```bash
   npm run dev   # with nodemon
   npm start     # production
   ```

---

## 📌 API Endpoints

### 🔑 Auth
| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| POST   | /api/auth/register | Register a user     |
| POST   | /api/auth/login    | Login and get token |

### 👤 Users
| Method | Endpoint            | Description        |
|--------|---------------------|--------------------|
| GET    | /api/users/profile  | Get user profile   |
| PUT    | /api/users/profile  | Update profile     |
| DELETE | /api/users/profile  | Delete account     |

### 📝 Posts
| Method | Endpoint        | Description                  |
|--------|----------------|------------------------------|
| POST   | /api/posts     | Create a post                |
| GET    | /api/posts     | Get all posts                |
| GET    | /api/posts/:id | Get single post              |
| PUT    | /api/posts/:id | Update post (owner only)     |
| DELETE | /api/posts/:id | Delete post (owner/admin only)|

### 🛡️ Admin
| Method | Endpoint                   | Description      |
|--------|----------------------------|------------------|
| GET    | /api/admin/users           | Get all users    |
| GET    | /api/admin/admin-dashboard | Admin Dashboard  |
| POST   | /api/admin/create-admin    | Create an Admin  |
| PUT    | /api/admin/ban/:id         | Ban a user       |
| DELETE | /api/admin/delete-user/:id | Delete a User    |


---

## 📖 Future Improvements
- Email verification & password reset  
- Image uploads with Cloudinary  
- Like & comment system  
- Admin dashboard (frontend)  

---

## 🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 👨‍💻 Author
Built with ❤️ by **Uthman Dantata**

---
