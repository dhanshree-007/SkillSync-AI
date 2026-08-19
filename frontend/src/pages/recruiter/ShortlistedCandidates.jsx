import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { Eye, Calendar, Mail } from 'lucide-react';
import api from '../../services/api';

export default function ShortlistedCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShortlisted = async () => {
      try {
        const res = await api.get('/recruiter/applications?status=INTERVIEW').catch(() => ({
          data: [
            { id: 101, candidateName: 'Alice Smith', jobTitle: 'Senior Frontend Developer', email: 'alice@example.com', atsScore: 92, interviewDate: '2023-11-10' },
            { id: 103, candidateName: 'Charlie Brown', jobTitle: 'Backend Engineer', email: 'charlie@example.com', atsScore: 88, interviewDate: 'Not Scheduled' },
          ]
        }));
        setCandidates(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchShortlisted();
  }, []);

  if (loading) return <Loader text="Loading shortlisted candidates..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Shortlisted Candidates</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage candidates that have been moved to the interview phase.</p>
      </div>

      <Card className="p-0 overflow-hidden border-0 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>ATS Match</TableHead>
              <TableHead>Interview Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32 text-slate-500">
                  No shortlisted candidates yet.
                </TableCell>
              </TableRow>
            ) : (
              candidates.map((cand) => (
                <TableRow key={cand.id}>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{cand.candidateName}</p>
                      <p className="text-xs text-slate-500">{cand.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300">{cand.jobTitle}</TableCell>
                  <TableCell>
                    <span className="font-bold text-emerald-500">{cand.atsScore}%</span>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm ${cand.interviewDate === 'Not Scheduled' ? 'text-amber-500 font-medium' : 'text-slate-600 dark:text-slate-300'}`}>
                      {cand.interviewDate}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Calendar className="w-3 h-3" /> Schedule
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => navigate(`/recruiter/candidate/${cand.id}`)}>
                        <Eye className="h-4 w-4 text-brand-500" />
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
