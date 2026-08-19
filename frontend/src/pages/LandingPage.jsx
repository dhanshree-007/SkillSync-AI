import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/common/Footer';
import GlobalBackground from '../components/common/GlobalBackground';
import CustomCursor from '../components/common/CustomCursor';
import heroCharacterImg from '../assets/hero_3d_character.jpg';
import logoImg from '../assets/skillsync_logo.jpg';
import { 
  Bot, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  CheckCircle,
  BrainCircuit,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  MessageCircle,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  const navigate = useNavigate();

  // Interactive 3D Bunny Character State
  const [clickCount, setClickCount] = useState(0);
  const [showSpeech, setShowSpeech] = useState(true);
  const [isJumping, setIsJumping] = useState(false);

  const speechMessages = [
    "Hi there! 👋 I'm your AI Career Mascot!",
    "Ready to score 90+ on your ATS Resume? 🚀",
    "Let me coach you in Live Voice AI Interviews! 🎙️",
    "Click 'Get Started' below to begin your journey! ✨"
  ];

  const handleBunnyClick = () => {
    setIsJumping(true);
    setClickCount((prev) => (prev + 1) % speechMessages.length);
    setShowSpeech(true);

    setTimeout(() => {
      setIsJumping(false);
    }, 400);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#ECEEEA] text-[#1E2B21] selection:bg-[#9BC744]/30 selection:text-[#1E2B21]">
      
      {/* Sleek Custom Glowing Follower Cursor */}
      <CustomCursor />

      {/* 🌌 Reusable Global Ambient Sage/Cream Background */}
      <GlobalBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 pb-32">
        
        {/* Navbar Brand Header */}
        <header className="flex justify-between items-center py-6 border-b border-[#D2D8CF] mb-12">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src={logoImg} 
              alt="SkillSync AI Logo" 
              className="h-11 w-auto rounded-xl shadow-sm border border-[#72936A]/30 hover:scale-105 transition-all duration-300"
            />
            <span className="text-2xl font-heading font-extrabold tracking-tight text-[#1E2B21] flex items-center gap-1">
              SkillSync <span className="text-[#5B7A54]">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="text-sm font-semibold text-[#506153] hover:text-[#1E2B21] transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="btn-primary text-xs px-5 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-md"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </header>
        
        {/* 1. 2-Column Pinterest Editorial Hero Section with Interactive Movie-Style Bunny Mascot (TASK 4) */}
        <section className="py-10 lg:py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              
              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9BC744]/20 border border-[#9BC744]/40 text-[#3C5B10] font-extrabold text-xs tracking-wider uppercase shadow-sm">
                <Sparkles className="w-4 h-4 text-[#72936A] animate-pulse" />
                <span>AI-POWERED CAREER PREPARATION</span>
              </div>

              {/* Main Headline with Gradient Highlighting */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-[#1E2B21] leading-[1.15]">
                Build the skills your <br className="hidden sm:inline" />
                <span className="relative inline-block mt-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A6E42] via-[#5B7A54] to-[#68991D]">
                    next opportunity needs.
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-[#9BC744]/30 -rotate-1 rounded-full blur-sm"></span>
                </span>
              </h1>

              {/* Supporting Description */}
              <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-[#506153] font-medium leading-relaxed">
                SkillSync brings resume analysis, skill-gap insights, personalized learning roadmaps, interview practice, and job discovery into one connected career preparation workspace.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2">
                <button 
                  onClick={() => navigate('/register')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-extrabold text-white bg-gradient-to-r from-[#6B8C63] via-[#7E9C76] to-[#90BE3E] shadow-[0_10px_25px_rgba(114,147,106,0.35)] hover:shadow-[0_15px_35px_rgba(144,190,62,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Get Started for Free <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('inside-skillsync');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else navigate('/register');
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold text-[#233026] border border-[#B2BEAE] bg-white/80 hover:bg-[#EAEFE8] hover:text-[#1E2B21] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
                >
                  Explore SkillSync
                </button>
              </div>

              {/* Soft Editorial Floating Badges Accent */}
              <div className="pt-6 flex flex-wrap justify-center lg:justify-start items-center gap-4 text-xs text-[#506153] font-semibold">
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#D2D8CF] shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-[#4A6E42]" /> 100% Privacy Guaranteed
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#D2D8CF] shadow-sm">
                  <Zap className="w-4 h-4 text-[#946914]" /> Instant ATS Feedback
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#D2D8CF] shadow-sm">
                  <Bot className="w-4 h-4 text-[#68991D]" /> Real-time Voice AI
                </span>
              </div>

            </div>

            {/* Right Column: 🎬 MOVIE-LIKE INTERACTIVE 3D BUNNY MASCOT */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
              
              {/* Floating Glass Speech Bubble above Bunny */}
              <AnimatePresence>
                {showSpeech && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute -top-12 z-30 bg-white/95 backdrop-blur-2xl px-4 py-2.5 rounded-2xl border border-[#72936A]/50 shadow-md text-xs font-bold text-[#1E2B21] flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#4A6E42] animate-bounce" />
                    <span>{speechMessages[clickCount]}</span>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-[#72936A]/50"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Outer Glowing Interactive Glass Container */}
              <div 
                onClick={handleBunnyClick}
                className={`glass-card-3d rounded-3xl p-4 sm:p-6 border border-[#72936A]/40 relative shadow-lg animate-float max-w-md w-full cursor-pointer group transition-all duration-300 ${
                  isJumping ? 'scale-110 -rotate-3 shadow-xl' : 'hover:scale-[1.03]'
                }`}
              >
                {/* 3D Character Illustration */}
                <div className="relative rounded-2xl overflow-hidden border border-[#D2D8CF]">
                  <img 
                    src={heroCharacterImg} 
                    alt="SkillSync AI Interactive 3D Bunny Mascot" 
                    className={`w-full h-auto object-cover rounded-2xl transition-transform duration-500 ${
                      isJumping ? 'scale-110' : 'group-hover:scale-105'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#ECEEEA]/40 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Floating Product UI Preview Badge: Resume Score 92 / 100 */}
                <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-xl p-3 rounded-2xl border border-[#72936A]/50 shadow-md flex items-center gap-2.5 text-xs font-extrabold text-[#1E2B21] animate-pulse">
                  <div className="w-8 h-8 rounded-xl bg-[#9BC744]/20 flex items-center justify-center text-[#4A6E42]">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#506153] uppercase tracking-widest">Resume Score</span>
                    <span className="text-sm font-extrabold text-[#436A15]">92 / 100</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* TASK 3: Premium Real Product Showcase (Inside SkillSync) */}
        <section id="inside-skillsync" className="py-12 lg:py-16 relative">
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#72936A]/15 border border-[#72936A]/30 text-[#4A6E42] font-extrabold text-xs tracking-wider uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#72936A]" />
              <span>INSIDE SKILLSYNC</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1E2B21] tracking-tight">
              See your career progress clearly.
            </h2>
            <p className="text-[#506153] max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-medium leading-relaxed">
              Turn your resume, skills, and interview preparation into one clear career workflow.
            </p>
          </div>

          {/* Polished SaaS Product Dashboard Preview Window (Illustrative Demo UI) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-card-3d rounded-3xl p-4 sm:p-6 md:p-8 border border-[#72936A]/40 shadow-xl max-w-6xl mx-auto overflow-hidden"
          >
            {/* Top Mock Window Bar */}
            <div className="flex items-center justify-between border-b border-[#D2D8CF] pb-4 mb-6 text-xs text-[#506153] font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400/80"></span>
                <span className="ml-2 font-mono text-[11px] text-[#506153] hidden sm:inline">app.skillsync.ai/student/dashboard</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#9BC744]/20 border border-[#9BC744]/40 text-[#3C5B10] font-extrabold text-[10px] uppercase tracking-wider">
                Live Interactive Workspace
              </span>
            </div>

            {/* Dashboard Showcase Grid */}
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* 1. Dashboard Sidebar Mockup */}
              <div className="w-full md:w-60 bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-[#D2D8CF] shrink-0 space-y-2">
                <div className="text-[11px] font-extrabold text-[#4A6E42] uppercase tracking-widest px-2 mb-3">
                  Student Navigation
                </div>
                {[
                  { label: "Dashboard", icon: LayoutDashboard, active: true },
                  { label: "Resume Analysis", icon: FileText, active: false },
                  { label: "Skill Gap", icon: BrainCircuit, active: false },
                  { label: "Learning Roadmap", icon: GraduationCap, active: false },
                  { label: "Interview Coach", icon: Bot, active: false }
                ].map((nav, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      nav.active 
                        ? 'bg-gradient-to-r from-[#9BC744]/25 via-[#72936A]/15 to-transparent text-[#1E2B21] border-l-4 border-[#72936A] shadow-sm' 
                        : 'text-[#506153] hover:bg-[#E2E6DF]'
                    }`}
                  >
                    <nav.icon className={`w-4 h-4 ${nav.active ? 'text-[#4A6E42]' : 'text-slate-400'}`} />
                    <span>{nav.label}</span>
                  </div>
                ))}
              </div>

              {/* 2. Main Dashboard Panel Mockup */}
              <div className="flex-1 space-y-6">
                
                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Card 1: ATS Resume Score */}
                  <div className="bg-white/80 rounded-2xl p-4 border border-[#D2D8CF] shadow-sm">
                    <div className="flex items-center justify-between text-[#506153] mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">ATS Resume Score</span>
                      <FileText className="w-4 h-4 text-[#4A6E42]" />
                    </div>
                    <div className="text-3xl font-extrabold text-[#1E2B21] tracking-tight">88<span className="text-sm font-bold text-[#506153]">/100</span></div>
                    <div className="mt-2 text-[10px] font-extrabold text-[#3C5B10] bg-[#9BC744]/20 px-2 py-0.5 rounded border border-[#9BC744]/40 inline-block">
                      High Match (+12 pts)
                    </div>
                  </div>

                  {/* Card 2: Skill Readiness */}
                  <div className="bg-white/80 rounded-2xl p-4 border border-[#D2D8CF] shadow-sm">
                    <div className="flex items-center justify-between text-[#506153] mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Skill Readiness</span>
                      <BrainCircuit className="w-4 h-4 text-[#4D7314]" />
                    </div>
                    <div className="text-3xl font-extrabold text-[#1E2B21] tracking-tight">12<span className="text-sm font-bold text-[#506153]">/15</span></div>
                    <div className="mt-2 text-[10px] font-extrabold text-[#4A6E42] bg-[#72936A]/15 px-2 py-0.5 rounded border border-[#72936A]/30 inline-block">
                      80% Core Skills Verified
                    </div>
                  </div>

                  {/* Card 3: Interview Preparation */}
                  <div className="bg-white/80 rounded-2xl p-4 border border-[#D2D8CF] shadow-sm">
                    <div className="flex items-center justify-between text-[#506153] mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Interview Prep</span>
                      <Bot className="w-4 h-4 text-[#946914]" />
                    </div>
                    <div className="text-3xl font-extrabold text-[#1E2B21] tracking-tight">4 <span className="text-sm font-bold text-[#506153]">Sessions</span></div>
                    <div className="mt-2 text-[10px] font-extrabold text-[#946914] bg-[#F0C465]/20 px-2 py-0.5 rounded border border-[#F0C465]/40 inline-block">
                      Gemini Voice AI Active
                    </div>
                  </div>
                </div>

                {/* Skill Inventory Breakdown */}
                <div className="bg-white/80 rounded-2xl p-5 border border-[#D2D8CF] shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-extrabold text-[#1E2B21] flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#4A6E42]" /> Verified Skills & Priority Gaps
                    </h4>
                    <span className="text-[10px] font-bold text-[#506153]">Target: Full Stack Developer</span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { skill: "React.js", status: "Verified Match", level: "95%", color: "bg-[#9BC744]", textColor: "text-[#3C5B10]", isMatch: true },
                      { skill: "JavaScript", status: "Verified Match", level: "90%", color: "bg-[#9BC744]", textColor: "text-[#3C5B10]", isMatch: true },
                      { skill: "Node.js", status: "Verified Match", level: "85%", color: "bg-[#72936A]", textColor: "text-[#4A6E42]", isMatch: true },
                      { skill: "System Design", status: "Gap Identified", level: "High Priority", color: "bg-[#F0C465]", textColor: "text-[#946914]", isMatch: false }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#ECEEEA]/60 border border-[#D2D8CF] text-xs">
                        <div className="flex items-center gap-2.5 font-bold text-[#1E2B21]">
                          <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                          <span>{item.skill}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[#506153] font-semibold hidden sm:inline">{item.level}</span>
                          <span className={`px-2.5 py-0.5 rounded-md font-extrabold text-[10px] border ${
                            item.isMatch ? 'bg-[#9BC744]/20 border-[#9BC744]/40 text-[#3C5B10]' : 'bg-[#F0C465]/20 border-[#F0C465]/40 text-[#946914]'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Note caption */}
            <p className="text-center text-[11px] text-[#506153] mt-4 font-semibold">
              * Displayed dashboard metrics represent example candidate workflow interface views.
            </p>

          </motion.div>
        </section>

        {/* 2. Honest Product Capabilities Bar (Step 1 - UNCHANGED) */}
        <section className="py-10 border-y border-[#D2D8CF] my-8 relative">
          <p className="text-center text-xs font-extrabold text-[#506153] uppercase tracking-widest mb-6">
            One platform for your career preparation
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 max-w-4xl mx-auto px-4">
            {[
              { name: "Resume Analysis", icon: FileText, iconColor: "text-[#4A6E42]", bg: "bg-[#72936A]/10 border-[#72936A]/30 text-[#1E2B21]" },
              { name: "Skill Gap Detection", icon: BrainCircuit, iconColor: "text-[#4D7314]", bg: "bg-[#9BC744]/15 border-[#9BC744]/40 text-[#1E2B21]" },
              { name: "Learning Roadmaps", icon: GraduationCap, iconColor: "text-[#946914]", bg: "bg-[#F0C465]/20 border-[#F0C465]/40 text-[#1E2B21]" },
              { name: "AI Interview Practice", icon: Bot, iconColor: "text-[#4A6E42]", bg: "bg-[#72936A]/10 border-[#72936A]/30 text-[#1E2B21]" },
              { name: "Job Matching", icon: Briefcase, iconColor: "text-[#8C4722]", bg: "bg-[#DCB098]/25 border-[#DCB098]/50 text-[#1E2B21]" }
            ].map((item, index) => (
              <div 
                key={index}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border shadow-sm font-extrabold text-xs sm:text-sm backdrop-blur-md transition-all duration-300 hover:scale-105 ${item.bg}`}
              >
                <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Product Capabilities Section (TASK 2 - Replaced Fabricated Statistics) */}
        <section className="py-16">
          <div className="text-center mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9BC744]/20 border border-[#9BC744]/40 text-[#3C5B10] font-extrabold text-xs tracking-wider uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#72936A]" />
              <span>Built around your career journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-[#1E2B21] tracking-tight">
              From resume to interview, in one place.
            </h2>
            <p className="text-[#506153] max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
              SkillSync brings resume analysis, skill improvement, interview practice, and job discovery into one connected experience.
            </p>
          </div>

          {/* 4 Connected Feature Cards Grid (Responsive 1-col / 2-col / 4-col) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Resume Analysis */}
            <div className="glass-card-3d p-6 rounded-3xl relative overflow-hidden group border border-[#D2D8CF] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl icon-tile-3d-sage flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-extrabold text-[#1E2B21] mb-2 tracking-tight">Resume Analysis</h3>
                <p className="text-[#506153] text-xs font-medium leading-relaxed">
                  Upload your resume PDF to receive an instant 0–100 ATS compatibility score, uncover missing technical keywords, and get structural formatting recommendations.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D2D8CF] flex items-center gap-1.5 text-[#4A6E42] font-bold text-xs">
                <span>ATS Score Audit</span> <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2: Skill Gap Analysis */}
            <div className="glass-card-3d p-6 rounded-3xl relative overflow-hidden group border border-[#D2D8CF] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl icon-tile-3d-lime flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-extrabold text-[#1E2B21] mb-2 tracking-tight">Skill Gap Analysis</h3>
                <p className="text-[#506153] text-xs font-medium leading-relaxed">
                  Compare your verified technical skill inventory against real job requirements to pinpoint critical missing frameworks and domain proficiencies.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D2D8CF] flex items-center gap-1.5 text-[#4D7314] font-bold text-xs">
                <span>Skill Match Audit</span> <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3: Learning Roadmap */}
            <div className="glass-card-3d p-6 rounded-3xl relative overflow-hidden group border border-[#D2D8CF] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl icon-tile-3d-cream flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-extrabold text-[#1E2B21] mb-2 tracking-tight">Learning Roadmap</h3>
                <p className="text-[#506153] text-xs font-medium leading-relaxed">
                  Generate structured, step-by-step learning paths tailored to your target career role, complete with curated video courses and documentation links.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D2D8CF] flex items-center gap-1.5 text-[#946914] font-bold text-xs">
                <span>Custom Path Guide</span> <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 4: AI Interview Coach */}
            <div className="glass-card-3d p-6 rounded-3xl relative overflow-hidden group border border-[#72936A]/50 hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl icon-tile-3d-sage flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Bot className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-extrabold text-[#1E2B21] mb-2 tracking-tight">AI Interview Coach</h3>
                <p className="text-[#506153] text-xs font-medium leading-relaxed">
                  Practice live conversational technical and behavioral voice interviews powered by Google Gemini AI, receiving instant evaluation on answer accuracy and speech confidence.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D2D8CF] flex items-center gap-1.5 text-[#4A6E42] font-bold text-xs">
                <span>Voice Audio Session</span> <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </section>

        {/* 4. How It Works Section (TASK 5 - Polished Workflow Copy) */}
        <section className="py-16 relative">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-[#1E2B21] tracking-tight">How SkillSync Works</h2>
            <p className="text-[#506153] text-base mt-2 font-medium">3 simple steps to accelerate your career preparation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: "01", 
                title: "Create Your Profile", 
                desc: "Set up your career profile and provide the information SkillSync needs to understand your goals and current experience." 
              },
              { 
                step: "02", 
                title: "Analyze & Improve", 
                desc: "Use AI-powered resume analysis and skill-gap insights to understand where your profile can improve." 
              },
              { 
                step: "03", 
                title: "Prepare With Confidence", 
                desc: "Follow your personalized learning roadmap, practice interviews, and explore relevant opportunities." 
              }
            ].map((item, i) => (
              <div key={i} className="glass-card-3d p-8 rounded-3xl text-center relative group">
                <div className="w-16 h-16 mx-auto rounded-2xl icon-tile-3d-sage flex items-center justify-center text-2xl font-extrabold text-[#4A6E42] mb-6 shadow-sm">
                  {item.step}
                </div>
                <h3 className="text-2xl font-extrabold text-[#1E2B21] mb-2">{item.title}</h3>
                <p className="text-[#506153] text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Editorial Pricing Section */}
        <section className="py-16 max-w-lg mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-heading font-extrabold text-[#1E2B21] tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-[#506153] text-sm mt-2 font-medium">Free for all students looking to grow</p>
          </div>
          
          <div className="glass-card-3d p-10 rounded-3xl relative overflow-hidden border-2 border-[#72936A]/60 shadow-lg">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-[#72936A] to-[#9BC744] text-white text-[11px] font-extrabold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-extrabold text-[#1E2B21] mb-2">Student Growth Plan</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-6xl font-extrabold text-[#1E2B21] tracking-tight">$0</span>
              <span className="text-[#506153] font-semibold">/ forever</span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                'Unlimited ATS Resume Analysis', 
                'Live Voice AI Mock Interviews', 
                'Smart Recommended Job Matches', 
                'Custom Learning Roadmaps'
              ].map((feature, i) => (
                <li key={i} className="flex items-center text-[#1E2B21] font-semibold text-sm">
                  <CheckCircle className="h-5 w-5 text-[#4A6E42] mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => navigate('/register')}
              className="w-full py-4 text-base font-extrabold text-white rounded-full bg-gradient-to-r from-[#6B8C63] via-[#7E9C76] to-[#90BE3E] shadow-md hover:scale-[1.02] active:scale-95 transition-all"
            >
              Create Free Student Account
            </button>
          </div>
        </section>

      </div>
      
      <Footer />
    </div>
  );
}
