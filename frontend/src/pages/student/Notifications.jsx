import React, { useState } from 'react';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Bell, Briefcase, FileText, CheckCircle, Sparkles } from 'lucide-react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'JOB', title: 'New High-Match Job Posted', message: 'Google just posted a Senior Frontend Engineer role matching 94% of your skills.', time: '2 hours ago', read: false },
    { id: 2, type: 'RESUME', title: 'Resume Analyzed Successfully', message: 'Your ATS score improved to 86%. View full breakdown.', time: '1 day ago', read: false },
    { id: 3, type: 'SYSTEM', title: 'Neural AI Feature Added', message: 'Interactive voice interview repeats and question asking are now active.', time: '3 days ago', read: true },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'JOB': return <Briefcase className="w-5 h-5 text-cyan-400" />;
      case 'RESUME': return <FileText className="w-5 h-5 text-emerald-400" />;
      default: return <Bell className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-[#0B1120] text-slate-100 p-2 sm:p-4 rounded-2xl">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-white flex items-center gap-2">
            <Bell className="w-7 h-7 text-cyan-400" />
            Notifications <span className="text-neural-gradient">Center</span>
          </h1>
          <p className="text-slate-300 text-sm mt-1">Stay updated on your career progress & AI match alerts.</p>
        </div>
        <Button variant="outline" size="sm" onClick={markAllAsRead} className="border-slate-800 text-slate-200 hover:bg-slate-800">
          <CheckCircle className="w-4 h-4 mr-2 text-cyan-400" /> Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-slate-400 font-medium">No new notifications.</div>
        ) : (
          notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`neural-glass-card bg-[#0F172A] border rounded-2xl p-0 transition-all ${
                !notification.read ? 'border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'border-slate-800/60 opacity-75'
              }`}
            >
              <CardContent className="p-5 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#0B1120] border border-slate-800 shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-extrabold text-white text-base">
                      {notification.title}
                    </h4>
                    <span className="text-xs font-mono text-slate-400">{notification.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{notification.message}</p>
                </div>
                {!notification.read && (
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse mt-2"></div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
