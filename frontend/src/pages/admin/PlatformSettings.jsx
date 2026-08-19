import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useToast } from '../../components/common/Toast';
import { Settings, Save } from 'lucide-react';

export default function PlatformSettings() {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      addToast('Platform settings saved successfully', 'success');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Platform Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Configure global application variables and limits.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2 text-brand-500" /> General Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Platform Name</label>
                <input type="text" defaultValue="SkillSync AI" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Support Email</label>
                <input type="email" defaultValue="support@skillsync.ai" className="input-field" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Maintenance Mode</label>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="maintenance" className="w-4 h-4 text-brand-600 rounded border-slate-300" />
                  <label htmlFor="maintenance" className="text-sm text-slate-600 dark:text-slate-400">Enable maintenance mode (locks out non-admins)</label>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pt-6 pb-2">API Configuration</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gemini AI API Key (Masked)</label>
                <input type="password" defaultValue="************************" className="input-field" />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button type="submit" isLoading={loading}><Save className="w-4 h-4 mr-2" /> Save Settings</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
