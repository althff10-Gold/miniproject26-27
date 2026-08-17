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

### 1.3 Academic Sprint Schedule (Aug 14, 2026 – Sep 30, 2026 | 6:00 PM – 12:00 AM Daily)

| Sprint | Calendar Dates | Git Commit Window | Core Focus / Deliverables | Story Points |
|---|---|---|---|---|
| **Sprint 0** | Aug 14 – Aug 17, 2026 | Aug 14–17 (18:00–23:59) | Architecture, PostgreSQL schema (27 tables), Knex migrations, seeders, repository init | 13 SP |
| **Sprint 1** | Aug 18 – Aug 21, 2026 | Aug 18–21 (18:00–23:59) | Authentication, JWT tokens, RBAC, Landing page, Auth modals | 21 SP |
| **Sprint 2** | Aug 22 – Aug 25, 2026 | Aug 22–25 (18:00–23:59) | Guardian Module: linking workflow, approval system, child activity feed | 13 SP |
| **Sprint 3** | Aug 26 – Aug 29, 2026 | Aug 26–29 (18:00–23:59) | Student/Founder Module: Startup profiles, business ideation, team roles | 21 SP |
| **Sprint 4** | Aug 30 – Sep 02, 2026 | Aug 30–Sep 2 (18:00–23:59) | Mentor Verification & Assignment: credential upload, admin vetting, booking | 13 SP |
| **Sprint 5** | Sep 03 – Sep 06, 2026 | Sep 3–6 (18:00–23:59) | Learning Management System: Courses, video/text lessons, quizzes, progress | 21 SP |
| **Sprint 6** | Sep 07 – Sep 10, 2026 | Sep 7–10 (18:00–23:59) | Milestone & Progress Tracking: Roadmaps, deliverables, evidence uploads | 13 SP |
| **Sprint 7** | Sep 11 – Sep 14, 2026 | Sep 11–14 (18:00–23:59) | Supervised Messaging & Content Moderation: Real-time chat, keyword filtering | 21 SP |
| **Sprint 8** | Sep 15 – Sep 18, 2026 | Sep 15–18 (18:00–23:59) | Virtual Pitch Events: Competitions, video submissions, mentor scorecards | 13 SP |
| **Sprint 9** | Sep 19 – Sep 22, 2026 | Sep 19–22 (18:00–23:59) | Admin Dashboard & Analytics: System telemetry, moderation queue, audit log | 13 SP |
| **Sprint 10** | Sep 23 – Sep 26, 2026 | Sep 23–26 (18:00–23:59) | QA Automation, Jest/Pytest Suites, Security Hardening, COPPA Audit | 21 SP |
| **Sprint 11** | Sep 27 – Sep 30, 2026 | Sep 27–30 (18:00–23:59) | Deployment Integration, Docker packaging, User Documentation & Sign-off | 8 SP |
| **Total** | **48 Days** | **Aug 14–Sep 30, 2026** | **Complete Full-Stack Enterprise Incubator System** | **192 SP** |

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

## 4. Sprint 1 Planning (Sep 15–16, 2026) Preview
- **Sprint Goal**: Implement end-to-end Authentication & Authorization system, Role-Based Access Control (RBAC) middleware, student minor registration with parental consent link generation, and high-conversion landing page with auth modals.
- **Velocity Target**: 21 Story Points.
