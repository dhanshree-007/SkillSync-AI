# Pre-Launch QA Checklist

## 1. Authentication & Security
- [ ] Users can register with valid credentials.
- [ ] Users cannot register with duplicate emails.
- [ ] Passwords are required to be strong (8+ chars, numbers, symbols).
- [ ] Login issues JWT successfully.
- [ ] Invalid credentials return 401 Unauthorized.
- [ ] JWT tokens expire and refresh mechanism works (or redirects to login).
- [ ] Student cannot access `/admin` or `/recruiter` routes (redirected).

## 2. Student Portal
- [ ] Dashboard charts render correctly.
- [ ] Resume upload accepts PDFs only.
- [ ] ATS Score generates a visual radar chart.
- [ ] Learning Roadmap renders timeline UI.
- [ ] AI Interview Session correctly logs user text input.
- [ ] Job Portal Search filters update results.
- [ ] Kanban Application Tracker allows viewing details.

## 3. Recruiter Portal
- [ ] Can create a new Job Posting.
- [ ] Job postings appear on the Student Job Portal.
- [ ] Can view applicants for a specific job.
- [ ] Can change applicant status (e.g. Applied -> Interview).

## 4. Admin Portal
- [ ] Can view total system metrics on the dashboard.
- [ ] Can ban/delete a user account.
- [ ] Can approve pending Company Registrations.

## 5. UI / UX
- [ ] Dark Mode toggle works on every page.
- [ ] Mobile responsive layout verified (Sidebar collapses into hamburger menu).
- [ ] 404 Page appears on invalid routes.
- [ ] 500 Page accessible on server error.
- [ ] Toast notifications appear on success/error actions.
