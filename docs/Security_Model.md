# Security Model & Child Protection Specification
## TeenPreneur Hub: Safety Architecture

**Compliance Standard**: Children's Online Privacy Protection Act (COPPA) & OWASP Top 10  
**Target Demographic**: Minor Founders (Ages 13–18) & Mentors  
**Version**: 1.0.0  
**Date**: September 14, 2026  

---

## 1. Safety by Design & COPPA Principles

Because TeenPreneur Hub caters to middle school and high school youth, safety is not an afterthought; it is woven into the data model, user experience, and server middleware:

1. **Parental Consent Gate**:
   - During registration, students under 18 years old must supply a legal guardian's verified email address.
   - The student's account is created with `status = 'pending'`.
   - The platform sends a secure, single-use cryptographic token link to the parent.
   - Until the guardian clicks and submits authorization, the minor cannot access the platform, message anyone, or browse other user profiles.

2. **No Unsupervised Channels**:
   - Mentors and students interact only within platform conversations.
   - Guardians maintain complete read-only transparency into their child's message logs and mentor feedback.
   - Any attempt to share personal phone numbers, off-platform chat links (WhatsApp, Telegram, Discord), or social handles triggers automatic regex redaction and flags the message for administrative review.

3. **Data Minimization**:
   - Only necessary demographic data is retained.
   - Minor contact information is shielded from other platform users.

---

## 2. Authentication & Authorization Hierarchy

### 2.1 Role-Based Access Control (RBAC) Matrix

| Resource / Capability | Student (Minor) | Legal Guardian | Industry Mentor | System Administrator |
|---|---|---|---|---|
| Register / Login | Yes | Yes | Yes | Yes |
| Create Startup & Pitch | Yes | View Only (Own Child) | View Assigned | Full Access |
| Complete Quizzes & Courses | Yes | View Progress | Authoring/Review | Full Access |
| Direct Messaging | Filtered (Mentors) | View Only (Child Logs) | Filtered (Mentees) | Queue Moderation |
| Mentor Credential Review | No | No | Submit Only | Review & Grant |
| Review Child Actions | N/A | Full (Linked Child) | No | System-wide |
| Audit Trail Inspection | No | No | No | Full Access |

### 2.2 Token Security
- **Access Tokens**: Short-lived JWTs (15-minute expiration), signed using `HS256` with strong environment secret.
- **Refresh Tokens**: Stored securely with HTTP-only attributes where applicable, allowing seamless rotation.
- **Brute Force Defense**: 5 consecutive invalid authentication attempts results in a 15-minute lock on the target account.

---

## 3. Automated Content Moderation Engine

### 3.1 Dual-Stage Filtering Workflow
1. **Synchronous In-Flight Regex & Keyword Filtering (Node.js)**:
   - Evaluates incoming message content against a curated lexicon of profanity, harassment keywords, and PII patterns (phone numbers, email addresses, social handles).
   - If severe violations occur, the message text is masked (e.g. `[REDACTED CONTENT - SAFETY VIOLATION]`) and a record is created in `message_flags`.
2. **Asynchronous NLP Sentiment & Semantic Analysis (Python Service)**:
   - Computes toxic sentiment scores and identifies coercive or grooming behavior patterns.
   - Emits alerts to the administrative dashboard whenever a confidence threshold exceeds 0.75.
