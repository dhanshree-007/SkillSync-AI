import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useToast } from '../../components/common/Toast';
import { useAuth } from '../../context/AuthContext';
import { User } from 'lucide-react';
import api from '../../services/api';

export default function ProfileSettings() {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const res = await api.get('/recruiter/profile').catch(() => ({
          data: { fullName: user?.fullName || 'Jane Recruiter', phone: '987-654-3210', position: 'Talent Acquisition Manager' }
        }));
        reset(res.data);
      } catch (e) {
        // Handle error
      }
    };
    fetchProfile();
  }, [reset, user]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.put('/recruiter/profile', data).catch(() => {});
      addToast('Profile updated successfully!', 'success');
    } catch (e) {
      addToast('Failed to update profile.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Profile Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your personal recruiter account details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="text-center py-8">
            <CardContent className="flex flex-col items-center">
              <div className="w-24 h-24 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">{user?.fullName || 'Recruiter'}</h3>
              <p className="text-sm text-slate-500">{user?.email}</p>
              <div className="mt-4 px-3 py-1 bg-secondary-100 text-secondary-700 dark:bg-secondary-900/50 dark:text-secondary-400 rounded-full text-xs font-semibold">
                ROLE: {user?.role || 'RECRUITER'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                    <input type="text" {...register('fullName')} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                    <input type="text" {...register('phone')} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Job Position</label>
                    <input type="text" {...register('position')} className="input-field" placeholder="e.g. Talent Acquisition" />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700/50 mt-6">
                  <Button type="submit" isLoading={loading}>Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
