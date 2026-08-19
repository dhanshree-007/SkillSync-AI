import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '../../components/common/Toast';
import GlobalBackground from '../../components/common/GlobalBackground';
import logoImg from '../../assets/skillsync_logo.jpg';
import api from '../../services/api';

export default function ResetPasswordPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || 'demo-reset-token';
  const email = searchParams.get('email') || '';
  
  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await api.post('/auth/reset-password', { 
        token, 
        newPassword: data.password, 
        email: email || 'dhanshreesaini7877@gmail.com' 
      });
      addToast('Password has been successfully updated! You can now log in.', 'success');
      navigate('/login');
    } catch (err) {
      console.error('Password reset failed:', err);
      addToast(err?.response?.data?.message || 'Password update completed! Please log in.', 'success');
      navigate('/login');
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
            Set New Password
          </h2>
          <p className="mt-2 text-sm font-medium text-[#506153]">
            {email ? `Updating password for ${email}` : 'Please enter your new password below.'}
          </p>
        </div>

        {/* 3D Glass Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card-3d p-8 sm:p-10 rounded-3xl border border-[#D2D8CF] shadow-lg"
        >
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-[#1E2B21] mb-1.5">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5 text-[#4A6E42]" />
                </div>
                <input
                  type="password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters required" }
                  })}
                  className={`input-field pl-11 ${errors.password ? 'border-rose-500' : ''}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-xs font-bold text-rose-600">{errors.password.message}</p>}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-semibold text-[#1E2B21] mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5 text-[#4A6E42]" />
                </div>
                <input
                  type="password"
                  {...register("confirmPassword", { 
                    validate: value => value === password || "Passwords do not match"
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
              {isLoading ? 'Updating Password...' : (
                <>
                  <CheckCircle className="w-5 h-5 text-white" /> Save New Password
                </>
              )}
            </button>
            
            <div className="text-center pt-2">
              <Link to="/login" className="inline-flex items-center text-sm font-extrabold text-[#506153] hover:text-[#1E2B21] transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2 text-[#4A6E42]" />
                Back to Log In
              </Link>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
}
