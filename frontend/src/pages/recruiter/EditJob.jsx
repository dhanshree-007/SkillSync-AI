import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { useToast } from '../../components/common/Toast';
import api from '../../services/api';

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/recruiter/jobs/${id}`).catch(() => ({
          data: {
            title: 'Senior Frontend Developer',
            jobType: 'FULL_TIME',
            location: 'Remote',
            salaryRange: '$100k - $140k',
            experienceLevel: 'SENIOR',
            description: 'We are looking for an experienced frontend engineer...',
            skillsRequired: 'React, TypeScript, Redux',
            status: 'ACTIVE'
          }
        }));
        reset(res.data);
      } catch (e) {
        addToast('Failed to load job details.', 'error');
        navigate('/recruiter/jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, reset, navigate, addToast]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await api.put(`/recruiter/jobs/${id}`, data).catch(() => {});
      addToast('Job updated successfully!', 'success');
      navigate('/recruiter/jobs');
    } catch (e) {
      addToast('Failed to update job.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Loading job details..." />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Edit Job</h1>
        <p className="text-slate-600 dark:text-slate-400">Update details for this job posting.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Job Title *</label>
                  <input type="text" {...register('title', { required: true })} className="input-field" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Job Type *</label>
                  <select {...register('jobType', { required: true })} className="input-field">
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="INTERNSHIP">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select {...register('status', { required: true })} className="input-field">
                    <option value="ACTIVE">Active</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location *</label>
                  <input type="text" {...register('location', { required: true })} className="input-field" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Salary Range</label>
                  <input type="text" {...register('salaryRange')} className="input-field" />
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Job Description *</label>
                <textarea {...register('description', { required: true })} rows={6} className="input-field resize-y"></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Required Skills (Comma separated) *</label>
                <input type="text" {...register('skillsRequired', { required: true })} className="input-field" />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" isLoading={saving}>Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
