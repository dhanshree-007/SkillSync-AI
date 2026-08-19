import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import GlobalBackground from '../../components/common/GlobalBackground';
import logoImg from '../../assets/skillsync_logo.jpg';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleRedirect = (role) => {
    switch(role) {
      case 'ADMIN': navigate('/admin/dashboard', { replace: true }); break;
      case 'RECRUITER': navigate('/recruiter/dashboard', { replace: true }); break;
      case 'STUDENT': navigate('/dashboard', { replace: true }); break;
      default: navigate('/dashboard', { replace: true });
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const user = await login(data.email, data.password);
      addToast('Successfully logged in!', 'success');
      
      const from = location.state?.from?.pathname;
      if (from && from !== '/') {
        navigate(from, { replace: true });
      } else {
        handleRoleRedirect(user.role);
      }
    } catch (err) {
      addToast(err.toString() || 'Login failed. Please check your credentials.', 'error');
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
            Welcome Back
          </h2>
          <p className="mt-2 text-sm font-medium text-[#506153]">
            Sign in to access your SkillSync AI dashboard
          </p>
        </div>

        {/* 3D Glass Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card-3d p-8 sm:p-10 rounded-3xl border border-[#D2D8CF] shadow-lg"
        >
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
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
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                  className={`input-field pl-11 pr-11 ${errors.password ? 'border-rose-500' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#506153] hover:text-[#1E2B21] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs font-bold text-rose-600">{errors.password.message}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#72936A] focus:ring-[#72936A] border-[#C6CEC2] rounded bg-white accent-[#72936A]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-semibold text-[#506153]">
                  Remember me
                </label>
              </div>

              <Link to="/forgot-password" className="text-xs font-bold text-[#4A6E42] hover:text-[#233026] transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 text-base font-extrabold text-white rounded-2xl bg-gradient-to-r from-[#6B8C63] via-[#7E9C76] to-[#90BE3E] shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : (
                <>
                  Sign In <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            
            {/* Register Footer Link */}
            <div className="text-center text-sm font-semibold text-[#506153] pt-3">
              Don't have an account?{' '}
              <Link to="/register" className="font-extrabold text-[#4A6E42] hover:text-[#233026] underline underline-offset-4 transition-colors">
                Register now
              </Link>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
}
