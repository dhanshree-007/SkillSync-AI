# System Diagrams

## 1. ER Diagram

```mermaid
erDiagram
    USER ||--o{ STUDENT_PROFILE : has
    USER ||--o{ RECRUITER_PROFILE : has
    STUDENT_PROFILE ||--o{ RESUME : uploads
    STUDENT_PROFILE ||--o{ APPLICATION : submits
    RECRUITER_PROFILE ||--o{ JOB : posts
    JOB ||--o{ APPLICATION : receives
    COMPANY ||--o{ RECRUITER_PROFILE : employs
    COMPANY ||--o{ JOB : owns
```

## 2. Sequence Diagram: AI Resume Analysis

```mermaid
sequenceDiagram
    actor Student
    participant Frontend
    participant Backend
    participant Cloudinary
    participant GeminiAI
    
    Student->>Frontend: Uploads Resume (PDF)
    Frontend->>Cloudinary: Upload File
    Cloudinary-->>Frontend: Return Secure URL
    Frontend->>Backend: POST /api/student/resume (URL)
    Backend->>Backend: Extract Text from PDF
    Backend->>GeminiAI: Prompt: Analyze Resume Text
    GeminiAI-->>Backend: Return ATS Score & JSON Skills
    Backend->>Backend: Save to Database
    Backend-->>Frontend: Return Analysis Results
    Frontend-->>Student: Display Radar Chart & Scores
```

## 3. Use Case Diagram

```mermaid
usecaseDiagram
    actor Student
    actor Recruiter
    actor Admin
    
    Student --> (Upload Resume)
    Student --> (Take AI Interview)
    Student --> (Apply to Jobs)
    
    Recruiter --> (Post Jobs)
    Recruiter --> (Review Candidates)
    
    Admin --> (Verify Companies)
    Admin --> (Manage Users)
```
