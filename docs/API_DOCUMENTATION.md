# SkillSync API Documentation

This document outlines the expected RESTful endpoints based on the frontend Axios integrations. All routes (except auth) require a valid `Bearer Token` in the Authorization header.

## Auth (Public)
- `POST /api/auth/login`: Authenticate user and return JWT + Role.
- `POST /api/auth/register`: Create a new user account.
- `POST /api/auth/forgot-password`: Send password reset link.
- `POST /api/auth/reset-password`: Update password.

## Student Endpoints (`/api/student/*`)
- `GET /dashboard/stats`: Retrieve top-level stats (applications, saved jobs).
- `POST /resume/upload`: Upload PDF resume (Multipart FormData).
- `GET /resume/history`: Retrieve past resume uploads.
- `GET /ats/score`: Get ATS analysis for latest resume.
- `GET /skill-gap`: Get missing skills based on target role.
- `GET /roadmap`: Get AI-generated learning roadmap.
- `POST /interview/start`: Initialize AI interview session.
- `GET /jobs`: Browse available jobs.
- `GET /jobs/{id}`: Get job details.
- `POST /applications/{jobId}`: Apply to a job.

## Recruiter Endpoints (`/api/recruiter/*`)
- `GET /dashboard/stats`: Get overview (active jobs, total applications).
- `GET /company`: Get company profile.
- `POST /jobs`: Create a new job posting.
- `GET /jobs`: List all jobs posted by this recruiter.
- `GET /applications/{jobId}`: List candidates for a job.
- `POST /candidates/{id}/status`: Update candidate status (e.g., Shortlisted).

## Admin Endpoints (`/api/admin/*`)
- `GET /dashboard/stats`: Platform-wide analytics.
- `GET /users`: List all users.
- `DELETE /users/{id}`: Ban/remove a user.
- `GET /companies/pending`: List companies awaiting verification.
- `POST /companies/{id}/verify`: Approve a company account.
- `GET /reports`: Generate system reports.
