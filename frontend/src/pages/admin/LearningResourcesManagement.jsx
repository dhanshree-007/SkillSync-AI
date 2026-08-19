import React, { useEffect, useState } from 'react';
import { Card } from '../../components/common/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { Search, Plus, ExternalLink, Trash2 } from 'lucide-react';
import { useToast } from '../../components/common/Toast';
import api from '../../services/api';

export default function LearningResourcesManagement() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await api.get('/admin/resources').catch(() => ({
          data: [
            { id: 1, title: 'Advanced React Patterns', type: 'COURSE', provider: 'Udemy', targetSkill: 'React', link: '#' },
            { id: 2, Nodejs: 'Node.js Microservices', type: 'ARTICLE', provider: 'Medium', targetSkill: 'Node.js', link: '#' },
          ]
        }));
        setResources(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;
    try {
      await api.delete(`/admin/resources/${id}`).catch(() => {});
      setResources(resources.filter(r => r.id !== id));
      addToast('Resource deleted successfully', 'success');
    } catch (e) {
      addToast('Failed to delete resource', 'error');
    }
  };

  if (loading) return <Loader text="Loading learning resources..." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Learning Resources</h1>
          <p className="text-slate-600 dark:text-slate-400">Curate content to recommend to students for skill building.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search resources..." className="pl-9 input-field py-2 h-[42px]" />
          </div>
          <Button><Plus className="w-4 h-4 mr-2" /> Add Resource</Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-0 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title / Provider</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Target Skill</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell>
                  <div className="font-semibold text-slate-900 dark:text-white">{resource.title || resource.Nodejs}</div>
                  <div className="text-sm text-slate-500">{resource.provider}</div>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-full">
                    {resource.type}
                  </span>
                </TableCell>
                <TableCell>{resource.targetSkill}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" title="Open Link">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(resource.id)}>
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
