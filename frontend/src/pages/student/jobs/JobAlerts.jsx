import React, { useState } from 'react';
import { Card, CardContent } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Bell, Briefcase, Plus, Save } from 'lucide-react';
import { useToast } from '../../../components/common/Toast';

export default function JobAlerts() {
  const { addToast } = useToast();
  const [alerts, setAlerts] = useState([
    { id: 1, keyword: 'React Developer', location: 'Remote', frequency: 'Daily', active: true },
    { id: 2, keyword: 'Frontend Engineer', location: 'New York, NY', frequency: 'Weekly', active: false },
  ]);

  const toggleAlert = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a));
    addToast('Alert status updated', 'success');
  };

  const handleSaveSettings = () => {
    addToast('Alert preferences saved!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Job Alerts</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Get notified when new jobs matching your criteria are posted.</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" /> Create Alert</Button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className={!alert.active ? 'opacity-60' : ''}>
            <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex gap-4 items-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${alert.active ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{alert.keyword}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                    <span>{alert.location}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>{alert.frequency} Digest</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto flex justify-end">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={alert.active} onChange={() => toggleAlert(alert.id)} />
                    <div className={`block w-10 h-6 rounded-full transition-colors ${alert.active ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${alert.active ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                  <div className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {alert.active ? 'Active' : 'Paused'}
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-brand-200 dark:border-brand-900/50">
        <CardContent className="p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Notification Settings</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500" />
              <span className="ml-2 text-slate-700 dark:text-slate-300">Send me emails when AI detects a &gt;90% match for my profile</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500" />
              <span className="ml-2 text-slate-700 dark:text-slate-300">Push notifications for interview requests</span>
            </label>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveSettings}><Save className="w-4 h-4 mr-2" /> Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
