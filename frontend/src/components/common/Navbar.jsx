import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from './Button';
import { LogOut, User, Menu } from 'lucide-react';
import logoImg from '../../assets/skillsync_logo.jpg';

export default function Navbar({ toggleSidebar }) {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(localStorage.getItem('skillsync_profile_pic') || null);

  useEffect(() => {
    const handleStorageChange = () => {
      setProfileImage(localStorage.getItem('skillsync_profile_pic') || null);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    const role = user?.role?.toUpperCase();
    if (role === 'RECRUITER') {
      navigate('/recruiter/profile');
    } else if (role === 'ADMIN') {
      navigate('/admin/profile');
    } else {
      navigate('/student/profile');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#F2F4F0]/90 backdrop-blur-xl border-b border-[#D2D8CF] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {isAuthenticated && (
              <button onClick={toggleSidebar} className="md:hidden mr-2 p-2 rounded-md text-[#506153] hover:text-[#1E2B21] hover:bg-[#E2E6DF] focus:outline-none">
                <Menu className="h-6 w-6" />
              </button>
            )}
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <img 
                src={logoImg} 
                alt="SkillSync AI Logo" 
                className="h-10 w-auto rounded-xl shadow-sm border border-[#72936A]/30 group-hover:scale-105 transition-all duration-300" 
              />
              <span className="font-heading font-extrabold text-xl text-[#1E2B21] tracking-tight flex items-center gap-1">
                SkillSync <span className="text-[#5B7A54]">AI</span>
                <span className="w-2 h-2 rounded-full bg-[#9BC744] animate-ping"></span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div 
                  onClick={handleProfileClick}
                  className="text-sm hidden sm:block cursor-pointer hover:opacity-80 transition-opacity"
                  title="View Profile Settings"
                >
                  <span className="text-[#506153]">Welcome, </span>
                  <span className="font-bold text-[#4A6E42]">{user?.fullName || user?.email}</span>
                </div>
                
                <button 
                  onClick={handleProfileClick} 
                  title="View Profile Settings"
                  className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#72936A]/50 hover:border-[#72936A] transition-all duration-300 flex items-center justify-center shrink-0 bg-white shadow-sm"
                >
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 text-[#4A6E42]" />
                  )}
                </button>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="border-[#C6CEC2] text-[#233026] hover:bg-[#72936A]/15 hover:text-[#1E2B21]"
                >
                  <LogOut className="h-4 w-4 mr-2 text-[#4A6E42]" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" onClick={() => navigate('/login')} className="text-[#233026] hover:bg-[#E2E6DF]">Log in</Button>
                <Button variant="primary" onClick={() => navigate('/register')} className="shadow-md">Sign up</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
