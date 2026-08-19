import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../../components/common/Card';
import { Loader } from '../../../components/common/Loader';
import { Building2, MoreHorizontal, CheckCircle2, XCircle } from 'lucide-react';
import api from '../../../services/api';

export default function ApplicationTracker() {
  const [columns, setColumns] = useState({
    APPLIED: [],
    INTERVIEW: [],
    OFFERED: [],
    REJECTED: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracker = async () => {
      try {
        const res = await api.get('/student/applications/tracker').catch(() => ({
          data: [
            { id: 1, title: 'React Developer', company: 'Netflix', status: 'APPLIED', date: 'Oct 5' },
            { id: 2, title: 'Junior Software Engineer', company: 'Stripe', status: 'INTERVIEW', date: 'Oct 1' },
            { id: 3, title: 'Frontend Developer', company: 'Spotify', status: 'REJECTED', date: 'Sep 25' },
          ]
        }));
        
        const sorted = { APPLIED: [], INTERVIEW: [], OFFERED: [], REJECTED: [] };
        res.data.forEach(app => {
          if (sorted[app.status]) {
            sorted[app.status].push(app);
          }
        });
        setColumns(sorted);
      } finally {
        setLoading(false);
      }
    };
    fetchTracker();
  }, []);

  if (loading) return <Loader text="Loading your Kanban board..." />;

  const ColumnHeader = ({ title, count, color }) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full">{count}</span>
    </div>
  );

  const JobCard = ({ app }) => (
    <Card className="mb-3 cursor-grab hover:border-brand-500 transition-colors">
      <CardContent className="p-4">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{app.title}</h4>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <Building2 className="w-3 h-3" /> {app.company}
        </div>
        <div className="flex justify-between items-center text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
          <span className="text-slate-400">{app.date}</span>
          <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Application Tracker</h1>
        <p className="text-slate-600 dark:text-slate-400">Visual overview of your pipeline.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start h-full">
        {/* Applied Column */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 min-h-[500px]">
          <ColumnHeader title="Applied" count={columns.APPLIED.length} color="bg-slate-400" />
          {columns.APPLIED.map(app => <JobCard key={app.id} app={app} />)}
        </div>

        {/* Interview Column */}
        <div className="bg-brand-50/50 dark:bg-brand-900/10 p-4 rounded-xl border border-brand-100 dark:border-brand-900/30 min-h-[500px]">
          <ColumnHeader title="Interviewing" count={columns.INTERVIEW.length} color="bg-brand-500" />
          {columns.INTERVIEW.map(app => <JobCard key={app.id} app={app} />)}
        </div>

        {/* Offered Column */}
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 min-h-[500px]">
          <ColumnHeader title="Offers" count={columns.OFFERED.length} color="bg-emerald-500" />
          {columns.OFFERED.map(app => <JobCard key={app.id} app={app} />)}
          {columns.OFFERED.length === 0 && (
            <div className="text-center py-8 text-slate-400 flex flex-col items-center">
              <CheckCircle2 className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-sm">Keep applying!</span>
            </div>
          )}
        </div>

        {/* Rejected Column */}
        <div className="bg-red-50/50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/30 min-h-[500px]">
          <ColumnHeader title="Not Selected" count={columns.REJECTED.length} color="bg-red-500" />
          {columns.REJECTED.map(app => <JobCard key={app.id} app={app} />)}
          {columns.REJECTED.length === 0 && (
            <div className="text-center py-8 text-slate-400 flex flex-col items-center">
              <XCircle className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-sm">No rejections!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
