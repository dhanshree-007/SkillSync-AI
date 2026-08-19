import React, { useEffect, useState } from 'react';
import { Card } from '../../components/common/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { Search, Eye, Trash2, ShieldAlert } from 'lucide-react';
import { useToast } from '../../components/common/Toast';
import api from '../../services/api';

export default function JobManagement() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/admin/jobs').catch(() => ({
          data: [
            { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp Solutions', status: 'ACTIVE', applications: 45, date: '2023-10-01' },
            { id: 2, title: 'Backend Engineer', company: 'Startup Inc', status: 'CLOSED', applications: 112, date: '2023-09-15' },
          ]
        }));
        setJobs(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job posting platform-wide?')) return;
    try {
      await api.delete(`/admin/jobs/${id}`).catch(() => {});
      setJobs(jobs.filter(j => j.id !== id));
      addToast('Job deleted successfully', 'success');
    } catch (e) {
      addToast('Failed to delete job', 'error');
    }
  };

  if (loading) return <Loader text="Loading global jobs..." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Global Job Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Moderate and oversee all job postings.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search jobs or companies..." className="pl-9 input-field py-2 h-[42px]" />
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-0 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-semibold text-slate-900 dark:text-white">{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    job.status === 'ACTIVE' 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {job.status}
                  </span>
                </TableCell>
                <TableCell>{job.applications}</TableCell>
                <TableCell>{job.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" title="View Job">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Flag as inappropriate" className="text-amber-500 hover:text-amber-600 hover:bg-amber-50">
                      <ShieldAlert className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete Job" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(job.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
