import React from 'react';
import { Card, CardContent } from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { Shield } from 'lucide-react';

export default function AdminProfile() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Admin Profile</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your administrative credentials.</p>
      </div>

      <Card className="text-center py-12">
        <CardContent className="flex flex-col items-center">
          <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">{user?.fullName || 'Super Admin'}</h3>
          <p className="text-slate-500 mt-1">{user?.email || 'admin@skillsync.ai'}</p>
          <div className="mt-6 px-4 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400 rounded-full text-sm font-bold tracking-wider">
            SYSTEM ADMINISTRATOR
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
