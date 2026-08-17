# Database Design Document & Data Dictionary
## TeenPreneur Hub: Relational PostgreSQL Schema

**Database System**: PostgreSQL (Version 14+)  
**ORM / Migration Engine**: Knex.js  
**Total Entities**: 27 Tables  
**Architecture**: Normalized 3NF Relational Model with Relational Integrity and Cascading Rules  

---

## 1. Entity Relationship Overview

The TeenPreneur Hub database structure is organized into seven functional domains:
1. **User & Identity Domain**: `users`, `students`, `guardians`, `guardian_student_links`
2. **Mentorship Domain**: `mentors`, `mentor_verifications`, `mentor_assignments`
3. **Incubation & Startup Domain**: `startups`, `business_ideas`, `milestones`, `milestone_progress`
4. **Learning & Assessment Domain**: `courses`, `lessons`, `quizzes`, `quiz_questions`, `quiz_attempts`, `learning_progress`
5. **Supervised Communication & Moderation**: `conversations`, `conversation_participants`, `messages`, `message_flags`, `moderation_actions`
6. **Virtual Pitch Competition Domain**: `pitch_events`, `pitch_submissions`, `pitch_feedback`
7. **System Governance Domain**: `notifications`, `audit_logs`

---

## 2. Table Specifications & Data Dictionary

### 2.1 User & Identity Tables

#### `users`
Central authentication table for all platform personas.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | SERIAL | PRIMARY KEY | Unique user identifier |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE, INDEX | User login email address |
| `password_hash` | VARCHAR(255) | NOT NULL | Bcrypt salted hash |
| `role` | ENUM | NOT NULL | 'student', 'guardian', 'mentor', 'admin' |
| `status` | ENUM | DEFAULT 'pending' | 'pending', 'active', 'suspended', 'deactivated' |
| `first_name` | VARCHAR(100) | NOT NULL | User first name |
| `last_name` | VARCHAR(100) | NOT NULL | User last name |
| `phone` | VARCHAR(20) | NULL | Contact telephone |
| `avatar_url` | VARCHAR(500) | NULL | Profile image storage URI |
| `last_login` | TIMESTAMP | NULL | Timestamp of last successful login |
| `failed_login_attempts` | INT | DEFAULT 0 | Counter for brute force lockout |
| `locked_until` | TIMESTAMP | NULL | Timestamp until account unlock |
| `created_at` / `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Audit timestamps |

#### `students`
Profile extension for adolescent founders.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | SERIAL | PRIMARY KEY | Profile ID |
| `user_id` | INT | FK -> `users.id`, ON DELETE CASCADE | Associated user account |
| `date_of_birth` | DATE | NOT NULL | Used for COPPA age verification |
| `school_name` | VARCHAR(255) | NULL | Educational institution |
| `grade_level` | VARCHAR(50) | NULL | Current academic grade |
| `bio` | TEXT | NULL | Personal introduction & interests |

#### `guardians`
Profile extension for legal caretakers.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | SERIAL | PRIMARY KEY | Profile ID |
| `user_id` | INT | FK -> `users.id`, ON DELETE CASCADE | Associated user account |
| `relationship_type`| VARCHAR(50) | NOT NULL | Parent, Legal Guardian, Educator |

#### `guardian_student_links`
Junction table managing parental authorization and supervision permissions.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | SERIAL | PRIMARY KEY | Link ID |
| `guardian_id` | INT | FK -> `guardians.id`, ON DELETE CASCADE | Guardian reference |
| `student_id` | INT | FK -> `students.id`, ON DELETE CASCADE | Student reference |
| `status` | ENUM | DEFAULT 'pending' | 'pending', 'approved', 'rejected' |
| `approval_token` | VARCHAR(255)| NULL | Cryptographic token for email approvals |
| `approved_at` | TIMESTAMP | NULL | Time consent granted |

---

### 2.2 Mentorship Tables

#### `mentors`
Profile extension for industry mentors.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | SERIAL | PRIMARY KEY | Mentor profile ID |
| `user_id` | INT | FK -> `users.id`, ON DELETE CASCADE | Associated user account |
| `expertise_areas` | VARCHAR(255)| NOT NULL | Comma-separated or JSON domains |
| `years_experience`| INT | NOT NULL | Professional experience count |
| `company` | VARCHAR(255)| NULL | Current organization |
| `verification_status`| ENUM | DEFAULT 'unverified' | 'unverified', 'pending', 'verified', 'rejected' |

#### `mentor_verifications`
Document repository for mentor background validation.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | SERIAL | PRIMARY KEY | Verification request ID |
| `mentor_id` | INT | FK -> `mentors.id`, ON DELETE CASCADE | Mentor submitting credentials |
| `document_type` | VARCHAR(100)| NOT NULL | 'identity_proof', 'degree', 'work_credentials' |
| `document_url` | VARCHAR(500)| NOT NULL | Uploaded document URI |
| `status` | ENUM | DEFAULT 'pending' | 'pending', 'approved', 'rejected' |
| `reviewed_by` | INT | FK -> `users.id` | Admin who reviewed documents |
| `review_notes` | TEXT | NULL | Admin feedback / justification |

#### `mentor_assignments`
Tracks active mentorship pairings between mentors and student startups.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | SERIAL | PRIMARY KEY | Assignment ID |
| `mentor_id` | INT | FK -> `mentors.id`, ON DELETE CASCADE | Mentor |
| `student_id` | INT | FK -> `students.id`, ON DELETE CASCADE | Mentee |
| `startup_id` | INT | FK -> `startups.id`, ON DELETE SET NULL | Startup |
| `status` | ENUM | DEFAULT 'active' | 'active', 'completed', 'terminated' |

---

### 2.3 Incubation & Startup Domain

#### `startups`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | SERIAL | PRIMARY KEY | Startup ID |
| `student_id` | INT | FK -> `students.id`, ON DELETE CASCADE | Founder |
| `name` | VARCHAR(255)| NOT NULL | Startup venture name |
| `tagline` | VARCHAR(255)| NULL | One-line value proposition |
| `description` | TEXT | NOT NULL | Full problem & solution summary |
| `industry` | VARCHAR(100)| NOT NULL | EdTech, FinTech, GreenTech, AI, Health |
| `stage` | ENUM | DEFAULT 'ideation'| 'ideation', 'validation', 'prototype', 'pitch' |

#### `business_ideas`
Stores candidate business models and lean canvas iterations.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | SERIAL | PRIMARY KEY | Idea ID |
| `startup_id` | INT | FK -> `startups.id`, ON DELETE CASCADE | Parent startup |
| `title` | VARCHAR(255)| NOT NULL | Idea title |
| `problem_statement`| TEXT | NOT NULL | Customer pain point |
| `target_market` | TEXT | NULL | Demographics and addressable size |
| `validation_status`| ENUM | DEFAULT 'draft' | 'draft', 'testing', 'validated', 'pivoted' |

#### `milestones` & `milestone_progress`
Tracks milestone goals and execution proof (documents, URLs, screenshots).

---

### 2.4 LMS Domain
- `courses`: Entrepreneurship curricular units.
- `lessons`: Sequential learning modules with video links and reading markdown.
- `quizzes`: End-of-lesson assessments.
- `quiz_questions`: Multiple-choice questions with JSONB options.
- `quiz_attempts`: Log of student attempts, selected answers, and final score.
- `learning_progress`: Tracks completion timestamp and percentage per lesson.

---

### 2.5 Supervised Messaging & Safety Domain
- `conversations`: Chat sessions (direct 1-on-1 or mentorship rooms).
- `conversation_participants`: Users joined to each room.
- `messages`: Message body, timestamp, and flag count.
- `message_flags`: Records auto-detected violations (profanity, phone leak, PII).
- `moderation_actions`: Audit record of administrator decisions (dismissed, warning sent, message redacted, user suspended).

---

### 2.6 Virtual Pitch Domain
- `pitch_events`: Incubation pitch dates, rules, and rubric criteria.
- `pitch_submissions`: Student pitch decks, video demo links, and executive summaries.
- `pitch_feedback`: Evaluator scorecards with category scores (1–10) and qualitative feedback.

---

### 2.7 Governance & Audit Domain
- `notifications`: User notification center alerts.
- `audit_logs`: Tamper-proof trail of security events, administrative role modifications, and login events.
