# TaskMaster ⚡

A full-stack task management application built with React, Node.js, Express, and MongoDB. Features custom JWT authentication, Google OAuth sign-in, and a clean modern UI.

---

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Axios, React Router, @react-oauth/google  
**Backend:** Node.js, Express 5, MongoDB, Mongoose, jsonwebtoken, bcryptjs, Nodemailer  

---





## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Paraga2003/TaskMaster
cd TaskMaster
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=8000
MONGO_URI=mongodb+srv://paraga250:Parag123@cluster0.kryvuls.mongodb.net

CLIENT_URL=http://localhost:5173
JWT_SECRET=030537ad1d95c81e23df1ff6ee70455a926e383263218db13873d795f93f92670989ba87a9eda8516b7ca9ad9cf046e89e2417555c4c55fd16955c7f03c02fe8
GOOGLE_REDIRECT_URI=http://localhost:8000/api/auth/google/callback
GOOGLE_CLIENT_ID=72579066974-cjr8eo8shlo7u0mkhgs394lsptv3k6rt.apps.googleusercontent.com
EMAIL_USER=paraga250@gmail.com
EMAIL_PASS=xfzx iqxy kmno ycie
```

> **Note:** `EMAIL_PASS` is a Gmail App Password, not your regular Gmail password.  
> Generate one at: Google Account → Security → 2-Step Verification → App Passwords

Start the backend server:

```bash
npm run start
```

The server will run at `http://localhost:8000`

---

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_BASEURL = http://localhost:8000/api
VITE_GOOGLE_CLIENT_ID=72579066974-cjr8eo8shlo7u0mkhgs394lsptv3k6rt.apps.googleusercontent.com
```

Start the frontend:

```bash
npm run dev
```

The app will run at `http://localhost:5173`

---

## Project Structure

```
├── client/                         # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskCard.jsx        # Individual task card with edit/delete/view
│   │   │   ├── TaskModal.jsx       # Create, update, and view-only modal
│   │   │   └── StatCard.jsx        # Clickable stat cards for filtering
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Global auth state (user, token, login, logout)
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx       # Main task management page
│   │   │   ├── Login.jsx           # Email/password + Google login
│   │   │   ├── Signup.jsx          # Email/password + Google signup
│   │   │   ├── ForgotPassword.jsx  # Request password reset email
│   │   │   └── ResetPassword.jsx   # Set new password via token link
│   │   ├── App.jsx                 # Routes and PrivateRoute guard
│   │   └── main.jsx                # App entry point with providers
│   └── .env
│
├── server/                         # Node.js backend
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js       # register, login, google, forgot/reset password
│   │   └── taskController.js       # CRUD operations for tasks
│   ├── middleware/
│   │   └── auth.js                 # JWT verification middleware (protect)
│   ├── models/
│   │   ├── User.js                 # User schema (email, password, googleId)
│   │   └── Task.js                 # Task schema linked to User
│   ├── routes/
│   │   ├── authRoutes.js           # /api/auth/* routes
│   │   └── taskRoutes.js           # /api/tasks/* routes
│   ├── server.js                   # Express app entry point
│   └── .env
```

---

## API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint           | Description                           | Auth Required |
|--------|--------------------|---------------------------------------|---------------|
| POST   | `/register`        | Create account with email & password  | No            |
| POST   | `/login`           | Login with email & password           | No            |
| POST   | `/google`          | Login or signup with Google token     | No            |
| POST   | `/forgot-password` | Send password reset email             | No            |
| POST   | `/reset-password`  | Reset password using token from email | No            |

### Task Routes — `/api/tasks`

| Method | Endpoint | Description            | Auth Required |
|--------|----------|------------------------|---------------|
| GET    | `/`      | Get all tasks for user | Yes           |
| POST   | `/`      | Create a new task      | Yes           |
| PUT    | `/:id`   | Update a task          | Yes           |
| DELETE | `/:id`   | Delete a task          | Yes           |

All task routes require a valid JWT in the `Authorization: Bearer <token>` header.

---

## Authentication Flow

### Email & Password
1. User registers → password is hashed with bcrypt and stored in MongoDB
2. User logs in → bcrypt compares passwords → JWT is issued
3. JWT is stored in localStorage via AuthContext
4. Every API request sends the token in the Authorization header
5. The `protect` middleware verifies the token on every protected route

### Google OAuth
1. User clicks "Continue with Google" → Google popup appears
2. User selects account → Google returns an ID token to the frontend
3. Frontend sends the token to `POST /api/auth/google`
4. Backend verifies the token using `google-auth-library`
5. User is found or created in MongoDB → our own JWT is issued

### Forgot Password
1. User submits email → a secure random token is generated and saved with a 1-hour expiry
2. A reset link is emailed via Nodemailer
3. User clicks the link → enters new password
4. Backend verifies token hasn't expired → password is re-hashed and saved

---


**MongoDB connection fails**  
Check your `MONGO_URI` in `.env` and ensure your current IP is whitelisted in MongoDB Atlas under **Network Access**.

**Reset email not sending**  
Make sure you are using a Gmail App Password (not your regular password) and that 2-Step Verification is enabled on your Gmail account.

---

 frontend    |
