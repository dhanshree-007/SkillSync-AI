import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/common/Toast';
import ProtectedRoute from './components/common/ProtectedRoute';
import { Loader } from './components/common/Loader';

// Public Pages (Keep Landing Page static for fast initial load)
import LandingPage from './pages/LandingPage';

// Lazy Loaded Pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'));
const NotFound = lazy(() => import('./pages/error/NotFound'));

// Layouts
const StudentLayout = lazy(() => import('./layouts/StudentLayout'));
const RecruiterLayout = lazy(() => import('./layouts/RecruiterLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));

// Student Dashboard Pages
const DashboardHome = lazy(() => import('./pages/student/DashboardHome'));
const ResumeUpload = lazy(() => import('./pages/student/ResumeUpload'));
const ResumePreview = lazy(() => import('./pages/student/ResumePreview'));
const ResumeHistory = lazy(() => import('./pages/student/ResumeHistory'));
const AtsScore = lazy(() => import('./pages/student/AtsScore'));
const SkillGapAnalysis = lazy(() => import('./pages/student/SkillGapAnalysis'));
const LearningRoadmap = lazy(() => import('./pages/student/LearningRoadmap'));
const InterviewCoach = lazy(() => import('./pages/student/InterviewCoach'));
const InterviewSession = lazy(() => import('./pages/student/InterviewSession'));
const InterviewResults = lazy(() => import('./pages/student/InterviewResults'));
const InterviewFeedback = lazy(() => import('./pages/student/InterviewFeedback'));
const Notifications = lazy(() => import('./pages/student/Notifications'));
const ProfileSettings = lazy(() => import('./pages/student/ProfileSettings'));

// Job Portal Pages
const BrowseJobs = lazy(() => import('./pages/student/jobs/BrowseJobs'));
const SearchJobs = lazy(() => import('./pages/student/jobs/SearchJobs'));
const JobDetails = lazy(() => import('./pages/student/jobs/JobDetails'));
const SavedJobs = lazy(() => import('./pages/student/jobs/SavedJobs'));
const AppliedJobs = lazy(() => import('./pages/student/jobs/AppliedJobs'));
const ApplicationTracker = lazy(() => import('./pages/student/jobs/ApplicationTracker'));
const RecommendedJobs = lazy(() => import('./pages/student/jobs/RecommendedJobs'));
const JobAlerts = lazy(() => import('./pages/student/jobs/JobAlerts'));

// Recruiter Dashboard Pages
const RecruiterDashboardHome = lazy(() => import('./pages/recruiter/DashboardHome'));
const CompanyProfile = lazy(() => import('./pages/recruiter/CompanyProfile'));
const PostJob = lazy(() => import('./pages/recruiter/PostJob'));
const ManageJobs = lazy(() => import('./pages/recruiter/ManageJobs'));
const EditJob = lazy(() => import('./pages/recruiter/EditJob'));
const RecruiterJobDetails = lazy(() => import('./pages/recruiter/JobDetails'));
const Applications = lazy(() => import('./pages/recruiter/Applications'));
const CandidateDetails = lazy(() => import('./pages/recruiter/CandidateDetails'));
const ShortlistedCandidates = lazy(() => import('./pages/recruiter/ShortlistedCandidates'));
const RecruiterAnalytics = lazy(() => import('./pages/recruiter/RecruiterAnalytics'));
const RecruiterNotifications = lazy(() => import('./pages/recruiter/Notifications'));
const RecruiterProfile = lazy(() => import('./pages/recruiter/ProfileSettings'));

// Admin Dashboard Pages
const AdminDashboardHome = lazy(() => import('./pages/admin/DashboardHome'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const StudentManagement = lazy(() => import('./pages/admin/StudentManagement'));
const RecruiterManagement = lazy(() => import('./pages/admin/RecruiterManagement'));
const CompanyVerification = lazy(() => import('./pages/admin/CompanyVerification'));
const AdminJobManagement = lazy(() => import('./pages/admin/JobManagement'));
const AdminApplicationManagement = lazy(() => import('./pages/admin/ApplicationManagement'));
const SkillsManagement = lazy(() => import('./pages/admin/SkillsManagement'));
const LearningResourcesManagement = lazy(() => import('./pages/admin/LearningResourcesManagement'));
const AdminAnalytics = lazy(() => import('./pages/admin/AnalyticsDashboard'));
const Reports = lazy(() => import('./pages/admin/Reports'));
const AdminNotifications = lazy(() => import('./pages/admin/Notifications'));
const PlatformSettings = lazy(() => import('./pages/admin/PlatformSettings'));
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile'));

const GlobalLoader = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-[#0B1120] text-slate-100">
    <Loader text="Loading SkillSync AI..." />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Suspense fallback={<GlobalLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              
              {/* Fallback legacy redirects */}
              <Route path="/dashboard" element={<Navigate to="/student/dashboard" replace />} />
              <Route path="/profile" element={<Navigate to="/student/profile" replace />} />
              
              {/* Student Dashboard Routes */}
              <Route path="/student" element={<ProtectedRoute allowedRoles={['STUDENT']}><StudentLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/student/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardHome />} />
                
                {/* AI Resume Suite */}
                <Route path="resume/upload" element={<ResumeUpload />} />
                <Route path="resume/preview/:id" element={<ResumePreview />} />
                <Route path="resume/history" element={<ResumeHistory />} />
                <Route path="ats" element={<AtsScore />} />
                
                {/* AI Skill & Job Suite */}
                <Route path="skill-gap" element={<SkillGapAnalysis />} />
                <Route path="roadmap" element={<LearningRoadmap />} />
                
                {/* Job Portal */}
                <Route path="jobs" element={<Navigate to="/student/jobs/recommended" replace />} />
                <Route path="jobs/browse" element={<BrowseJobs />} />
                <Route path="jobs/search" element={<SearchJobs />} />
                <Route path="jobs/details/:id" element={<JobDetails />} />
                <Route path="jobs/saved" element={<SavedJobs />} />
                <Route path="jobs/applied" element={<AppliedJobs />} />
                <Route path="jobs/tracker" element={<ApplicationTracker />} />
                <Route path="jobs/recommended" element={<RecommendedJobs />} />
                <Route path="jobs/alerts" element={<JobAlerts />} />
                
                {/* AI Interview Suite */}
                <Route path="interview" element={<InterviewCoach />} />
                <Route path="interview/coach" element={<InterviewCoach />} />
                <Route path="interview/session" element={<InterviewSession />} />
                <Route path="interview/results" element={<InterviewResults />} />
                <Route path="interview/feedback" element={<InterviewFeedback />} />
                
                {/* Profile & Notifications */}
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<ProfileSettings />} />
              </Route>

              {/* Recruiter Routes */}
              <Route path="/recruiter" element={<ProtectedRoute allowedRoles={['RECRUITER']}><RecruiterLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/recruiter/dashboard" replace />} />
                <Route path="dashboard" element={<RecruiterDashboardHome />} />
                <Route path="company" element={<CompanyProfile />} />
                <Route path="jobs/new" element={<PostJob />} />
                <Route path="jobs/:id/edit" element={<EditJob />} />
                <Route path="jobs/:id" element={<RecruiterJobDetails />} />
                <Route path="jobs" element={<ManageJobs />} />
                <Route path="applications" element={<Applications />} />
                <Route path="candidate/:id" element={<CandidateDetails />} />
                <Route path="shortlisted" element={<ShortlistedCandidates />} />
                <Route path="analytics" element={<RecruiterAnalytics />} />
                <Route path="notifications" element={<RecruiterNotifications />} />
                <Route path="profile" element={<RecruiterProfile />} />
              </Route>
              
              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardHome />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="students" element={<StudentManagement />} />
                <Route path="recruiters" element={<RecruiterManagement />} />
                <Route path="verifications" element={<CompanyVerification />} />
                <Route path="jobs" element={<AdminJobManagement />} />
                <Route path="applications" element={<AdminApplicationManagement />} />
                <Route path="skills" element={<SkillsManagement />} />
                <Route path="resources" element={<LearningResourcesManagement />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="reports" element={<Reports />} />
                <Route path="notifications" element={<AdminNotifications />} />
                <Route path="settings" element={<PlatformSettings />} />
                <Route path="profile" element={<AdminProfile />} />
              </Route>
              
              {/* Fallback 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
