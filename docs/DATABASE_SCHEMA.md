# Database Schema Overview

The expected PostgreSQL database schema for the Spring Boot backend supporting this React frontend.

## Core Entities

1. **Users**
   - `id` (UUID, PK)
   - `email` (String, Unique)
   - `password_hash` (String)
   - `role` (Enum: STUDENT, RECRUITER, ADMIN)
   - `created_at` (Timestamp)

2. **StudentProfiles**
   - `user_id` (UUID, FK to Users)
   - `first_name` (String)
   - `last_name` (String)
   - `university` (String)
   - `major` (String)
   - `graduation_year` (Int)

3. **Resumes**
   - `id` (UUID, PK)
   - `student_id` (UUID, FK to StudentProfiles)
   - `file_url` (String - Cloudinary)
   - `parsed_text` (Text)
   - `ats_score` (Int)
   - `created_at` (Timestamp)

4. **Companies**
   - `id` (UUID, PK)
   - `name` (String)
   - `website` (String)
   - `verification_status` (Enum: PENDING, APPROVED, REJECTED)

5. **Jobs**
   - `id` (UUID, PK)
   - `recruiter_id` (UUID, FK to Users)
   - `company_id` (UUID, FK to Companies)
   - `title` (String)
   - `description` (Text)
   - `type` (String)
   - `location` (String)
   - `salary_range` (String)

6. **Applications**
   - `id` (UUID, PK)
   - `job_id` (UUID, FK to Jobs)
   - `student_id` (UUID, FK to StudentProfiles)
   - `status` (Enum: APPLIED, INTERVIEW, OFFERED, REJECTED)
   - `applied_at` (Timestamp)
