# Blog Platform (Full-Stack)

A secure, high-performance blog system built with a **React client**, an **auth-validating Express proxy**, and a **PostgreSQL backend API** that never receives JWTs or cookies directly.

---

##  Features
-  Create and read blog posts
-  Authentication handled by a dedicated **frontend proxy server**
-  JWT stored in **HttpOnly + SameSite=Strict cookies**
-  Backend isolated from auth tokens
-  Password hashing with `bcrypt`
-  SQL-injection safe via **parameterized queries**

---

##  Tech Stack
| Component | Technology |
|---|---|
| **Client UI** | React |
| **Auth Proxy** | Node.js, Express, Axios, JWT (jsonwebtoken), cookie-parser |
| **Backend API** | Node.js, Express, PostgreSQL (node-postgres), bcrypt |
| **Database** | PostgreSQL |

---

## 🏛️ Architecture
React (3000) → Frontend Proxy (4000, validates JWT from HttpOnly cookies) → Backend API (5000, no JWT/cookies exposed) → PostgreSQL
