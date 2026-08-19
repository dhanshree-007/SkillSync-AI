import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { Check, X, ArrowRight, Target, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function SkillGapAnalysis() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGaps = async () => {
      try {
        const res = await api.get('/ai/skill-gap').catch(() => ({
          data: {
            targetRole: 'Senior React & Full-Stack Developer',
            matchPercentage: 75,
            presentSkills: ['React.js', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Git', 'REST APIs', 'Tailwind CSS'],
            missingSkills: [
              { name: 'TypeScript', importance: 'HIGH', description: 'Essential for strongly typed scalable React applications.' },
              { name: 'Redux Toolkit / Zustand', importance: 'HIGH', description: 'Required for enterprise global state management.' },
              { name: 'Next.js', importance: 'MEDIUM', description: 'Server-side rendering and modern full-stack React routing.' },
              { name: 'Jest / Testing Library', importance: 'HIGH', description: 'Crucial for unit testing and robust TDD code quality.' }
            ]
          }
        }));
        setData(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchGaps();
  }, []);

  if (loading) return <Loader text="Analyzing skill gaps..." />;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-cyan-400" />
            Skill Gap <span className="text-neural-gradient">Analysis</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Neural AI comparison of your profile against target industry roles.
          </p>
        </div>
        <Button onClick={() => navigate('/student/roadmap')} className="btn-primary">
          Generate Learning Roadmap <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Target Role Overview Banner */}
      <Card className="neural-glass-card border border-slate-800/80 rounded-2xl overflow-hidden relative shadow-2xl p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/15 via-transparent to-cyan-500/15 pointer-events-none"></div>
        <CardContent className="p-0 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div>
            <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest block mb-2">Target Role Assessment</span>
            <h2 className="text-3xl font-extrabold text-white flex items-center">
              <Target className="w-8 h-8 mr-3 text-cyan-400" />
              {data.targetRole}
            </h2>
          </div>
          <div className="mt-6 md:mt-0 text-center md:text-right">
            <div className="text-5xl font-extrabold text-cyan-400 tracking-tight">{data.matchPercentage}%</div>
            <p className="text-xs font-extrabold text-slate-300 uppercase tracking-widest mt-1">Skill Match Score</p>
          </div>
        </CardContent>
      </Card>

      {/* Acquired Skills vs Missing Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Acquired Skills Card */}
        <Card className="neural-glass-card border border-slate-800/80 rounded-2xl p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-emerald-400 font-extrabold text-base flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" /> Acquired Core Skills ({data.presentSkills.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-wrap gap-2.5">
              {data.presentSkills.map((skill, i) => (
                <div key={i} className="skill-matched">
                  ✓ {skill}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Missing Skills Card */}
        <Card className="neural-glass-card border border-slate-800/80 rounded-2xl p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-rose-400 font-extrabold text-base flex items-center gap-2">
              <X className="w-5 h-5 text-rose-400" /> Missing Priority Gaps ({data.missingSkills.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-3.5">
              {data.missingSkills.map((skill, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#0B1120] border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center font-bold text-white text-sm">
                      <X className="w-4 h-4 mr-2 text-rose-400" /> {skill.name}
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      skill.importance === 'HIGH' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {skill.importance} PRIORITY
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{skill.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
