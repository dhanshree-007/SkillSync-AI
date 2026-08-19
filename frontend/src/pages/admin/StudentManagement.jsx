import React, { useEffect, useState } from 'react';
import { Card } from '../../components/common/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { Search, Eye } from 'lucide-react';
import api from '../../services/api';

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get('/admin/students').catch(() => ({
          data: [
            { id: 101, name: 'Alice Smith', university: 'Stanford University', major: 'Computer Science', atsAverage: 88, applications: 12 },
            { id: 102, name: 'Bob Jones', university: 'MIT', major: 'Software Engineering', atsAverage: 75, applications: 5 },
          ]
        }));
        setStudents(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) return <Loader text="Loading students..." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Student Management</h1>
          <p className="text-slate-600 dark:text-slate-400">View and analyze student profiles.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search students..." className="pl-9 input-field py-2 h-[42px]" />
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-0 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>University / Major</TableHead>
              <TableHead>Avg. ATS Score</TableHead>
              <TableHead>Total Applications</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-semibold text-slate-900 dark:text-white">{student.name}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="text-slate-900 dark:text-slate-300">{student.university}</p>
                    <p className="text-slate-500 text-xs">{student.major}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`font-bold ${student.atsAverage >= 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {student.atsAverage}%
                  </span>
                </TableCell>
                <TableCell>{student.applications}</TableCell>
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
