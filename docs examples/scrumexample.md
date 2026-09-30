# TEENPRENEUR HUB: A SECURE INCUBATOR PLATFORM
## MCA Mini Project Presentation & Agile Scrum Documentation
**Standard**: Master of Computer Applications (MCA) Mini Project Presentation Format  
**Timeline**: 14/08/2026 to 30/09/2026 (48 Calendar Days)  
**Author**: Muhammed Althaf O K  
**Department**: Department of Computer Applications, MES College of Engineering, Kuttippuram  

---

## TABLE OF CONTENTS
1. Introduction
2. Objective
3. Existing System
4. Proposed System
5. Motivation
6. Functionalities
7. Module Description
8. Developing Environment
9. Sprint Backlog
10. Product Backlog
11. User Story
12. Project Plans
13. Data Flow Diagrams (Level 0 – Level 4)
14. ER Diagram

---

## 1. INTRODUCTION
- **TeenPreneur Hub** implements a secure, COPPA-compliant digital incubator ecosystem for student founders aged 13–19 to ideate, prototype, and pitch entrepreneurial ventures.
- Designed to protect minors from digital exploitation, unauthorized contact, privacy leakage, and predatory online risks.
- Features dual-backend architecture: Express.js REST API with offline transactional persistence and a standalone Python AI microservice for viability scoring and content moderation.

---

## 2. OBJECTIVES
- To eliminate safety and privacy vulnerabilities in conventional unmonitored startup portals for minor students.
- To provide a role-based access system with distinct, protected functionalities for Student, Guardian, Mentor, and Admin.
- To streamline entrepreneurship education through structured milestone roadmaps, LMS curriculum tracks, and virtual pitch demo days.
- To enable secure, AI-supervised communication between minors and vetted industry mentors with automated PII interception.
- To maintain immutable audit logs and complete platform telemetry for institutional transparency and COPPA/GDPR-K compliance.

---

## 3. EXISTING SYSTEM
- Relies on generic adult-oriented incubators (e.g., AngelList, LinkedIn) with zero protections for minors.
- Lacks parental consent verification, exposing youth to unsupervised communications.
- No automated filtering for Personally Identifiable Information (phone numbers, physical addresses, emails).
- Provides no structured curriculum or milestone escrow to guide young founders step-by-step.
- High risk of mentor impersonation and lack of background vetting for individuals interacting with school students.

---

## 4. PROPOSED SYSTEM
- Employs cryptographic parental consent verification gates before activating accounts for users under 18.
- Provides a dedicated 4-role portal: Student Founder, Legal Guardian, Verified Mentor, and Platform Administrator.
- Integrates Python AI microservice for instant idea viability assessment (Feasibility, Market Need, Innovation).
- Provides real-time messaging with live AI content moderation that intercepts and flags inappropriate text or PII.
- Offers interactive LMS Academy with lesson quizzes and virtual Demo Day competitions with 3-part judge rubrics.

---

## 5. MOTIVATIONS
- Rapid surge of teenage tech innovators without access to safe, institutional incubation channels.
- Strict global privacy regulations (COPPA, GDPR-K, India DPDP Act) requiring verified parental consent.
- Need for objective, encouraging AI feedback on young business concepts to prevent early demotivation.
- Demand by parents and schools for transparent oversight over students' digital mentorship engagements.
- Enhancing youth entrepreneurship education through gamified milestones, instant quiz grading, and pitch competitions.

---

## 6. FUNCTIONALITIES

### Role-Based Portals:
- **Admin**: System telemetry, mentor credential vetting, flagged message moderation queue, audit log inspection.
- **Guardian**: Link child accounts, approve/deny platform consent, read-only oversight of startups, milestones, and chats.
- **Mentor**: Submit verification credentials, inspect assigned startups, review and approve milestone proofs, evaluate demo day pitches, provide guidance.
- **Student**: Build startup profiles, evaluate ideas with AI scorer, complete LMS tracks/quizzes, upload milestone evidence, submit pitch decks, chat safely.

### Core Security & Platform Engines:
- **Authentication**: JWT access/refresh token rotation, bcrypt password hashing, DOB age gating.
- **AI Content Moderation**: Regex and NLP lexicon scanning intercepting profanity, harassment, and PII leaks.
- **Milestone & Pitch Engine**: Ordered deliverable tracking with evidence attachments and mentor scorecard grading.

---

## 7. MODULE DESCRIPTION

### Admin Module:
- Login & Session Authentication
- Manage Users (Students, Guardians, Mentors)
- Review Mentor Credential Applications & Grant Verified Status
- View Platform Telemetry (Active Users, Ventures, Compliance Rate)
- Flagged Content Moderation Queue & Action Workbench
- Immutable Audit Trail Viewer

### Guardian Module:
- Login & Child Account Linking
- Single-Click Parental Consent Approval / Revocation
- View Child Enrolled Startups & Incubation Roadmaps
- View Supervised Mentor Conversation Transcripts with Safety Badges
- Activity Stream & Compliance Status

### Mentor Module:
- Login & Profile Management
- Upload Verification Documents (Degrees, Identity Proof, LinkedIn)
- View Assigned Student Startups & Founder Bios
- Review Milestone Evidence Submissions (Approve / Request Changes)
- Virtual Pitch Demo Day Judging & Criteria Rubric Grading
- Supervised Direct Messaging with Mentees

### Student Module:
- Secure Registration with DOB Calculation & Parental Email Link
- Startup Profile Builder (Elevator Pitch, Industry Category, Problem Statement)
- Interactive AI Idea Evaluator (Composite Viability Score & Recommendations)
- LMS Academy (Curriculum Tracks, Lesson Reader, Interactive Quizzes)
- Milestone Deliverable Uploads & Stage Progression Meter
- Virtual Demo Day Pitch Submission (Video Pitch, Slide Deck, Financial Ask)
- Supervised Chat with Vetted Mentors

---

## 8. DEVELOPING ENVIRONMENT
- **Operating System**: Windows 11
- **Front End**: HTML5, CSS3, JavaScript (ES6+), React 19, Vite
- **Back End**: Node.js, Express.js, Python 3.12 (Standard Library HTTP Engine)
- **Database**: PostgreSQL / Resilient Transactional Local JSON Store (`local-db.json`)
- **IDE / Code Editor**: Visual Studio Code (VS Code) / Antigravity IDE
- **Web Server / Runtime**: Node.js v20+, Vite Dev Server, Python HTTP Daemon

---

## 9. SPRINT BACKLOG

| Backlog Item | Status And Completion Date | Original Estimation in Hours | Day 1 hrs | Day 2 hrs | Day 3 hrs | Day 4 hrs | Day 5 hrs | Day 6 hrs | Day 7 hrs | Day 8 hrs | Day 9 hrs | Day 10 hrs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **SPRINT 1 (14/08/2026 – 25/08/2026)** | | | | | | | | | | | | |
| Database 27-table schema designing | 16/08/2026 | 5 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 |
| Multi-role Auth & JWT token coding | 19/08/2026 | 6 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| COPPA minor consent & guardian approval | 22/08/2026 | 6 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| Guardian dashboard & child oversight | 25/08/2026 | 5 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 |
| **SPRINT 2 (26/08/2026 – 06/09/2026)** | | | | | | | | | | | | |
| Student startup profile & ideation board | 28/08/2026 | 6 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| AI Idea Evaluator Python microservice | 31/08/2026 | 7 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 |
| Mentor credential upload & admin review | 03/09/2026 | 6 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| LMS courses, lessons & interactive quiz | 06/09/2026 | 7 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 |
| **SPRINT 3 (07/09/2026 – 18/09/2026)** | | | | | | | | | | | | |
| Milestone roadmap & evidence submission | 10/09/2026 | 6 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| Supervised messaging & WebSocket server | 13/09/2026 | 6 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| AI Content moderation & PII interception | 15/09/2026 | 6 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| Virtual Pitch event & video showcase | 18/09/2026 | 6 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| **SPRINT 4 (19/09/2026 – 30/09/2026)** | | | | | | | | | | | | |
| Admin telemetry & user governance | 22/09/2026 | 6 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| Security audit logs & incident queue | 25/09/2026 | 6 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| Automated unit testing & COPPA audit | 28/09/2026 | 6 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| Production build, Docker & final release | 30/09/2026 | 6 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| **TOTAL** | **48 Days** | **96** | **16** | **16** | **16** | **16** | **16** | **12** | **4** | **0** | **0** | **0** |

---

## 10. PRODUCT BACKLOG

| ID | NAME | PRIORITY <high/medium/low> | ESTIMATE (Hours) | STATUS <Planned/In progress/Completed> |
|---|---|---|---|---|
| 1 | ADMIN LOGIN AND MANAGEMENT | High | 3 | COMPLETED |
| 2 | STUDENT REGISTRATION AND COPPA CONSENT | High | 4 | COMPLETED |
| 3 | GUARDIAN APPROVAL AND CHILD OVERSIGHT | High | 4 | COMPLETED |
| 4 | STARTUP PROFILE AND VENTURE SHOWCASE | High | 4 | COMPLETED |
| 5 | AI IDEA FEASIBILITY AND VIABILITY SCORER | High | 5 | COMPLETED |
| 6 | MENTOR APPLICATION AND CREDENTIAL VETTING | Medium | 3 | COMPLETED |
| 7 | MENTOR STARTUP ASSIGNMENT AND REVIEW | Medium | 3 | COMPLETED |
| 8 | LMS CURRICULUM TRACKS AND LESSON VIEWER | High | 4 | COMPLETED |
| 9 | LMS INTERACTIVE QUIZ AND AUTOMATED GRADING | Medium | 3 | COMPLETED |
| 10 | MILESTONE CREATION AND ROADMAP ESCROW | High | 4 | COMPLETED |
| 11 | MILESTONE EVIDENCE SUBMISSION AND VERIFICATION | Medium | 3 | COMPLETED |
| 12 | SUPERVISED REAL-TIME MESSAGING | High | 4 | COMPLETED |
| 13 | AI CONTENT MODERATION AND PII INTERCEPTION | High | 4 | COMPLETED |
| 14 | VIRTUAL PITCH EVENT AND VIDEO SUBMISSION | Medium | 4 | COMPLETED |
| 15 | DEMO DAY JUDGE RUBRIC AND SCORECARDS | Medium | 3 | COMPLETED |
| 16 | ADMIN TELEMETRY DASHBOARD AND AUDIT LOGS | High | 4 | COMPLETED |

---

## 11. USER STORY

| User Story ID | As a type of User | I want to <Perform some task> | So that i can <Achieve Some Goal> |
|---|---|---|---|
| 1 | ADMIN | Login to administrative console | securely govern the platform and manage authorized users |
| 2 | ADMIN | Review mentor credentials and background proofs | approve verified industry professionals to mentor minors |
| 3 | ADMIN | Inspect real-time platform telemetry and audit logs | guarantee COPPA compliance, system uptime, and safety |
| 4 | STUDENT | Register with date of birth and parent email | initiate COPPA verification and obtain platform membership |
| 5 | STUDENT | Create startup profile and elevator pitch | document business problem, target audience, and solution |
| 6 | STUDENT | Evaluate business concepts with AI Scorer | obtain instantaneous viability scores and structured feedback |
| 7 | STUDENT | Browse LMS tracks and complete lesson quizzes | build entrepreneurship competence and earn passing grades |
| 8 | STUDENT | Submit milestone deliverables with proof links | show venture progress and qualify for stage progression |
| 9 | STUDENT | Submit pitch video and slide deck to Demo Day | participate in virtual pitch competitions and win prizes |
| 10 | GUARDIAN | Approve or deny child platform registration | exercise legal consent over minor's digital incubator access |
| 11 | GUARDIAN | Monitor child startup progress and roadmaps | observe educational activities in a safe read-only viewer |
| 12 | MENTOR | Upload degrees and verification documents | receive verified mentor status from administrators |
| 13 | MENTOR | Review assigned student ventures and milestones | inspect deliverable proof and provide feedback |
| 14 | MENTOR / STUDENT | Send messages in supervised communication channel | collaborate safely under automated AI moderation |
| 15 | MENTOR / JUDGE | Grade pitch submissions on structured rubrics | score innovation, feasibility, and presentation quality |

---

## 12. PROJECT PLAN

| User StoryID | Task Name | Start Date | End Date | Days | Status |
|---|---|---|---|---|---|
| 1 | SPRINT 1 | 14/08/2026 | 16/08/2026 | 3 | COMPLETED |
| 2 | SPRINT 1 | 17/08/2026 | 19/08/2026 | 3 | COMPLETED |
| 4 | SPRINT 1 | 20/08/2026 | 22/08/2026 | 3 | COMPLETED |
| 10 | SPRINT 1 | 23/08/2026 | 25/08/2026 | 3 | COMPLETED |
| 5 | SPRINT 2 | 26/08/2026 | 28/08/2026 | 3 | COMPLETED |
| 6 | SPRINT 2 | 29/08/2026 | 31/08/2026 | 3 | COMPLETED |
| 12 | SPRINT 2 | 01/09/2026 | 03/09/2026 | 3 | COMPLETED |
| 7 | SPRINT 2 | 04/09/2026 | 06/09/2026 | 3 | COMPLETED |
| 8 | SPRINT 3 | 07/09/2026 | 09/09/2026 | 3 | COMPLETED |
| 13 | SPRINT 3 | 10/09/2026 | 12/09/2026 | 3 | COMPLETED |
| 14 | SPRINT 3 | 13/09/2026 | 15/09/2026 | 3 | COMPLETED |
| 9 | SPRINT 3 | 16/09/2026 | 18/09/2026 | 3 | COMPLETED |
| 15 | SPRINT 4 | 19/09/2026 | 21/09/2026 | 3 | COMPLETED |
| 3 | SPRINT 4 | 22/09/2026 | 24/09/2026 | 3 | COMPLETED |
| 11 | SPRINT 4 | 25/09/2026 | 27/09/2026 | 3 | COMPLETED |
| 16 | SPRINT 4 | 28/09/2026 | 30/09/2026 | 3 | COMPLETED |

---

## 13. DATA FLOW DIAGRAMS

### Level 0 (Context Diagram)
```
       +-----------------------+
       | Platform Administrator|
       +-----------+-----------+
                   |
            Request|Response
                   v
+------------------+-------------------+
|               Student                |
|               Founder                |
+--------+---------+---------+---------+
         |         |         |
  Request|Response |         |
         v         |         |
+--------+---------+-----+   |
|   TeenPreneur Hub API   |   |
|   & AI Microservice     |   |
+--------+---------+-----+   |
         |         |         |
  Request|Response |         |
         v         |         |
+--------+---------+-----+   |
|     Legal Guardian      |   |
+------------------------+   |
                             |
                      Request|Response
                             v
                  +----------+---------+
                  |  Industry Mentor   |
                  +--------------------+
```

### Level 1 (High-Level Process Decomposition)
- **Process 1.0**: Authentication & COPPA Parental Consent Verification
- **Process 2.0**: Student Startup Incubation & AI Idea Scoring
- **Process 3.0**: LMS Coursework & Interactive Knowledge Evaluation
- **Process 4.0**: Milestone Escrow & Deliverable Submission Tracking
- **Process 5.0**: Supervised Messaging with Automated PII Moderation
- **Process 6.0**: Virtual Pitch Demo Day & Judge Scorecard Grading
- **Process 7.0**: Administrative Governance, Telemetry & Audit Logging

---

## 14. ENTITY-RELATIONSHIP (ER) DIAGRAM
- **Users**: `id`, `email`, `password_hash`, `role`, `first_name`, `last_name`, `is_active`
- **Students**: `id`, `user_id`, `date_of_birth`, `school_name`, `grade_level`, `parent_email`, `coppa_consent_status`
- **Guardians**: `id`, `user_id`, `relationship_to_student`, `phone_number`
- **GuardianStudentLinks**: `id`, `guardian_id`, `student_id`, `status`, `consent_token`
- **Mentors**: `id`, `user_id`, `organization`, `years_experience`, `verification_status`
- **Startups**: `id`, `student_id`, `title`, `tagline`, `problem_statement`, `stage`
- **BusinessIdeas**: `id`, `startup_id`, `title`, `feasibility_score`, `market_score`, `ai_feedback`
- **Milestones**: `id`, `startup_id`, `title`, `due_date`, `status`, `evidence_url`
- **Courses / Lessons / Quizzes**: `id`, `title`, `duration_minutes`, `passing_score`
- **Messages**: `id`, `channel_id`, `sender_id`, `content`, `flagged_by_ai`
- **PitchEvents / Submissions**: `id`, `title`, `deck_url`, `score_total`
- **AuditLogs**: `id`, `actor_id`, `action`, `resource`, `ip_address`, `created_at`
