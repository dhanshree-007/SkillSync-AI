import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Loader } from '../../../components/common/Loader';
import { Briefcase, Building2, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';
import api from '../../../services/api';

export default function RecommendedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/ai/jobs/recommended').catch(() => ({
          data: [
            { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp AI Solutions', location: 'Remote', matchScore: 94, salary: '$130k - $160k', tags: ['React.js', 'TypeScript', 'Tailwind CSS'] },
            { id: 2, title: 'Full-Stack React & Node Engineer', company: 'Startup.io', location: 'San Francisco, CA (Hybrid)', matchScore: 88, salary: '$120k - $145k', tags: ['React', 'Node.js', 'REST APIs'] },
            { id: 3, title: 'Lead UI Architecture Engineer', company: 'CyberTech Systems', location: 'Remote', matchScore: 82, salary: '$140k - $175k', tags: ['TypeScript', 'System Design'] },
          ]
        }));
        setJobs(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <Loader text="AI is matching your skills to active jobs..." />;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-heading font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
          <Sparkles className="w-7 h-7 text-cyan-400" />
          AI Job <span className="text-neural-gradient">Matches & Recommendations</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Based on your candidate resume and skill gap analysis, Neural AI matched these high-priority roles.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {jobs.map((job) => (
          <Card key={job.id} className="neural-glass-card border border-slate-800/80 rounded-2xl hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all duration-300 group p-0">
            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <div className="flex gap-4 flex-1">
                <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-neural-gradient group-hover:text-white text-cyan-400 transition-all duration-300">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-400 transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1.5 text-xs font-semibold text-slate-300">
                    <span className="flex items-center text-slate-300"><Building2 className="w-4 h-4 mr-1 text-cyan-400" /> {job.company}</span>
                    <span className="flex items-center text-slate-300"><MapPin className="w-4 h-4 mr-1 text-cyan-400" /> {job.location}</span>
                    <span className="font-extrabold text-cyan-400">{job.salary}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3.5">
                    {job.tags.map((tag, i) => (
                      <span key={i} className="skill-matched text-[11px] py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 border-slate-800 pt-4 md:pt-0 gap-4 md:gap-3">
                <div className="text-center md:text-right">
                  <span className="text-3xl font-extrabold text-cyan-400 tracking-tight block">{job.matchScore}%</span>
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">AI Match Score</p>
                </div>
                <Button className="btn-primary text-xs font-bold px-5 h-10">
                  Apply Now <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
