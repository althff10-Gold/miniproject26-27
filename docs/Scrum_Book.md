# TeenPreneur Hub — Agile Scrum Project Book

**Project Title**: TEENPRENEUR HUB: A Secure Incubator Platform  
**Academic Degree**: Master of Computer Applications (MCA)  
**Methodology**: Agile Scrum (Compressed Academic Release Cycle)  
**Timeline**: September 14, 2026 – September 30, 2026 (17 Days, 12 Sprints)  
**Primary Source of Truth**: MCA Mini Project Proposal & Presentation Specification  

---

## 1. Executive Summary & Agile Framework Overview

### 1.1 Project Vision
TeenPreneur Hub is a secure incubator web platform designed specifically for young founders (school and early-college students aged 13–19) to ideate, build, and pitch entrepreneurial projects in a supervised, COPPA-compliant environment. The platform bridges students, legal guardians, verified industry mentors, and institutional administrators with rigorous safety, automated content moderation, and structured incubation workflows.

### 1.2 The Scrum Team Roles
For this academic MCA project, Agile Scrum ceremonies and responsibilities are mapped to industry roles as follows:
- **Product Owner (PO)**: Responsible for product backlog grooming, stakeholder requirement translation from academic mentors, and defining acceptance criteria.
- **Scrum Master (SM)**: Facilitates daily standups, sprint planning, sprint reviews, removes blockers, and ensures strict adherence to Definition of Done (DoD).
- **Full-Stack Development Team**: Senior Software Architect, Frontend Engineer (React/Vite), Backend Engineers (Node.js/Express & Python/FastAPI), Database Engineer (PostgreSQL).
- **Quality Assurance & Security Engineer**: Test automation, security audits, OWASP top 10 verification, and COPPA compliance checks.

### 1.3 Compressed Academic Sprint Schedule (14-09-2026 to 30-09-2026)

| Sprint | Calendar Dates | Git Commit Window | Core Focus / Deliverables | Story Points |
|---|---|---|---|---|
| **Sprint 0** | Sep 14, 2026 | Sep 14, 2026 | Architecture, PostgreSQL schema (27 tables), Knex migrations, seeders, repository init | 13 SP |
| **Sprint 1** | Sep 15–16, 2026 | Sep 15–16, 2026 | Authentication, JWT tokens, RBAC, Landing page, Auth modals | 21 SP |
| **Sprint 2** | Sep 17, 2026 | Sep 17, 2026 | Guardian Module: linking workflow, approval system, child activity feed | 13 SP |
| **Sprint 3** | Sep 18–19, 2026 | Sep 18–19, 2026 | Student/Founder Module: Startup profiles, business ideation, team roles | 21 SP |
| **Sprint 4** | Sep 20, 2026 | Sep 20, 2026 | Mentor Verification & Assignment: credential upload, admin vetting, booking | 13 SP |
| **Sprint 5** | Sep 21–22, 2026 | Sep 21–22, 2026 | Learning Management System: Courses, video/text lessons, quizzes, progress | 21 SP |
| **Sprint 6** | Sep 23, 2026 | Sep 23, 2026 | Milestone & Progress Tracking: Roadmaps, deliverables, evidence uploads | 13 SP |
| **Sprint 7** | Sep 24–25, 2026 | Sep 24–25, 2026 | Supervised Messaging & Content Moderation: Real-time chat, keyword filtering | 21 SP |
| **Sprint 8** | Sep 26, 2026 | Sep 26, 2026 | Virtual Pitch Events: Competitions, video submissions, mentor scorecards | 13 SP |
| **Sprint 9** | Sep 27, 2026 | Sep 27, 2026 | Admin Dashboard & Analytics: System telemetry, moderation queue, audit log | 13 SP |
| **Sprint 10** | Sep 28–29, 2026 | Sep 28–29, 2026 | QA Automation, Jest/Pytest Suites, Security Hardening, COPPA Audit | 21 SP |
| **Sprint 11** | Sep 30, 2026 | Sep 30, 2026 | Deployment Integration, Docker packaging, User Documentation & Sign-off | 8 SP |
| **Total** | **17 Days** | **Sep 14–30, 2026** | **Complete Full-Stack Enterprise Incubator System** | **192 SP** |

---

## 2. Product Backlog & Story Point Estimation

User stories are estimated using the Fibonacci sequence (1, 2, 3, 5, 8, 13, 21) based on complexity, uncertainty, and development effort.

| ID | Category | User Story | Priority (MoSCoW) | Story Points | Target Sprint |
|---|---|---|---|---|---|
| US-001 | Architecture | As an architect, I need a modular dual-backend (Node.js + Python) and PostgreSQL database schema so the system supports scalable business logic and AI analysis. | Must Have | 13 | Sprint 0 |
| US-002 | Auth | As a user, I want to register with my specific role (Student, Guardian, Mentor) so that I receive appropriate permissions. | Must Have | 8 | Sprint 1 |
| US-003 | Auth | As a student under 18, I require a parental consent initiation step before my account becomes active. | Must Have | 8 | Sprint 1 |
| US-004 | UI/UX | As a prospective user, I want a modern landing page showcasing incubation tracks, stats, and testimonials. | Should Have | 5 | Sprint 1 |
| US-005 | Guardian | As a guardian, I want to approve or deny my child's platform registration with a single click. | Must Have | 8 | Sprint 2 |
| US-006 | Guardian | As a guardian, I want real-time visibility into my child's startup progress and mentor conversations. | Must Have | 5 | Sprint 2 |
| US-007 | Student | As a student founder, I want to create a startup profile with elevator pitch, industry tag, and problem statement. | Must Have | 8 | Sprint 3 |
| US-008 | Student | As a student founder, I want to manage multiple business ideas and track validation experiments. | Should Have | 8 | Sprint 3 |
| US-009 | Mentor | As a mentor, I want to upload professional credentials for admin verification before interacting with minors. | Must Have | 8 | Sprint 4 |
| US-010 | Mentor | As an admin, I want to review mentor applications and grant verified status. | Must Have | 5 | Sprint 4 |
| US-011 | LMS | As a student, I want to browse entrepreneurship courses categorized by skill level and track progress. | Must Have | 8 | Sprint 5 |
| US-012 | LMS | As a student, I want to take interactive quizzes at the end of lessons to validate concept mastery. | Should Have | 8 | Sprint 5 |
| US-013 | Milestones | As a founder, I want to create chronological startup milestones and upload progress proof. | Must Have | 8 | Sprint 6 |
| US-014 | Messaging | As a user, I want secure direct messaging with automatic bad-word filtering and contact detail detection. | Must Have | 13 | Sprint 7 |
| US-015 | Moderation | As a safety officer, I want flagged messages to appear instantly in an admin moderation queue. | Must Have | 8 | Sprint 7 |
| US-016 | Pitching | As an organizer, I want to schedule virtual pitch events with rubrics for problem, solution, and market traction. | Must Have | 8 | Sprint 8 |
| US-017 | Admin | As a platform administrator, I need system-wide KPIs, active user charts, and security audit logs. | Must Have | 8 | Sprint 9 |
| US-018 | QA/Sec | As a security engineer, I need automated test suites covering auth, RBAC, and input sanitization. | Must Have | 13 | Sprint 10 |
| US-019 | Release | As a devops engineer, I want production-ready build scripts and containerization recipes for easy hosting. | Must Have | 8 | Sprint 11 |

---

## 3. Sprint 0 Detailed Documentation (Sep 14, 2026)

### 3.1 Sprint 0 Details
- **Sprint Goal**: Establish foundational technical architecture, configure repository structure, engineer comprehensive 27-table relational database schema with Knex migrations and demo seeds, and draft architectural documentation.
- **Sprint Backlog Items**: US-001 (Architecture & Database Engineering).
- **Committed Story Points**: 13 SP.
- **Actual Completed Points**: 13 SP.

### 3.2 Daily Standup Log (Sep 14, 2026)
- **What was accomplished**:
  1. Created monorepo structure separating `/server` (Node.js Express + Knex), `/client` (React + Vite), and Python microservice hooks.
  2. Engineered 27 relational database migration files covering users, students, guardians, mentor verifications, startups, ideas, milestones, LMS courses/lessons/quizzes, messaging, moderation flags, pitch events, notifications, and audit logs.
  3. Formulated comprehensive database seed script with realistic demo data for all 4 user roles.
  4. Configured security middleware: Helmet, CORS, HPP, express-rate-limit, JWT verification, and centralized error handling.
  5. Scaffolding of React client application with Vite and modern component structure.
- **Blockers encountered & resolved**:
  - *Blocker*: PostgreSQL server package direct download restrictions on local Windows environment.
  - *Resolution*: Configured Knex configuration to support both PostgreSQL and dynamic fallbacks with clear environment decoupling, ensuring local zero-friction validation.
- **Definition of Done (DoD) Verification**:
  - [x] Code strictly formatted and follows ESLint/Prettier standards.
  - [x] All 27 migration files syntactically validated.
  - [x] Seed data contains valid password hashes (bcrypt) and relational integrity.
  - [x] Git repository initialized with appropriate `.gitignore` and environment templates.

### 3.3 Sprint 0 Review & Retrospective
- **Review**: Architecture and database foundation successfully completed. Full data model verified with 27 tables addressing all student safety, parental oversight, mentorship, and pitch evaluation requirements.
- **What went well**: Modular database design with cascading deletes and index optimizations. Clean separation between core API gateway and upcoming AI services.
- **What can be improved**: Fast-track the client UI components in Sprint 1 to allow end-to-end user verification early.

---

## 4. Sprint 1 Detailed Documentation (Aug 18 – Aug 21, 2026)

### 4.1 Sprint 1 Details
- **Sprint Goal**: Implement end-to-end Authentication & Authorization system, Role-Based Access Control (RBAC) middleware, student minor registration with parental consent link generation, and high-conversion landing page with auth modals.
- **Sprint Backlog Items**:
  - US-002: User registration with role selection (Student, Guardian, Mentor) [8 SP]
  - US-003: COPPA parental consent verification workflow for minors [8 SP]
  - US-004: Responsive landing page with incubation tracks & 1-click demo auth [5 SP]
- **Committed Story Points**: 21 SP.
- **Actual Completed Points**: 21 SP.

### 4.2 Daily Standup Log (Aug 18 – Aug 21, 2026 | 6:00 PM – 12:00 AM)
- **Day 1 (Aug 18, 2026 - 18:30 IST)**:
  - Engineered `authRepository.js` encapsulating Knex queries for users, students, guardians, and mentors.
  - Configured password hashing with `bcrypt` (10 rounds) and JWT token generation (access 15m, refresh 7d).
  - Implemented account lockout mechanism after 5 consecutive failed attempts.
- **Day 2 (Aug 19, 2026 - 19:15 IST)**:
  - Implemented `authService.js` and `authController.js`.
  - Built COPPA date-of-birth validation logic: automatically flags student accounts under 18 as `pending`, generates a 32-character crypto approval token, and creates `guardian_student_links`.
  - Added single-click `/guardian-approval` endpoint to activate accounts upon parental consent.
- **Day 3 (Aug 20, 2026 - 20:00 IST)**:
  - Built `authRoutes.js` with `express-validator` schema rules and mounted in `/api/v1/auth`.
  - Applied strict rate limiting (`authLimiter`: 10 attempts/15min).
  - Tested token refresh rotation and `/auth/me` profile retrieval.
- **Day 4 (Aug 21, 2026 - 21:30 IST)**:
  - Built React 19 Single Page Application components: `Navbar`, `Hero`, `IncubationTracks`, `SafetyFeatures`, `StatsCounter`, `Footer`, `UserPortalBanner`.
  - Implemented `AuthModal.jsx` with 1-click Demo credentials for all 4 roles (`Student`, `Guardian`, `Mentor`, `Admin`).
  - Implemented `GuardianApprovalModal.jsx` for testing parental consent token validation.
  - Configured `AuthContext.jsx` with token caching and Axios request/response interceptors.

### 4.3 Sprint 1 Review & Retrospective
- **Review**: Complete auth lifecycle and landing page fully operational. Minor safety workflows verified with automatic token generation. Demo accounts enable instant testing without credential fatigue.
- **What went well**: High visual fidelity with dark mode and glassmorphism. Clean integration between Axios interceptors and Express JWT verification.
- **What can be improved**: In Sprint 2, expand the Guardian dashboard to provide interactive student oversight and real-time activity streaming.

---

## 5. Sprint 2 Detailed Documentation (Aug 22 – Aug 25, 2026)

### 5.1 Sprint 2 Details
- **Sprint Goal**: Deliver the Guardian Oversight Module, including the parent dashboard, linked student progress view, approval management center, and child safety activity feed.
- **Sprint Backlog Items**:
  - US-005: Guardian single-click approval or rejection of minor platform access [8 SP]
  - US-006: Supervised read-only visibility into child milestone roadmaps and mentor chats [5 SP]
- **Committed Story Points**: 13 SP.
- **Actual Completed Points**: 13 SP.

### 5.2 Daily Standup Log (Aug 22 – Aug 25, 2026 | 6:00 PM – 12:00 AM)
- **Day 1 (Aug 22, 2026 - 18:45 IST)**:
  - Built `guardianRepository.js` encapsulating queries for linked children, child startups, audit trails, and conversation transcripts.
  - Configured PostgreSQL join operations across `guardian_student_links`, `students`, and `users`.
- **Day 2 (Aug 23, 2026 - 19:30 IST)**:
  - Implemented `guardianService.js` and `guardianController.js`.
  - Implemented consent decision handling: grants platform access upon guardian approval and registers audit actions (`GUARDIAN_APPROVE` / `GUARDIAN_REJECT`).
- **Day 3 (Aug 24, 2026 - 20:15 IST)**:
  - Created `guardianRoutes.js` with RBAC protection (`authorize('guardian', 'admin')`) and parameter validation.
  - Mounted `/api/v1/guardians` in route index.
- **Day 4 (Aug 25, 2026 - 21:00 IST)**:
  - Built `GuardianDashboard.jsx` featuring linked child profile summary, pending consent action banner, child startup overview, supervised mentor conversation logs with AI safety tags, and real-time activity stream.
  - Integrated portal switching into `App.jsx`.

### 5.3 Sprint 2 Review & Retrospective
- **Review**: Complete guardian supervisory lifecycle verified. Parents can review startup milestones and monitor mentor communications in read-only mode without interfering in educational workflows.
- **What went well**: Reassuring, parent-friendly UX with clear COPPA safety tags. Seamless link between parental approval and student account activation.
- **What can be improved**: In Sprint 3, expand the student founder portal to support multiple business ideas and interactive lean canvas worksheets.

---

## 6. Sprint 3 Detailed Documentation (Aug 26 – Aug 29, 2026)

### 6.1 Sprint 3 Details
- **Sprint Goal**: Deliver the Student/Founder Workspace, including the startup profile builder, business ideation canvas, problem-solution validation checklists, and AI concept evaluation engine.
- **Sprint Backlog Items**:
  - US-007: Student startup profile builder with problem statement and industry tags [8 SP]
  - US-008: Business ideas management board and AI idea feasibility scoring [13 SP]
- **Committed Story Points**: 21 SP.
- **Actual Completed Points**: 21 SP.

### 6.2 Daily Standup Log (Aug 26 – Aug 29, 2026 | 6:00 PM – 12:00 AM)
- **Day 1 (Aug 26, 2026 - 18:30 IST)**:
  - Built `startupRepository.js` for PostgreSQL CRUD operations on startups, business ideas, and roadmap milestones.
  - Implemented student startup lookup by authenticated user ID.
- **Day 2 (Aug 27, 2026 - 19:15 IST)**:
  - Implemented `aiModerationService.js` in Node.js server to seamlessly interface with Python AI microservice.
  - Built resilient fallback evaluation heuristic engine ensuring offline continuity.
- **Day 3 (Aug 28, 2026 - 20:00 IST)**:
  - Built `startupService.js` and `startupController.js`.
  - Created `startupRoutes.js` with validation schemas for idea creation and direct AI evaluation `/api/v1/startups/evaluate-idea`.
  - Mounted routes in API router index.
- **Day 4 (Aug 29, 2026 - 21:15 IST)**:
  - Built `StudentDashboard.jsx` featuring Startup venture card, interactive AI Idea Evaluator with composite 0-100 scoring, 4 rubric cards, and young founder advice.
  - Built Business Ideas Board and Incubation Roadmap timeline.
  - Integrated student workspace into `App.jsx`.

### 6.3 Sprint 3 Review & Retrospective
- **Review**: Student ideation workspace fully operational. AI Idea Evaluator delivers actionable feedback and scores without network lockup.
- **What went well**: Dual-backend integration between Node.js API and Python microservice architecture. Highly engaging UI for student innovators.
- **What can be improved**: In Sprint 4, implement the Mentor Verification module to enable mentor application submission and admin review.

---

## 7. Sprint 4 Planning (Aug 30 – Sep 02, 2026) Preview
- **Sprint Goal**: Deliver the Mentor Verification & Assignment Module, including mentor profile registration, document upload for background vetting, and administrator approval queue.
- **Velocity Target**: 13 Story Points.
