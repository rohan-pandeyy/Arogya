# Arogya Frontend – API Communication Documentation

This document explains how the frontend of the Arogya application interacts with the backend Express + PostgreSQL server, particularly during user registration.

---

## 📡 API Endpoint Summary

| Action           | HTTP Method | Endpoint                  | Description                          |
|------------------|-------------|---------------------------|--------------------------------------|
| Register User    | POST        | `http://localhost:80/users/register` | Registers a new user and returns token + user details |
| Login User       | POST        | `http://localhost:80/users/login`    | Authenticates user, sets auth cookie, returns user data |
| Get User Profile | GET         | `http://localhost:80/users/profile`  | Fetches user details (protected route) |
| Logout User      | GET         | `http://localhost:80/users/logout`   | Logs out the user and clears the token cookie |

---

## 📤 How Data Is Transmitted

The frontend form (in `SignUp.tsx`) gathers input data like:

- `name`
- `age`
- `gender`
- `email`
- `password`

It sends this data as a **JSON object** using a `POST` request via the Fetch API:

```ts
const res = await fetch("http://localhost:80/users/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
  credentials: "include"
});
```

---

## 🔒 Authentication

- The backend sets a JWT token via an **HTTP-only cookie** on successful registration/login.
- Future authenticated requests (`/profile`, `/logout`) must include this cookie.
- The frontend uses `credentials: "include"` in fetch to allow cookies.

---

## 🧠 Backend Configuration Summary

- Backend Port: `80` (from `.env`)
- Backend Entry: `server.js` (uses `app.js`)
- Routes mounted at:
  - `/users` → for all user-related endpoints
- Database: PostgreSQL (`arogya_db`)
- ORM: Sequelize

---

## 🛠️ Dev Setup

### Run Backend

```bash
# Run as admin/root if using port 80
npm run dev
```

Make sure `.env` has:
```
PORT=80
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/arogya_db
```

### Run Frontend

```bash
npm run dev
```

### Test Registration

1. Go to `http://localhost:3000`
2. Fill out the registration form
3. On success, response will be logged and shown below the form

---

## 📌 Notes

- The backend does **not support GET requests to `/users/register`**. It must be called with `POST`.
- You must **run your backend with admin privileges** if you're using port 80.

---

## ✅ Example Successful Response

```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "id": 4,
    "email": "test@example.com",
    "name": "Test User",
    "age": 25,
    "gender": "male",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---
