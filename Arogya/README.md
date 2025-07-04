# Arogya Frontend – API Communication Documentation

This document explains how the frontend of the Arogya application interacts with the backend Express + PostgreSQL server, particularly during user registration.

---

## 🌍 Base URL Handling
The application dynamically determines the API base URL depending on the runtime context:

- **Server-side (SSR, inside Docker):**
Uses `process.env.INTERNAL_API_URL` if set, otherwise defaults to `http://localhost:80`.

- **Client-side (browser):**
Uses `process.env.NEXT_PUBLIC_API_URL` if set, otherwise defaults to `http://localhost:5000`.



## 📡 API Endpoint Summary

| Action           | HTTP Method | Path                      | Description                          |
|------------------|-------------|---------------------------|--------------------------------------|
| Register User    | POST        | `/users/register`         | Registers a new user and returns token + user details |
| Login User       | POST        | `/users/login`            | Authenticates user, sets auth cookie, returns user data |
| Get User Profile | GET         | `/users/profile`          | Fetches user details (protected route using token cookie) |
| Logout User      | GET         | `/users/logout`           | Logs out the user and clears the token cookie |

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
import { getBaseUrl } from "@/lib/getBaseUrl";

const res = await fetch(`${getBaseUrl()}/users/register`, {
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