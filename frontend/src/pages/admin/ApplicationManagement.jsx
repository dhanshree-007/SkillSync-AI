import React, { useEffect, useState } from 'react';
import { Card } from '../../components/common/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/common/Table';
import { Loader } from '../../components/common/Loader';
import { Search } from 'lucide-react';
import api from '../../services/api';

export default function ApplicationManagement() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await api.get('/admin/applications').catch(() => ({
          data: [
            { id: 101, candidate: 'Alice Smith', job: 'Senior Frontend Developer', company: 'TechCorp', status: 'INTERVIEW', date: '2023-10-05' },
            { id: 102, candidate: 'Bob Jones', job: 'Backend Engineer', company: 'Startup Inc', status: 'REJECTED', date: '2023-10-06' },
          ]
        }));
        setApps(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  if (loading) return <Loader text="Loading global applications..." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Application Management</h1>
          <p className="text-slate-600 dark:text-slate-400">High-level view of all applications on the platform.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search applications..." className="pl-9 input-field py-2 h-[42px]" />
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-0 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apps.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-semibold text-slate-900 dark:text-white">{app.candidate}</TableCell>
                <TableCell>{app.job}</TableCell>
                <TableCell>{app.company}</TableCell>
                <TableCell>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    app.status === 'INTERVIEW' ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400' :
                    app.status === 'REJECTED' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}>
                    {app.status}
                  </span>
                </TableCell>
                <TableCell>{app.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
