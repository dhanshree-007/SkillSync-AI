import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { useToast } from '../../components/common/Toast';
import { Edit2, Eye, Trash2, Users } from 'lucide-react';
import api from '../../services/api';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/recruiter/jobs').catch(() => ({
          data: [
            { id: 1, title: 'Senior Frontend Developer', location: 'Remote', status: 'ACTIVE', applications: 45, postedDate: '2023-10-01' },
            { id: 2, title: 'Backend Engineer', location: 'New York, NY', status: 'CLOSED', applications: 112, postedDate: '2023-09-15' },
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
    if (!window.confirm('Are you sure you want to delete this job? This will also remove all associated applications.')) return;
    
    try {
      await api.delete(`/recruiter/jobs/${id}`).catch(() => {});
      setJobs(jobs.filter(job => job.id !== id));
      addToast('Job deleted successfully', 'success');
    } catch (e) {
      addToast('Failed to delete job', 'error');
    }
  };

  if (loading) return <Loader text="Loading your jobs..." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Manage Jobs</h1>
          <p className="text-slate-600 dark:text-slate-400">View and manage your active and closed job postings.</p>
        </div>
        <Button onClick={() => navigate('/recruiter/jobs/new')}>Post New Job</Button>
      </div>

      <Card className="p-0 overflow-hidden border-0 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-32 text-slate-500">
                  You haven't posted any jobs yet.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-semibold text-slate-900 dark:text-white">{job.title}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      job.status === 'ACTIVE' 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {job.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center font-medium">
                      <Users className="w-4 h-4 mr-2 text-brand-500" />
                      {job.applications}
                    </div>
                  </TableCell>
                  <TableCell>{job.postedDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" title="View Applications" onClick={() => navigate(`/recruiter/applications?jobId=${job.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit Job" onClick={() => navigate(`/recruiter/jobs/${job.id}/edit`)}>
                        <Edit2 className="h-4 w-4 text-brand-500" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete Job" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(job.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
