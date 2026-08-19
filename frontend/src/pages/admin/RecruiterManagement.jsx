import React, { useEffect, useState } from 'react';
import { Card } from '../../components/common/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { Search, Eye } from 'lucide-react';
import api from '../../services/api';

export default function RecruiterManagement() {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const res = await api.get('/admin/recruiters').catch(() => ({
          data: [
            { id: 201, name: 'Jane Recruiter', company: 'TechCorp Solutions', activeJobs: 5, totalHires: 12, verification: 'VERIFIED' },
            { id: 202, name: 'John Smith', company: 'Startup Inc', activeJobs: 2, totalHires: 3, verification: 'PENDING' },
          ]
        }));
        setRecruiters(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchRecruiters();
  }, []);

  if (loading) return <Loader text="Loading recruiters..." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Recruiter Management</h1>
          <p className="text-slate-600 dark:text-slate-400">View and manage employer accounts.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search recruiters..." className="pl-9 input-field py-2 h-[42px]" />
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-0 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recruiter Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Active Jobs</TableHead>
              <TableHead>Total Hires</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recruiters.map((recruiter) => (
              <TableRow key={recruiter.id}>
                <TableCell className="font-semibold text-slate-900 dark:text-white">{recruiter.name}</TableCell>
                <TableCell>{recruiter.company}</TableCell>
                <TableCell>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    recruiter.verification === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {recruiter.verification}
                  </span>
                </TableCell>
                <TableCell>{recruiter.activeJobs}</TableCell>
                <TableCell>{recruiter.totalHires}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" title="View Profile">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
