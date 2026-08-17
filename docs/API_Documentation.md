# REST API Documentation
## TeenPreneur Hub: Backend Service Endpoints

**Base URL**: `http://localhost:5000/api/v1`  
**Authentication**: Bearer Token in `Authorization` Header (`Bearer <JWT_ACCESS_TOKEN>`)  
**Response Standard**: JSON `{ "success": true, "message": "...", "data": { ... } }`  

---

## 1. Authentication & Identity (`/auth`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Register new user (student, guardian, mentor) |
| `POST` | `/auth/login` | Public | Authenticate user, return JWT access & refresh tokens |
| `POST` | `/auth/refresh` | Public | Exchange refresh token for new access token |
| `POST` | `/auth/logout` | Authenticated | Invalidate session tokens |
| `GET`  | `/auth/me` | Authenticated | Retrieve profile of currently logged-in user |
| `POST` | `/auth/guardian-approval` | Public/Token | Guardian approves/rejects child's registration |

---

## 2. Student & Startup Domain (`/students`, `/startups`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET`  | `/students/profile` | Student | Get own student profile details |
| `PUT`  | `/students/profile` | Student | Update student profile & bio |
| `GET`  | `/startups` | Authenticated | List all active startups (with filters) |
| `POST` | `/startups` | Student | Create a new startup venture |
| `GET`  | `/startups/:id` | Authenticated | Get startup by ID with ideas & milestones |
| `PUT`  | `/startups/:id` | Student (Owner) | Update startup details |
| `POST` | `/startups/:id/ideas` | Student (Owner) | Add new business idea |
| `GET`  | `/startups/:id/ideas` | Authenticated | Get all business ideas for startup |
| `POST` | `/startups/:id/milestones` | Student (Owner) | Create a milestone |
| `PUT`  | `/milestones/:id/progress` | Student/Mentor | Update milestone status and evidence |

---

## 3. Guardian Domain (`/guardians`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET`  | `/guardians/children` | Guardian | List linked students and pending approvals |
| `GET`  | `/guardians/children/:id/activity` | Guardian | View audit stream and milestone progress |
| `GET`  | `/guardians/children/:id/conversations` | Guardian | View supervised read-only conversation logs |

---

## 4. Mentorship Domain (`/mentors`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/mentors/verification` | Mentor | Upload credentials for admin review |
| `GET`  | `/mentors/directory` | Authenticated | Browse verified mentors |
| `GET`  | `/mentors/assigned-startups` | Mentor | List assigned student startups |
| `POST` | `/mentors/feedback` | Mentor | Submit qualitative feedback on milestone/pitch |

---

## 5. Learning Management System (`/courses`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET`  | `/courses` | Authenticated | List available entrepreneurship courses |
| `GET`  | `/courses/:id` | Authenticated | Get course details with modules & lessons |
| `GET`  | `/lessons/:id` | Authenticated | View lesson content and associated quiz |
| `POST` | `/quizzes/:id/submit` | Student | Submit quiz answers and receive instant score |
| `GET`  | `/courses/:id/progress` | Student | View learning progress percentage |

---

## 6. Supervised Messaging (`/conversations`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET`  | `/conversations` | Authenticated | List user's active conversations |
| `POST` | `/conversations` | Authenticated | Initiate new conversation (subject to rules) |
| `GET`  | `/conversations/:id/messages`| Authenticated | Get message history |
| `POST` | `/conversations/:id/messages`| Authenticated | Send message (filtered by moderation engine) |

---

## 7. Pitch Events (`/pitch-events`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET`  | `/pitch-events` | Authenticated | List upcoming and past pitch events |
| `POST` | `/pitch-events/:id/submissions` | Student | Submit pitch entry (video, deck, summary) |
| `GET`  | `/pitch-events/:id/submissions` | Mentor/Admin | View entries for scoring |
| `POST` | `/pitch-submissions/:id/feedback` | Mentor | Submit rubric scorecard (1–10 categories) |

---

## 8. Administration & Safety (`/admin`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET`  | `/admin/stats` | Admin | Overall incubation metrics & user counts |
| `GET`  | `/admin/mentor-verifications` | Admin | List pending mentor applications |
| `PUT`  | `/admin/mentor-verifications/:id`| Admin | Approve or reject mentor verification |
| `GET`  | `/admin/moderation-queue` | Admin | List flagged messages requiring review |
| `POST` | `/admin/moderation-action` | Admin | Dismiss, warn, or ban offending user |
| `GET`  | `/admin/audit-logs` | Admin | Paginated system audit trails |
