import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Loader } from '../../../components/common/Loader';
import { Briefcase, MapPin, Building2, Search, Filter, Sparkles, Bookmark, ArrowUpRight } from 'lucide-react';
import { useToast } from '../../../components/common/Toast';
import api from '../../../services/api';

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/student/jobs').catch(() => ({
          data: [
            { id: 1, title: 'Frontend Developer', company: 'TechNova', location: 'Remote', salary: '$90k - $120k', type: 'Full-time', matchScore: 85, tags: ['React', 'CSS'] },
            { id: 2, title: 'Full Stack Engineer', company: 'InnovateX', location: 'New York, NY', salary: '$120k - $150k', type: 'Hybrid', matchScore: 92, tags: ['React', 'Node.js'] },
            { id: 3, title: 'UI/UX Designer', company: 'Creative Labs', location: 'San Francisco, CA', salary: '$100k - $130k', type: 'Onsite', matchScore: 40, tags: ['Figma', 'UI'] },
          ]
        }));
        setJobs(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSave = (e, id) => {
    e.stopPropagation();
    addToast('Job saved to your profile!', 'success');
  };

  if (loading) return <Loader text="Loading latest job postings..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Discover Opportunities</h1>
          <p className="text-slate-600 dark:text-slate-400">Browse thousands of jobs matched to your skills.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none" onClick={() => navigate('/student/jobs/search')}>
            <Search className="w-4 h-4 mr-2" /> Search
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card 
            key={job.id} 
            className="hover:border-brand-500 transition-all cursor-pointer group flex flex-col h-full"
            onClick={() => navigate(`/student/jobs/details/${job.id}`)}
          >
            <CardContent className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand-50 dark:group-hover:bg-brand-900/30 transition-colors">
                  <Briefcase className="w-6 h-6 text-slate-400 group-hover:text-brand-500" />
                </div>
                <button 
                  onClick={(e) => handleSave(e, job.id)}
                  className="p-2 text-slate-400 hover:text-brand-500 transition-colors"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{job.title}</h3>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">{job.company}</p>

              <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1">
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 shrink-0" /> {job.location}</div>
                <div className="flex items-center"><Building2 className="w-4 h-4 mr-2 shrink-0" /> {job.type}</div>
              </div>

              <div className="flex gap-2 mb-6 flex-wrap">
                {job.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                <div>
                  <span className={`text-sm font-bold flex items-center ${
                    job.matchScore >= 80 ? 'text-emerald-500' : job.matchScore >= 60 ? 'text-amber-500' : 'text-slate-500'
                  }`}>
                    {job.matchScore >= 80 && <Sparkles className="w-4 h-4 mr-1" />}
                    {job.matchScore}% Match
                  </span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">{job.salary}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
