import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/common/Card';
import { Loader } from '../../components/common/Loader';
import { ArrowLeft, MessageSquare, Bot, User, CheckCircle2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function InterviewFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setFeedback([
        {
          id: 1,
          question: "Can you explain the difference between a controlled and uncontrolled component in React?",
          userAnswer: "A controlled component is when React manages the state, like using useState. Uncontrolled is when the DOM handles it, like using a ref.",
          idealAnswer: "In a controlled component, form data is handled by a React component via state (e.g., useState). In an uncontrolled component, form data is handled by the DOM itself, accessed via refs. Controlled components are generally preferred for dynamic inputs and immediate validation.",
          improvement: "Your answer is correct but lacks depth. Mentioning when to use which (e.g., validation for controlled, quick porting of legacy code for uncontrolled) would make it stronger.",
          score: 78
        },
        {
          id: 2,
          question: "How do you optimize performance in a React application?",
          userAnswer: "I use useMemo and useCallback to stop rerenders. And React.memo for component optimization.",
          idealAnswer: "Performance optimization involves multiple strategies: 1) Memoization (useMemo, useCallback, React.memo) to prevent unnecessary re-renders. 2) Code splitting and lazy loading (React.lazy). 3) Virtualizing long lists. 4) Avoiding anonymous functions in JSX props.",
          improvement: "You identified core memoization hooks, but adding broader architectural optimizations like lazy loading or list virtualization makes it complete for senior roles.",
          score: 85
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loader text="Generating detailed question-by-question feedback..." />;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
        <button 
          onClick={() => navigate('/student/interview/results')} 
          className="p-2.5 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-white border border-slate-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-cyan-400" />
            Detailed AI Feedback <span className="text-neural-gradient">Report</span>
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Review your candidate answers against the AI's ideal responses and improvement tips.
          </p>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-8">
        {feedback.map((item, index) => (
          <Card key={item.id} className="neural-glass-card border border-slate-800/80 rounded-2xl overflow-hidden p-0">
            <div className="bg-[#0B1120] p-5 border-b border-slate-800 flex justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest block">Question {index + 1}</span>
                  <h3 className="font-extrabold text-white text-base mt-0.5">{item.question}</h3>
                </div>
              </div>

              <span className="text-xs font-extrabold px-3 py-1 bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 rounded-full shrink-0">
                {item.score}% Match
              </span>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Candidate Answer */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center shrink-0 border border-slate-700">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">Your Spoken Answer</h4>
                  <p className="text-slate-200 text-sm leading-relaxed bg-[#0B1120] p-4 rounded-xl border border-slate-800">{item.userAnswer}</p>
                </div>
              </div>

              {/* Ideal Answer */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-emerald-500/15 text-emerald-400 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-1.5">Ideal AI Answer</h4>
                  <p className="text-emerald-300 text-sm leading-relaxed bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/30">{item.idealAnswer}</p>
                </div>
              </div>

              {/* AI Improvement Tip */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-cyan-500/15 text-cyan-400 rounded-xl flex items-center justify-center shrink-0 border border-cyan-500/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider mb-1.5">AI Improvement Tip</h4>
                  <p className="text-cyan-300 text-sm leading-relaxed bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/30">{item.improvement}</p>
                </div>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
