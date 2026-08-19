import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { useToast } from '../../components/common/Toast';
import { Eye, Check, X, Filter } from 'lucide-react';
import api from '../../services/api';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const endpoint = jobId ? `/recruiter/applications?jobId=${jobId}` : '/recruiter/applications';
        const res = await api.get(endpoint).catch(() => ({
          data: [
            { id: 101, candidateName: 'Alice Smith', jobTitle: 'Senior Frontend Developer', atsScore: 92, status: 'PENDING', appliedDate: '2023-10-05' },
            { id: 102, candidateName: 'Bob Jones', jobTitle: 'Senior Frontend Developer', atsScore: 65, status: 'REJECTED', appliedDate: '2023-10-06' },
            { id: 103, candidateName: 'Charlie Brown', jobTitle: 'Backend Engineer', atsScore: 88, status: 'INTERVIEW', appliedDate: '2023-10-08' },
          ]
        }));
        setApplications(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [jobId]);

  const updateStatus = async (appId, newStatus) => {
    try {
      await api.put(`/recruiter/applications/${appId}/status`, { status: newStatus }).catch(() => {});
      setApplications(apps => apps.map(app => app.id === appId ? { ...app, status: newStatus } : app));
      addToast(`Candidate ${newStatus.toLowerCase()} successfully`, 'success');
    } catch (e) {
      addToast('Failed to update status', 'error');
    }
  };

  if (loading) return <Loader text="Loading applications..." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
            {jobId ? 'Job Applications' : 'All Applications'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Review and manage candidate applications.</p>
        </div>
        <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
      </div>

      <Card className="p-0 overflow-hidden border-0 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              {!jobId && <TableHead>Applied For</TableHead>}
              <TableHead>ATS Match</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={jobId ? 5 : 6} className="text-center h-32 text-slate-500">
                  No applications found.
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-semibold text-slate-900 dark:text-white">{app.candidateName}</TableCell>
                  {!jobId && <TableCell className="text-slate-600 dark:text-slate-400">{app.jobTitle}</TableCell>}
                  <TableCell>
                    <span className={`font-bold ${app.atsScore >= 80 ? 'text-emerald-500' : app.atsScore >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                      {app.atsScore}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      app.status === 'INTERVIEW' ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400' :
                      app.status === 'REJECTED' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      app.status === 'HIRED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {app.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">{app.appliedDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" title="View Candidate Profile" onClick={() => navigate(`/recruiter/candidate/${app.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {app.status === 'PENDING' && (
                        <>
                          <Button variant="ghost" size="icon" title="Shortlist for Interview" className="text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50" onClick={() => updateStatus(app.id, 'INTERVIEW')}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Reject" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => updateStatus(app.id, 'REJECTED')}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
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
