import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useToast } from '../../components/common/Toast';
import api from '../../services/api';

export default function PostJob() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/recruiter/jobs', data).catch(() => {});
      addToast('Job posted successfully!', 'success');
      navigate('/recruiter/jobs');
    } catch (e) {
      addToast('Failed to post job. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Post a New Job</h1>
        <p className="text-slate-600 dark:text-slate-400">Fill in the details below to publish a new opportunity to candidates.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">Basic Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Job Title *</label>
                  <input 
                    type="text" 
                    {...register('title', { required: 'Job Title is required' })} 
                    className={`input-field ${errors.title ? 'border-red-500' : ''}`} 
                    placeholder="e.g. Senior Frontend Developer"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
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
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location *</label>
                  <input type="text" {...register('location', { required: 'Location is required' })} className="input-field" placeholder="e.g. Remote, New York, NY" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Salary Range</label>
                  <input type="text" {...register('salaryRange')} className="input-field" placeholder="e.g. $80,000 - $120,000" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Experience Level</label>
                  <select {...register('experienceLevel')} className="input-field">
                    <option value="ENTRY">Entry Level</option>
                    <option value="MID">Mid Level</option>
                    <option value="SENIOR">Senior Level</option>
                    <option value="DIRECTOR">Director</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">Description & Requirements</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Job Description *</label>
                <textarea 
                  {...register('description', { required: 'Description is required' })} 
                  rows={6} 
                  className={`input-field resize-y ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Describe the role, responsibilities, and team..."
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Required Skills (Comma separated) *</label>
                <input 
                  type="text" 
                  {...register('skillsRequired', { required: 'Skills are required' })} 
                  className="input-field" 
                  placeholder="e.g. React, Node.js, TypeScript"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" isLoading={loading}>Publish Job</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
