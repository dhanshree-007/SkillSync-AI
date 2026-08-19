import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Loader } from '../../../components/common/Loader';
import { Building2, MapPin, Calendar, ExternalLink } from 'lucide-react';
import api from '../../../services/api';

export default function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplied = async () => {
      try {
        const res = await api.get('/student/applications').catch(() => ({
          data: [
            { id: 101, title: 'Junior Software Engineer', company: 'Stripe', location: 'San Francisco, CA', appliedOn: '2023-10-01', status: 'INTERVIEW' },
            { id: 102, title: 'Frontend Developer', company: 'Spotify', location: 'Remote', appliedOn: '2023-09-25', status: 'REJECTED' },
            { id: 103, title: 'React Developer', company: 'Netflix', location: 'Los Gatos, CA', appliedOn: '2023-10-05', status: 'APPLIED' }
          ]
        }));
        setApplications(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchApplied();
  }, []);

  if (loading) return <Loader text="Loading your applications..." />;

  const getStatusBadge = (status) => {
    switch(status) {
      case 'APPLIED': return <span className="px-3 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-full text-xs font-bold tracking-wider">APPLIED</span>;
      case 'INTERVIEW': return <span className="px-3 py-1 bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 rounded-full text-xs font-bold tracking-wider">INTERVIEWING</span>;
      case 'REJECTED': return <span className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full text-xs font-bold tracking-wider">NOT SELECTED</span>;
      case 'OFFERED': return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-xs font-bold tracking-wider">OFFERED</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Applied Jobs</h1>
          <p className="text-slate-600 dark:text-slate-400">Track the history of your submitted applications.</p>
        </div>
        <Button onClick={() => navigate('/student/jobs/tracker')}>View Kanban Tracker</Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {applications.map((app) => (
          <Card key={app.id}>
            <CardContent className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex gap-4 w-full md:w-auto items-center">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{app.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{app.company}</span>
                    <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {app.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col justify-between w-full md:w-auto items-center md:items-end border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-4 md:pt-0">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-slate-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" /> Applied {app.appliedOn}
                  </div>
                  {getStatusBadge(app.status)}
                  <Button variant="ghost" size="icon" onClick={() => navigate(`/student/jobs/application/${app.id}`)} title="View Details">
                    <ExternalLink className="w-4 h-4 text-slate-400 hover:text-brand-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
