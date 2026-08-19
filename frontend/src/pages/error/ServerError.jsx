import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { ServerCrash } from 'lucide-react';

export default function ServerError() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <ServerCrash className="w-10 h-10" />
        </div>
        <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-4">500</h1>
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-6">Internal Server Error</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Something went wrong on our end. We're actively working to fix this issue.</p>
        <Button onClick={() => navigate('/login')}>Return to Login</Button>
      </div>
    </div>
  );
}
