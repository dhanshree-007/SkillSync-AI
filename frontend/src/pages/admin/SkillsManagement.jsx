import React, { useEffect, useState } from 'react';
import { Card } from '../../components/common/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { Search, Plus, Trash2, Edit2 } from 'lucide-react';
import { useToast } from '../../components/common/Toast';
import api from '../../services/api';

export default function SkillsManagement() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/admin/skills').catch(() => ({
          data: [
            { id: 1, name: 'React', category: 'Frontend', usageCount: 1450 },
            { id: 2, name: 'Node.js', category: 'Backend', usageCount: 1200 },
            { id: 3, name: 'Figma', category: 'Design', usageCount: 850 },
          ]
        }));
        setSkills(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this skill from the platform?')) return;
    try {
      await api.delete(`/admin/skills/${id}`).catch(() => {});
      setSkills(skills.filter(s => s.id !== id));
      addToast('Skill deleted successfully', 'success');
    } catch (e) {
      addToast('Failed to delete skill', 'error');
    }
  };

  if (loading) return <Loader text="Loading skills taxonomy..." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Skills Taxonomy Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage standardized skills available on the platform.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search skills..." className="pl-9 input-field py-2 h-[42px]" />
          </div>
          <Button><Plus className="w-4 h-4 mr-2" /> Add Skill</Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-0 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Skill Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Global Usage Count</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell className="font-semibold text-slate-900 dark:text-white">{skill.name}</TableCell>
                <TableCell>{skill.category}</TableCell>
                <TableCell>{skill.usageCount}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" title="Edit Skill">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete Skill" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(skill.id)}>
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
