import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from './Button';
import { 
  LayoutDashboard, 
  UploadCloud, 
  History, 
  Target, 
  BrainCircuit, 
  Map, 
  MessageSquare, 
  Briefcase, 
  Bell, 
  User,
  CheckCircle,
  Users,
  Settings,
  BookOpen,
  FileText
} from 'lucide-react';

export default function Sidebar({ isOpen, closeSidebar, role }) {
  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'Upload Resume', path: '/student/resume/upload', icon: UploadCloud },
    { name: 'Resume History', path: '/student/resume/history', icon: History },
    { name: 'ATS Score', path: '/student/ats', icon: Target },
    { name: 'Skill Gap', path: '/student/skill-gap', icon: BrainCircuit },
    { name: 'Roadmap', path: '/student/roadmap', icon: Map },
    { name: 'AI Coach', path: '/student/interview', icon: MessageSquare },
    { name: 'Job Matches', path: '/student/jobs/recommended', icon: Briefcase },
    { name: 'Notifications', path: '/student/notifications', icon: Bell },
    { name: 'Profile', path: '/student/profile', icon: User },
  ];

  const recruiterLinks = [
    { name: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { name: 'Company Profile', path: '/recruiter/company', icon: Briefcase },
    { name: 'Post Job', path: '/recruiter/jobs/new', icon: Target },
    { name: 'Manage Jobs', path: '/recruiter/jobs', icon: Map },
    { name: 'Applications', path: '/recruiter/applications', icon: UploadCloud },
    { name: 'Shortlisted', path: '/recruiter/shortlisted', icon: CheckCircle },
    { name: 'Analytics', path: '/recruiter/analytics', icon: BrainCircuit },
    { name: 'Notifications', path: '/recruiter/notifications', icon: Bell },
    { name: 'Profile', path: '/recruiter/profile', icon: User },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Students', path: '/admin/students', icon: User },
    { name: 'Recruiters', path: '/admin/recruiters', icon: Briefcase },
    { name: 'Verifications', path: '/admin/verifications', icon: CheckCircle },
    { name: 'Jobs', path: '/admin/jobs', icon: Map },
    { name: 'Applications', path: '/admin/applications', icon: UploadCloud },
    { name: 'Skills', path: '/admin/skills', icon: Target },
    { name: 'Resources', path: '/admin/resources', icon: BookOpen },
    { name: 'Analytics', path: '/admin/analytics', icon: BrainCircuit },
    { name: 'Reports', path: '/admin/reports', icon: FileText },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const getLinks = () => {
    switch (role) {
      case 'STUDENT': return studentLinks;
      case 'RECRUITER': return recruiterLinks;
      case 'ADMIN': return adminLinks;
      default: return [];
    }
  };

  const navItems = getLinks();

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden transition-opacity" 
          onClick={closeSidebar}
        />
      )}
      
      <aside className={cn(
        "fixed top-16 bottom-0 left-0 z-40 w-64 bg-[#F0F2EE]/95 backdrop-blur-2xl border-r border-[#D2D8CF] transform transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col shrink-0 shadow-md",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="px-4 pt-5 pb-2">
          <span className="text-[11px] font-extrabold text-[#4A6E42] uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#9BC744] shadow-[0_0_6px_rgba(155,199,68,0.8)] animate-pulse"></span>
            {role} Navigation
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2 px-3 space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => { if(window.innerWidth < 768) closeSidebar(); }}
              className={({ isActive }) => cn(
                "flex items-center px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative group overflow-hidden",
                isActive 
                  ? "bg-gradient-to-r from-[#9BC744]/25 via-[#72936A]/15 to-transparent text-[#1E2B21] font-extrabold border-l-4 border-[#72936A] shadow-sm backdrop-blur-md" 
                  : "text-[#4D5E50] hover:text-[#1E2B21] hover:bg-[#E2E6DF] hover:translate-x-1"
              )}
            >
              <item.icon className="h-5 w-5 mr-3 flex-shrink-0 text-[#4A6E42] group-hover:scale-110 transition-transform" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
}
