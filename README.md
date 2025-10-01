# Blog API

A RESTful API built with **Node.js, Express, and MongoDB** that provides authentication, authorization, user management, post management, and admin features.  
This project demonstrates how to build a scalable backend with **JWT authentication, role-based access control, and CRUD operations**.

---

## 🚀 Features

### 🔑 Authentication & Authorization
- Register a new user
- Login and receive a JWT token
- Protected routes with middleware
- Role-based access (Admin vs User)

### 👤 Users
- Create user account (Register)
- Get user profile
- Update profile (name, email, password, avatar)
- Delete account

### 📝 Posts
- Create Post (title, body, image, tags, category)
- Get All Posts (with pagination, sorting, search)
- Get Single Post (by ID or slug)
- Update Post (only by owner)
- Delete Post (only by owner or admin)

### 🛡️ Admin Features
- Get all users
- Ban or delete users
- Delete inappropriate posts
- Edit all posts
- View platform stats (total users, total posts, etc.)
- Create Admin account

---

## ⚙️ Tech Stack
- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB + Mongoose** – Database and ODM
- **JWT (JSON Web Token)** – Authentication
- **Bcrypt.js** – Password hashing
- **Multer / Cloudinary** (optional) – Image uploads

---

## 📂 Project Structure
blog_api/
│── controllers/ # Route logic
│── middleware/ # Auth & role-based access
│── models/ # Mongoose schemas
│── routes/ # API routes
│── utils/ # Helper functions
│── config/ # Database and JWT config
│── server.js # App entry point
│── package.json
│── README.md

## 🔧 Installation & Setup

1. **Clone repo**
   ```bash
   git clone https://github.com/uthmandantata/blog_api.git
   cd blog_api
Install dependencies

bash
Copy code
npm install
Create a .env file in the root with:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the server

bash
Copy code
npm run dev   # with nodemon
npm start     # production
📌 API Endpoints
🔑 Auth
Method	Endpoint	Description
POST	/api/auth/register	Register a user
POST	/api/auth/login	Login and get token

👤 Users
Method	Endpoint	Description
GET	/api/users/profile	Get user profile
PUT	/api/users/profile	Update profile
DELETE	/api/users/profile	Delete account

📝 Posts
Method	Endpoint	Description
POST	/api/posts	Create a post
GET	/api/posts	Get all posts
GET	/api/posts/:id	Get single post
PUT	/api/posts/:id	Update post (owner only)
DELETE	/api/posts/:id	Delete post (owner/admin only)

🛡️ Admin
Method	Endpoint	Description
GET	/api/admin/users	Get all users
PUT	/api/admin/ban/:id	Ban a user
DELETE	/api/admin/posts/:id	Delete a post
GET	/api/admin/stats	View stats

📖 Future Improvements
Email verification & password reset

Image uploads with Cloudinary

Like & comment system

Admin dashboard (frontend)

🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

📜 License
This project is licensed under the MIT License.

👨‍💻 Author
Built with ❤️ by Uthman Dantata

