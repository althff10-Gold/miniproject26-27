# Software Requirements Specification (SRS)
## TeenPreneur Hub: A Secure Incubator Platform

**Document Standard**: IEEE Std 830-1998 Format  
**Version**: 1.0.0  
**Date**: September 14, 2026  
**Degree / Academic Level**: Master of Computer Applications (MCA) Mini Project  
**Author**: Muhammed Althaf O K  

---

## 1. Introduction

### 1.1 Purpose
This document specifies the software requirements for the **TeenPreneur Hub** platform. TeenPreneur Hub is a web-based incubator ecosystem designed for school and early-college students (aged 13–19) to ideate, prototype, receive mentorship, and pitch business concepts within a safe, supervised, and COPPA-compliant digital environment.

### 1.2 Scope of the System
TeenPreneur Hub provides:
1. **Four Specialized User Portals**:
   - **Student / Young Founder**: Idea logging, startup profile builder, milestone tracking, LMS entrepreneurship coursework, pitch competition entries, supervised direct messaging.
   - **Legal Guardian / Parent**: Account approval for minors, oversight dashboard with view-only visibility into chat history and mentorship interactions.
   - **Industry Mentor**: Application and verification portal, assigned mentee dashboard, milestone review, pitch scorecard evaluations.
   - **Platform Administrator**: System KPIs, mentor vetting queue, message moderation and safety violation flagging queue, user audit trails.
2. **Safety & Compliance Mechanisms**:
   - Mandatory guardian consent link activation for students under 18 years of age.
   - Real-time automated message filtering against inappropriate language, personal phone numbers, and social media handles.
   - Strict audit logging for critical administrative and safety operations.
3. **Dual-Backend Microservice Architecture**:
   - **Node.js / Express**: RESTful API gateway, JWT authentication, RBAC, business workflows, relational persistence via PostgreSQL.
   - **Python Service**: Text moderation NLP engine, pitch scoring heuristics, and intelligent mentor-student matching algorithms.

### 1.3 Definitions, Acronyms, and Abbreviations
- **COPPA**: Children's Online Privacy Protection Act.
- **RBAC**: Role-Based Access Control.
- **LMS**: Learning Management System.
- **JWT**: JSON Web Token.
- **ORM / Query Builder**: Object Relational Mapping / Knex.js.
- **REST**: Representational State Transfer.

---

## 2. Overall Description

### 2.1 Product Perspective
TeenPreneur Hub operates as a modern Single Page Application (SPA) built with React and Vite, interfacing with a Node.js Express API and PostgreSQL database, complemented by a Python microservice for AI-powered moderation and pitch analytics.

```
+--------------------------------------------------------------------+
|                         React SPA (Vite)                           |
|       (Student | Guardian | Mentor | Administrator Portals)         |
+---------------------------------+----------------------------------+
                                  | HTTP / JSON (JWT Auth)
                                  v
+---------------------------------+----------------------------------+
|                    Node.js / Express Core API                      |
| (Auth, RBAC, Moderation Filter, Incubation, Pitch, LMS, Knex ORM)  |
+-------------------+------------------------------+-----------------+
                    |                              | Internal RPC/HTTP
                    v                              v
+-------------------+-------------+   +------------+-----------------+
|      PostgreSQL Database        |   |    Python Moderation &       |
|    (27 Relational Tables)       |   |     Analytics Engine         |
+---------------------------------+   +------------------------------+
```

### 2.2 User Characteristics and Roles
1. **Student**: Young founders (grades 8–12 and early college). Requires simple, gamified, encouraging UI, and clear milestone progress bars.
2. **Guardian**: Parents or legal caretakers. Prioritizes safety, transparency, child privacy, and notification of milestone completions.
3. **Mentor**: Verified startup founders, university professors, and industry professionals. Requires streamlined feedback rubrics and scheduled communication windows.
4. **Administrator**: Educational institution or platform moderators. Requires rapid moderation queues and tamper-proof audit trails.

---

## 3. Specific Requirements

### 3.1 Functional Requirements

#### Module 1: Authentication & Authorization (AUTH)
- **FR-AUTH-01**: The system shall allow user registration with specified roles: Student, Guardian, Mentor.
- **FR-AUTH-02**: For student registrations with age < 18, the system shall require guardian email input and flag the account status as `pending` until guardian authorization.
- **FR-AUTH-03**: The system shall issue signed JWT access tokens (15-minute expiration) and refresh tokens (7-day expiration) with secure HTTP headers.
- **FR-AUTH-04**: The system shall enforce account lockout after 5 consecutive failed login attempts for 15 minutes.

#### Module 2: Guardian Oversight (GUARD)
- **FR-GUARD-01**: Guardians shall receive an email authorization token to approve or reject their linked student's registration.
- **FR-GUARD-02**: Guardians shall have read-only access to their child's messages, mentor assignments, and startup milestones.

#### Module 3: Young Founder & Startup Workspace (STUDENT)
- **FR-STUDENT-01**: Students shall create and edit startup profiles (name, pitch, problem, industry, stage).
- **FR-STUDENT-02**: Students shall manage business ideas with problem-solution validation checklists.
- **FR-STUDENT-03**: Students shall track milestones across predefined stages: Ideation, Validation, Prototype, Pitching.

#### Module 4: Mentor Management & Vetting (MENTOR)
- **FR-MENTOR-01**: Mentors must upload proof of identity and professional credentials upon registration.
- **FR-MENTOR-02**: Admins must approve mentor verification before mentors can view student profiles or engage in chats.
- **FR-MENTOR-03**: Mentors can submit structured feedback on student milestones and pitch submissions.

#### Module 5: Learning Management System (LMS)
- **FR-LMS-01**: The platform shall organize courses into lessons (video links, structured markdown content) and end-of-lesson quizzes.
- **FR-LMS-02**: Students shall receive instant grading upon quiz submission and progress badges upon course completion.

#### Module 6: Supervised Communication & Content Moderation (CHAT)
- **FR-CHAT-01**: All text messages between students and mentors shall pass through an automated keyword and pattern filter.
- **FR-CHAT-02**: Messages containing profanity, aggressive language, or unauthorized phone/social contact sharing shall be masked and flagged for admin review.
- **FR-CHAT-03**: Guardians shall be notified of any flagged infractions involving their linked minor.

#### Module 7: Virtual Pitch Events (PITCH)
- **FR-PITCH-01**: Admins can configure pitch events with start/end deadlines and evaluation criteria.
- **FR-PITCH-02**: Students can submit pitch deck URLs, video demonstration links, and executive summaries.
- **FR-PITCH-03**: Mentors can score submissions on Innovation, Feasibility, Market Potential, and Presentation Quality (1–10 scale).

---

## 4. Non-Functional Requirements

### 4.1 Security & Child Protection (COPPA)
- All passwords must be hashed using `bcrypt` with a minimum salt round of 10.
- CORS policy must strictly whitelist designated client origins.
- Rate limiting must restrict authentication routes to 10 requests per 15 minutes and general routes to 100 requests per 15 minutes.
- HTTP security headers must be enforced using Helmet.

### 4.2 Performance
- API response times for standard read operations shall not exceed 200ms under standard loads.
- Client Single Page Application initial bundle load shall occur within 1.5 seconds on modern 4G connections.

### 4.3 Maintainability & Code Quality
- Clean code architecture: strict separation of routes, controllers, services, repositories, and middleware.
- Full test coverage for core business rules and authentication handlers.
