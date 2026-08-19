import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Mic, BrainCircuit, Target, Settings2, ArrowRight, Sparkles } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

export default function InterviewCoach() {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      role: 'Senior Frontend Developer',
      type: 'TECHNICAL',
      difficulty: 'MEDIUM',
      questionCount: '5'
    }
  });
  const navigate = useNavigate();
  const { addToast } = useToast();
  const formRef = useRef(null);

  const onSubmit = (data) => {
    navigate('/student/interview/session', { state: { config: data } });
  };

  const handleCardClick = (type) => {
    if (type === 'targeted') {
      addToast('Scroll down to customize your targeted job role & difficulty', 'info');
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'realtime') {
      setValue('type', 'TECHNICAL');
      addToast('Selected Technical Real-time AI mode', 'info');
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'feedback') {
      addToast('Opening Detailed Feedback Reports...', 'info');
      navigate('/student/interview/feedback');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-[#0B1120] text-slate-100 p-2 sm:p-4 rounded-2xl">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-neural-gradient rounded-2xl flex items-center justify-center mx-auto mb-2 text-white shadow-[0_0_25px_rgba(99,102,241,0.5)]">
          <Mic className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white flex items-center justify-center gap-2 tracking-tight">
          AI Executive <span className="text-neural-gradient">Interview Coach</span>
        </h1>
        <p className="text-slate-300 max-w-xl mx-auto text-sm leading-relaxed">
          Practice your interview skills hands-free. Our AI conducts realistic voice interviews with instant, actionable feedback.
        </p>
      </div>

      {/* Interactive Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { 
            id: 'targeted',
            icon: <Target className="w-6 h-6" />, 
            title: "Targeted Questions", 
            desc: "Tailored to your specific role and experience.",
            actionText: "Configure Target Role ↓"
          },
          { 
            id: 'realtime',
            icon: <BrainCircuit className="w-6 h-6" />, 
            title: "Real-time Voice AI", 
            desc: "Dynamic conversational flow based on your answers.",
            actionText: "Select Technical Mode ↓"
          },
          { 
            id: 'feedback',
            icon: <Settings2 className="w-6 h-6" />, 
            title: "Deep Feedback", 
            desc: "Granular scoring on technical accuracy and grammar.",
            actionText: "View Feedback Reports →"
          },
        ].map((feature) => (
          <Card 
            key={feature.id} 
            onClick={() => handleCardClick(feature.id)}
            className="neural-glass-card bg-[#0F172A] border border-slate-800 rounded-2xl hover:border-cyan-500/50 cursor-pointer hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:-translate-y-1 transition-all duration-300 group text-center"
          >
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-cyan-400 group-hover:scale-110 group-hover:bg-neural-gradient group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-extrabold text-white text-base mb-2 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{feature.desc}</p>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center text-xs font-bold text-cyan-400 group-hover:underline">
                  {feature.actionText}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Configuration Form */}
      <Card ref={formRef} className="neural-glass-card bg-[#0F172A] border border-slate-800 rounded-2xl shadow-2xl scroll-mt-20">
        <CardContent className="p-8">
          <h2 className="text-xl font-extrabold text-white mb-6 border-b border-slate-800 pb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Configure Your Live Voice Session
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-2">Target Role</label>
                <input 
                  type="text" 
                  {...register('role', { required: true })} 
                  placeholder="e.g. Senior Frontend Developer"
                  className="input-field bg-[#0B1120] border-slate-800 text-white placeholder:text-slate-500" 
                />
              </div>
              
              <div>
                <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-2">Interview Type</label>
                <select {...register('type', { required: true })} className="input-field bg-[#0B1120] border-slate-800 text-white">
                  <option value="TECHNICAL">Technical Deep Dive</option>
                  <option value="HR">HR / Behavioral</option>
                  <option value="MIXED">Mixed (Both)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-2">Difficulty Level</label>
                <select {...register('difficulty', { required: true })} className="input-field bg-[#0B1120] border-slate-800 text-white">
                  <option value="EASY">Beginner (Easy)</option>
                  <option value="MEDIUM">Intermediate (Medium)</option>
                  <option value="HARD">Advanced (Hard)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-2">Number of Questions</label>
                <select {...register('questionCount', { required: true })} className="input-field bg-[#0B1120] border-slate-800 text-white">
                  <option value="3">Quick Practice (3 Qs)</option>
                  <option value="5">Standard (5 Qs)</option>
                  <option value="10">Full Interview (10 Qs)</option>
                </select>
              </div>
            </div>

            <div className="pt-6">
              <Button type="submit" className="btn-primary w-full h-12 text-lg font-bold text-white shadow-[0_0_25px_rgba(99,102,241,0.4)]">
                Start Live Voice Session <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
