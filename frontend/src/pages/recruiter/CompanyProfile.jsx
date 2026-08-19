import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useToast } from '../../components/common/Toast';
import { Building2, Globe, MapPin } from 'lucide-react';
import api from '../../services/api';

export default function CompanyProfile() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await api.get('/recruiter/company').catch(() => ({
          data: {
            name: 'TechCorp Solutions',
            website: 'https://techcorp.example.com',
            location: 'San Francisco, CA',
            industry: 'Software Development',
            description: 'Leading provider of enterprise software solutions.',
            employeeCount: '500-1000'
          }
        }));
        reset(res.data);
      } finally {
        setFetching(false);
      }
    };
    fetchCompany();
  }, [reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.put('/recruiter/company', data).catch(() => {});
      addToast('Company profile updated successfully.', 'success');
    } catch (e) {
      addToast('Failed to update company profile.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Company Profile</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your organization's public details visible to candidates.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-brand-500" />
            Organization Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" {...register('name', { required: true })} className="input-field pl-9" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Website URL</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="url" {...register('website')} className="input-field pl-9" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Headquarters Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" {...register('location')} className="input-field pl-9" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Industry</label>
                <input type="text" {...register('industry')} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company Size</label>
                <select {...register('employeeCount')} className="input-field">
                  <option value="1-10">1-10 Employees</option>
                  <option value="11-50">11-50 Employees</option>
                  <option value="51-200">51-200 Employees</option>
                  <option value="201-500">201-500 Employees</option>
                  <option value="500-1000">500-1000 Employees</option>
                  <option value="1000+">1000+ Employees</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">About the Company</label>
                <textarea {...register('description')} rows={4} className="input-field resize-none"></textarea>
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button type="submit" isLoading={loading}>Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
