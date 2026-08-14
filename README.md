# TeenPreneur Hub 🚀

### A Secure Incubator Platform for Young Entrepreneurs

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v24-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://reactjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192.svg)](https://www.postgresql.org)

---

## 📋 Project Overview

**TeenPreneur Hub** is a secure digital startup incubation platform designed for school and early-college students who want to develop entrepreneurial ideas in a safe, supervised environment. The platform enables young founders to create startup profiles, learn entrepreneurship, collaborate with peers, connect with verified mentors, track progress, and participate in virtual pitch events.

**Academic Project**: MCA Mini Project 2026-2027  
**Student**: MUHAMMED ALTHAF O K (MES25MCA-2042)  
**Methodology**: Agile Scrum

---

## ✨ Features

### 👨‍🎓 Young Founders (Students)
- Registration with guardian linking
- Startup profile creation & business idea management
- Entrepreneurship courses, lessons & quizzes
- Milestone-based startup progress tracking
- Mentor connection & guidance
- Moderated messaging
- Virtual pitch event participation
- Personal dashboard with progress analytics

### 👨‍👩‍👧 Guardians
- Approve/reject student registrations
- Monitor student activity & learning progress
- View startup progress & mentor assignments
- Control/pause platform access

### 🧑‍🏫 Mentors
- Verified mentor profiles with qualification documents
- Review and guide assigned startup founders
- Provide structured feedback on milestones & pitches
- Participate in pitch events
- Moderated communication with students

### 🔐 Administrators
- User management & approval workflows
- Mentor verification system
- Content management (courses, resources, quizzes)
- Message moderation & flagged content review
- Pitch event creation & management
- Platform analytics & system monitoring

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, React Router 6, Axios, Recharts |
| **Backend** | Node.js v24, Express.js 4 |
| **Database** | PostgreSQL 16 |
| **ORM** | Knex.js 3 (Query Builder + Migrations) |
| **Auth** | JWT (jsonwebtoken) + bcrypt |
| **Real-time** | Socket.io |
| **Security** | Helmet, CORS, Rate Limiting, HPP, Input Validation |
| **Testing** | Jest, Supertest, React Testing Library |
| **API Docs** | Swagger / OpenAPI 3.0 |
| **Logging** | Winston |

---

## 🏗️ Architecture

```
┌─────────────────┐     HTTP/REST      ┌──────────────────┐      SQL       ┌──────────────┐
│   React SPA     │ ◄──────────────► │  Express.js API   │ ◄───────────► │ PostgreSQL   │
│   (Vite)        │    + WebSocket    │  (Layered Arch)   │               │ Database     │
└─────────────────┘                   └──────────────────┘               └──────────────┘

Backend Layers: Routes → Controllers → Services → Repositories → Database
```

---

## 📁 Project Structure

```
Teenpreneur-hub/
├── server/               # Express.js API
│   ├── src/
│   │   ├── config/       # Database, auth, logger, constants
│   │   ├── middleware/   # Auth, RBAC, validation, rate limiting
│   │   ├── routes/       # API route definitions
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic
│   │   ├── repositories/ # Data access layer
│   │   ├── validators/   # Input validation schemas
│   │   └── utils/        # Helpers, error classes
│   ├── database/
│   │   ├── migrations/   # 27 table migrations
│   │   └── seeds/        # Demo/seed data
│   └── tests/            # Jest test suites
├── client/               # React SPA
│   └── src/
│       ├── api/          # API service layer
│       ├── components/   # Reusable UI components
│       ├── contexts/     # React Context providers
│       ├── hooks/        # Custom hooks
│       ├── pages/        # Page components (by role)
│       └── styles/       # CSS design system
├── docs/                 # Agile/Scrum documentation
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ (v24 LTS recommended)
- PostgreSQL 16+
- npm 9+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/althff10-Gold/miniproject26-27.git
cd miniproject26-27
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

3. **Setup database**
```bash
# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE teenpreneur_hub;"

# Run migrations
cd server
npm install
npm run migrate

# Seed demo data
npm run seed
```

4. **Install & start backend**
```bash
cd server
npm install
npm run dev
```

5. **Install & start frontend**
```bash
cd client
npm install
npm run dev
```

6. **Access the application**
- Frontend: http://localhost:5173
- API: http://localhost:5000
- API Docs: http://localhost:5000/api-docs

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@teenpreneur.hub | Admin@123 |
| Guardian | guardian@demo.com | Guardian@123 |
| Student | student@demo.com | Student@123 |
| Mentor | mentor@demo.com | Mentor@123 |

---

## 🧪 Testing

```bash
# Run all server tests
cd server && npm test

# Run with coverage
cd server && npm run test:coverage

# Run client tests
cd client && npm test
```

---

## 📊 Agile/Scrum Process

This project follows **Agile Scrum methodology** with 12 sprints:

| Sprint | Focus Area |
|--------|-----------|
| Sprint 0 | Project Setup & Planning |
| Sprint 1 | Authentication & Role Management |
| Sprint 2 | Guardian Management |
| Sprint 3 | Student/Founder Management |
| Sprint 4 | Mentor Management & Verification |
| Sprint 5 | Learning Management |
| Sprint 6 | Milestones & Progress Tracking |
| Sprint 7 | Communication & Moderation |
| Sprint 8 | Pitch Event Management |
| Sprint 9 | Admin Dashboard & Analytics |
| Sprint 10 | Testing & Security Hardening |
| Sprint 11 | Final Integration & Documentation |

Full Scrum documentation available in `/docs/`.

---

## 📚 Documentation

See the [/docs](./docs/) directory for complete project documentation including:
- Product Vision & Requirements
- Product Backlog & User Stories
- Sprint Plans & Reviews
- Scrum Book
- Architecture & Database Design
- API Documentation
- Security Documentation
- Test Cases & Bug Reports
- Final Project Report

---

## 👤 Contributors

| Name | Role | Register No |
|------|------|-------------|
| MUHAMMED ALTHAF O K | Developer | MES25MCA-2042 |

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- MES College of Engineering, Kuttippuram
- Department of Computer Applications
- Project Guide: *To be filled by project team*
