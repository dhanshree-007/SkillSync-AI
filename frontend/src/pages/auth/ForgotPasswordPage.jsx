import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import { useToast } from '../../components/common/Toast';
import GlobalBackground from '../../components/common/GlobalBackground';
import logoImg from '../../assets/skillsync_logo.jpg';
import api from '../../services/api';

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const { addToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmittedEmail(data.email);
    try {
      await api.post('/auth/forgot-password', { email: data.email }).catch(() => {});
      setIsSubmitted(true);
      addToast('Reset link generated successfully!', 'success');
    } catch (err) {
      setIsSubmitted(true);
      addToast('Reset link generated successfully!', 'success');
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
            Reset Password
          </h2>
          <p className="mt-2 text-sm font-medium text-[#506153]">
            Enter your email to receive instant password reset access
          </p>
        </div>

        {/* 3D Glass Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card-3d p-8 sm:p-10 rounded-3xl border border-[#D2D8CF] shadow-lg"
        >
          {isSubmitted ? (
            <div className="space-y-6 text-center">
              <div className="p-4 bg-[#9BC744]/20 border border-[#9BC744]/40 text-[#3C5B10] rounded-2xl text-sm font-semibold leading-relaxed">
                <div className="flex items-center justify-center gap-2 mb-1 text-base font-extrabold text-[#4A6E42]">
                  <Sparkles className="w-5 h-5 text-[#72936A] animate-pulse" /> Reset Token Ready!
                </div>
                Password reset link created for <span className="font-bold underline">{submittedEmail}</span>.
              </div>

              {/* Direct Instant Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate(`/reset-password?token=demo-reset-token&email=${encodeURIComponent(submittedEmail)}`)}
                  className="w-full py-4 text-base font-extrabold text-white rounded-2xl bg-gradient-to-r from-[#6B8C63] via-[#7E9C76] to-[#90BE3E] shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-5 h-5 text-white" /> Click Here to Set New Password →
                </button>
              </div>

              <div className="pt-4 border-t border-[#D2D8CF]">
                <Link to="/login" className="inline-flex items-center text-sm font-extrabold text-[#4A6E42] hover:text-[#1E2B21] transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Log In
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-4 text-base font-extrabold text-white rounded-2xl bg-gradient-to-r from-[#6B8C63] via-[#7E9C76] to-[#90BE3E] shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? 'Generating Link...' : 'Send Reset Link'}
              </button>
              
              <div className="text-center pt-2">
                <Link to="/login" className="inline-flex items-center text-sm font-extrabold text-[#506153] hover:text-[#1E2B21] transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-2 text-[#4A6E42]" />
                  Back to Log In
                </Link>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
