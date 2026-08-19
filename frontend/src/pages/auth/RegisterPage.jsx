import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import GlobalBackground from '../../components/common/GlobalBackground';
import logoImg from '../../assets/skillsync_logo.jpg';

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [role, setRole] = useState('STUDENT');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register: registerUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: role
      };
      
      await registerUser(payload);
      addToast('Registration successful! Please log in.', 'success');
      navigate('/login');
    } catch (err) {
      addToast(err.toString() || 'Registration failed.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#ECEEEA] text-[#1E2B21] overflow-hidden">
      
      {/* 🌌 Ambient Sage & Cream drift background */}
      <GlobalBackground />

      <div className="max-w-md w-full mx-auto relative z-10">
        
        {/* Brand Header with Custom Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-3">
            <img 
              src={logoImg} 
              alt="SkillSync AI Logo" 
              className="h-16 w-auto mx-auto rounded-2xl border border-[#72936A]/40 shadow-sm hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1E2B21] tracking-tight">
            Create an Account
          </h2>
          <p className="mt-2 text-sm font-medium text-[#506153]">
            Join SkillSync AI to accelerate your career
          </p>
        </div>

        {/* 3D Glass Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card-3d p-8 sm:p-10 rounded-3xl border border-[#D2D8CF] shadow-lg"
        >
          {/* Role Selection Tabs */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('STUDENT')}
              className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl border font-extrabold text-sm transition-all duration-300 ${
                role === 'STUDENT' 
                  ? 'bg-gradient-to-r from-[#9BC744]/25 to-[#72936A]/20 border-[#72936A] text-[#1E2B21] shadow-sm' 
                  : 'bg-white/70 border-[#D2D8CF] text-[#506153] hover:text-[#1E2B21] hover:border-[#B2BEAE]'
              }`}
            >
              <GraduationCap className={`h-5 w-5 ${role === 'STUDENT' ? 'text-[#4A6E42]' : 'text-slate-400'}`} />
              <span>Student</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('RECRUITER')}
              className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl border font-extrabold text-sm transition-all duration-300 ${
                role === 'RECRUITER' 
                  ? 'bg-gradient-to-r from-[#F0C465]/30 to-[#72936A]/20 border-[#946914] text-[#1E2B21] shadow-sm' 
                  : 'bg-white/70 border-[#D2D8CF] text-[#506153] hover:text-[#1E2B21] hover:border-[#B2BEAE]'
              }`}
            >
              <Briefcase className={`h-5 w-5 ${role === 'RECRUITER' ? 'text-[#946914]' : 'text-slate-400'}`} />
              <span>Recruiter</span>
            </button>
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-[#1E2B21] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="h-5 w-5 text-[#4A6E42]" />
                </div>
                <input
                  type="text"
                  {...register("fullName", { required: "Full name is required" })}
                  className={`input-field pl-11 ${errors.fullName ? 'border-rose-500' : ''}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && <p className="mt-1 text-xs font-bold text-rose-600">{errors.fullName.message}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-semibold text-[#1E2B21] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-5 w-5 text-[#4A6E42]" />
                </div>
                <input
                  type="email"
                  {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })}
                  className={`input-field pl-11 ${errors.email ? 'border-rose-500' : ''}`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs font-bold text-rose-600">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#1E2B21] mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5 text-[#4A6E42]" />
                </div>
                <input
                  type="password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                  className={`input-field pl-11 ${errors.password ? 'border-rose-500' : ''}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-xs font-bold text-rose-600">{errors.password.message}</p>}
            </div>
            
            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-[#1E2B21] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5 text-[#4A6E42]" />
                </div>
                <input
                  type="password"
                  {...register("confirmPassword", { 
                    validate: value => value === password || "The passwords do not match"
                  })}
                  className={`input-field pl-11 ${errors.confirmPassword ? 'border-rose-500' : ''}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs font-bold text-rose-600">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 text-base font-extrabold text-white rounded-2xl bg-gradient-to-r from-[#6B8C63] via-[#7E9C76] to-[#90BE3E] shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : (
                <>
                  Create Account <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            
            {/* Sign In Footer Link */}
            <div className="text-center text-sm font-semibold text-[#506153] pt-3">
              Already have an account?{' '}
              <Link to="/login" className="font-extrabold text-[#4A6E42] hover:text-[#233026] underline underline-offset-4 transition-colors">
                Sign In
              </Link>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
}
