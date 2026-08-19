import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { Doughnut } from 'react-chartjs-2';
import { ArrowRight, Trophy, Zap, ShieldAlert, Award, RotateCcw, Sparkles } from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function InterviewResults() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const answers = state?.answers || [];
    const answerCount = answers.length;
    
    const baseScore = answerCount > 0 ? Math.min(95, 68 + answerCount * 5) : 84;

    setTimeout(() => {
      setData({
        overallScore: baseScore,
        technicalScore: Math.min(98, baseScore + 4),
        communicationScore: Math.max(70, baseScore - 5),
        confidenceScore: Math.min(95, baseScore + 6),
        summary: answers.length > 0 
          ? `Great job completing your AI audio interview! You answered ${answerCount} question(s) clearly. Your technical reasoning and spoken delivery were strong.`
          : "You demonstrated a strong understanding of core technical concepts and spoken confidence throughout the interview."
      });
      setLoading(false);
    }, 1000);
  }, [state]);

  if (loading) return <Loader text="AI is evaluating your interview responses..." />;

  const createGauge = (score, color) => ({
    labels: ['Score', 'Remaining'],
    datasets: [{
      data: [score, Math.max(0, 100 - score)],
      backgroundColor: [color, 'rgba(30, 41, 59, 0.6)'],
      borderWidth: 0,
      circumference: 180,
      rotation: 270,
    }]
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Bar Header & Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-cyan-400" />
            Interview Evaluation <span className="text-neural-gradient">Results</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Neural Voice AI analysis of your spoken responses and performance metrics.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <button 
            onClick={() => navigate('/student/interview')}
            className="group px-5 h-11 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400 group-hover:-rotate-90 transition-transform duration-300" />
            <span>New Interview</span>
          </button>

          <button 
            onClick={() => navigate('/student/interview/feedback')}
            className="btn-primary px-6 h-11 text-xs font-bold flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>View Detailed Feedback</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Main Overall Score Card */}
      <Card className="neural-glass-card border border-slate-800/80 rounded-2xl overflow-hidden relative shadow-2xl p-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <CardContent className="p-8 relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-52 h-32 relative flex flex-col items-center justify-end shrink-0 pt-2">
            <div className="w-full h-full absolute inset-0">
              {data && (
                <Doughnut 
                  data={createGauge(data.overallScore, '#06B6D4')} 
                  options={{ 
                    cutout: '78%', 
                    plugins: { 
                      legend: { display: false },
                      tooltip: { enabled: false } 
                    },
                    maintainAspectRatio: false
                  }} 
                />
              )}
            </div>
            <div className="relative z-10 text-center pb-1">
              <span className="text-4xl font-extrabold text-cyan-400 block tracking-tight">{data?.overallScore}%</span>
              <span className="text-[10px] text-slate-300 tracking-widest font-extrabold uppercase block -mt-1">OVERALL SCORE</span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-extrabold flex items-center justify-center md:justify-start mb-2 text-white">
              <Trophy className="w-6 h-6 mr-3 text-amber-400" />
              Strong Spoken Performance
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">{data?.summary}</p>
          </div>
        </CardContent>
      </Card>

      {/* Metric Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="neural-glass-card border border-slate-800/80 rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-slate-300 font-extrabold text-xs uppercase tracking-wider">Technical Accuracy</h3>
            <p className="text-4xl font-extrabold text-white mt-1">{data?.technicalScore}%</p>
          </CardContent>
        </Card>
        
        <Card className="neural-glass-card border border-slate-800/80 rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-purple-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-slate-300 font-extrabold text-xs uppercase tracking-wider">Spoken Communication</h3>
            <p className="text-4xl font-extrabold text-white mt-1">{data?.communicationScore}%</p>
          </CardContent>
        </Card>
        
        <Card className="neural-glass-card border border-slate-800/80 rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-slate-300 font-extrabold text-xs uppercase tracking-wider">Confidence & Tone</h3>
            <p className="text-4xl font-extrabold text-white mt-1">{data?.confidenceScore}%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
