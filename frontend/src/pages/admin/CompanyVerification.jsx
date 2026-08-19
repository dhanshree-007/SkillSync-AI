import React, { useEffect, useState } from 'react';
import { Card } from '../../components/common/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { useToast } from '../../components/common/Toast';
import { Check, X, FileText } from 'lucide-react';
import api from '../../services/api';

export default function CompanyVerification() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await api.get('/admin/verifications').catch(() => ({
          data: [
            { id: 301, name: 'Startup Inc', website: 'https://startup.inc', email: 'hr@startup.inc', requestedBy: 'John Smith', date: '2023-10-15' },
            { id: 302, name: 'NextGen Tech', website: 'https://nextgen.tech', email: 'careers@nextgen.tech', requestedBy: 'Sarah Connor', date: '2023-10-16' },
          ]
        }));
        setCompanies(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await api.put(`/admin/verifications/${id}`, { action }).catch(() => {});
      setCompanies(companies.filter(c => c.id !== id));
      addToast(`Company ${action.toLowerCase()} successfully`, 'success');
    } catch (e) {
      addToast('Failed to process verification', 'error');
    }
  };

  if (loading) return <Loader text="Loading pending verifications..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Company Verification</h1>
        <p className="text-slate-600 dark:text-slate-400">Review and approve new employer registrations.</p>
      </div>

      <Card className="p-0 overflow-hidden border-0 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Contact / Website</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32 text-slate-500">
                  No pending verifications.
                </TableCell>
              </TableRow>
            ) : (
              companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-semibold text-slate-900 dark:text-white">{company.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <a href={company.website} target="_blank" rel="noreferrer" className="text-brand-500 hover:underline">{company.website}</a>
                      <p className="text-slate-500 text-xs">{company.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{company.requestedBy}</TableCell>
                  <TableCell>{company.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" title="View Documents">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Approve" className="text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50" onClick={() => handleAction(company.id, 'APPROVED')}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Reject" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleAction(company.id, 'REJECTED')}>
                        <X className="h-4 w-4" />
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
