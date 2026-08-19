import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { Map, PlayCircle, ExternalLink, CheckCircle, Lock, BookOpen, X, Sparkles, Trophy } from 'lucide-react';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { useToast } from '../../components/common/Toast';

export default function LearningRoadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await api.get('/ai/roadmap').catch(() => ({
          data: {
            targetRole: 'Senior React & Full-Stack Developer',
            modules: [
              { 
                id: 1, 
                title: 'TypeScript & Core React Architecture', 
                status: 'IN_PROGRESS', 
                description: 'Master strong typing, custom hooks, generics, and clean component patterns.', 
                lessons: [
                  'Understanding Generics and Utility Types (Partial, Pick, Omit)',
                  'Custom Hooks with Strongly Typed State',
                  'Performance Optimization with React.memo & useMemo'
                ],
                resources: [
                  { name: 'TypeScript Official Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
                  { name: 'React Modern Documentation', url: 'https://react.dev/learn' }
                ] 
              },
              { 
                id: 2, 
                title: 'Advanced State Management & Redux Toolkit', 
                status: 'LOCKED', 
                description: 'Master Redux Toolkit, RTK Query, and lightweight state management with Zustand.', 
                lessons: [
                  'Global State Architecture with Redux Toolkit',
                  'Asynchronous Thunks and RTK Query Caching',
                  'Zustand for Minimalist State Management'
                ],
                resources: [
                  { name: 'Redux Toolkit Documentation', url: 'https://redux-toolkit.js.org/' },
                  { name: 'Zustand Guide & Examples', url: 'https://github.com/pmndrs/zustand' }
                ] 
              },
              { 
                id: 3, 
                title: 'Testing, CI/CD & Production Deployment', 
                status: 'LOCKED', 
                description: 'TDD with Jest, React Testing Library, and automated GitHub Actions deployment.', 
                lessons: [
                  'Unit and Integration Testing for Components',
                  'Mocking REST API Endpoints with MSW',
                  'Configuring CI/CD Pipeline Build Steps'
                ],
                resources: [
                  { name: 'React Testing Library Guide', url: 'https://testing-library.com/docs/react-testing-library/intro/' },
                  { name: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions' }
                ] 
              },
            ]
          }
        }));
        setRoadmap(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, []);

  const handleStartModule = (mod) => {
    if (mod.status === 'LOCKED') {
      addToast('Complete previous modules to unlock this stage!', 'info');
      return;
    }
    setActiveModule(mod);
    addToast(`Started Module: ${mod.title}`, 'success');
  };

  const handleCompleteModule = (moduleId) => {
    setRoadmap(prev => {
      if (!prev) return prev;
      const updatedModules = prev.modules.map((m, idx, arr) => {
        if (m.id === moduleId) {
          return { ...m, status: 'COMPLETED' };
        }
        if (idx > 0 && arr[idx - 1].id === moduleId && m.status === 'LOCKED') {
          return { ...m, status: 'IN_PROGRESS' };
        }
        return m;
      });
      return { ...prev, modules: updatedModules };
    });

    addToast('Module completed! Level 2 unlocked.', 'success');
    setActiveModule(null);
  };

  if (loading) return <Loader text="Generating your personalized roadmap..." />;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* High Contrast Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-neural-gradient rounded-2xl flex items-center justify-center mx-auto mb-2 text-white shadow-[0_0_25px_rgba(99,102,241,0.5)]">
          <Map className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-heading font-extrabold text-white flex items-center justify-center gap-2">
          Your AI Learning <span className="text-neural-gradient">Journey</span>
        </h1>
        <p className="text-slate-400 text-sm">
          A personalized interactive curriculum to reach <span className="font-extrabold text-cyan-400">{roadmap?.targetRole}</span>.
        </p>
      </div>

      {/* Roadmap Timeline Grid */}
      <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 space-y-10 pb-12">
        {roadmap?.modules.map((module, i) => (
          <motion.div 
            key={module.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline node */}
            <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-[#0B1120] transition-colors ${
              module.status === 'COMPLETED' ? 'bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.6)]' :
              module.status === 'IN_PROGRESS' ? 'bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.8)] animate-pulse' :
              'bg-slate-700'
            }`}></div>

            <Card className={`neural-glass-card border rounded-2xl p-6 transition-all duration-300 ${
              module.status === 'LOCKED' 
                ? 'opacity-60 border-slate-800/60' 
                : module.status === 'COMPLETED'
                ? 'border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                : 'border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
            }`}>
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div>
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-wider ${
                      module.status === 'COMPLETED' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                      module.status === 'IN_PROGRESS' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' :
                      'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      MODULE {i + 1} • {module.status.replace('_', ' ')}
                    </span>
                    <h3 className="text-xl font-extrabold text-white tracking-tight">{module.title}</h3>
                  </div>

                  {module.status === 'IN_PROGRESS' && (
                    <Button 
                      onClick={() => handleStartModule(module)}
                      className="btn-primary gap-2 text-xs font-bold rounded-xl px-5 h-10"
                    >
                      <PlayCircle className="w-4 h-4" /> Start Learning
                    </Button>
                  )}

                  {module.status === 'COMPLETED' && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/15 text-emerald-400 rounded-xl text-xs font-bold border border-emerald-500/30">
                      <CheckCircle className="w-4 h-4 text-emerald-400" /> Completed
                    </div>
                  )}

                  {module.status === 'LOCKED' && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                      <Lock className="w-3.5 h-3.5" /> Locked
                    </div>
                  )}
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.description}</p>
                
                <div className="space-y-3 border-t border-slate-800 pt-4">
                  <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Recommended Learning Resources:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {module.resources.map((res, j) => (
                      <li key={j}>
                        <a 
                          href={res.url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center p-2.5 rounded-xl bg-cyan-500/10 text-xs font-bold text-cyan-400 hover:bg-cyan-500/20 transition-all border border-cyan-500/30"
                        >
                          <ExternalLink className="w-3.5 h-3.5 mr-2 shrink-0 text-cyan-400" /> 
                          <span className="truncate">{res.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Interactive Active Module Modal */}
      {activeModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0F172A] w-full max-w-2xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-[#0B1120]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neural-gradient flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">{activeModule.title}</h3>
                  <p className="text-xs text-cyan-400 font-semibold">Interactive Curriculum Module</p>
                </div>
              </div>

              <button 
                onClick={() => setActiveModule(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#0F172A]">
              <div>
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Module Overview</h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-[#0B1120] p-4 rounded-xl border border-slate-800">
                  {activeModule.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">Key Lessons & Topics</h4>
                <div className="space-y-2">
                  {activeModule.lessons.map((lesson, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-800 bg-[#0B1120]">
                      <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-200 font-medium">{lesson}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">Official Documentation & Materials</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModule.resources.map((res, idx) => (
                    <a
                      key={idx}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-xs font-bold text-cyan-400 hover:bg-cyan-500/20 transition-all"
                    >
                      <span className="truncate">{res.name}</span>
                      <ExternalLink className="w-4 h-4 shrink-0 ml-2" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-[#0B1120] flex justify-between items-center">
              <Button variant="outline" className="border-slate-800 text-slate-300" onClick={() => setActiveModule(null)}>Close</Button>
              <Button onClick={() => handleCompleteModule(activeModule.id)} className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs h-10 px-5 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <Trophy className="w-4 h-4 mr-2" /> Mark Module Completed
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
