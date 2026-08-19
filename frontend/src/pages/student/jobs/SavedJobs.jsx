import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Loader } from '../../../components/common/Loader';
import { Briefcase, Building2, MapPin, Trash2, ArrowUpRight } from 'lucide-react';
import { useToast } from '../../../components/common/Toast';
import api from '../../../services/api';

export default function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await api.get('/student/jobs/saved').catch(() => ({
          data: [
            { id: 4, title: 'Backend Developer', company: 'CloudWorks', location: 'Remote', salary: '$110k - $140k' },
            { id: 5, title: 'React Native Engineer', company: 'Appify', location: 'Austin, TX', salary: '$100k - $120k' }
          ]
        }));
        setJobs(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  const handleRemove = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
    addToast('Removed from saved jobs', 'success');
  };

  if (loading) return <Loader text="Loading saved jobs..." />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Saved Jobs</h1>
        <p className="text-slate-600 dark:text-slate-400">Opportunities you've bookmarked for later.</p>
      </div>

      {jobs.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No saved jobs yet</h3>
            <p className="text-slate-500 mt-2 mb-6">Start browsing to find roles you're interested in.</p>
            <Button onClick={() => navigate('/student/jobs/browse')}>Browse Jobs</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:border-brand-500 transition-colors">
              <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                      <span>{job.company}</span>
                      <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {job.location}</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{job.salary}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => handleRemove(job.id)} title="Remove">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button className="flex-1 md:flex-none" onClick={() => navigate(`/student/jobs/details/${job.id}`)}>
                    Apply <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
