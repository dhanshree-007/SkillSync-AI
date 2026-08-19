import React, { useState } from 'react';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Bell, Users, Target, CheckCircle } from 'lucide-react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'APPLICATION', title: 'New High-Match Application', message: 'Alice Smith (92% Match) applied for Senior Frontend Developer.', time: '1 hour ago', read: false },
    { id: 2, type: 'SYSTEM', title: 'Job Expiring Soon', message: 'Your posting for Backend Engineer will expire in 3 days.', time: '5 hours ago', read: false },
    { id: 3, type: 'INTERVIEW', title: 'Interview Accepted', message: 'Charlie Brown confirmed the technical interview for Tuesday.', time: '1 day ago', read: true },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'APPLICATION': return <Users className="w-5 h-5 text-emerald-500" />;
      case 'INTERVIEW': return <Target className="w-5 h-5 text-brand-500" />;
      default: return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-700/50 pb-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Recruiter Notifications</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Updates on your candidates and job postings.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
          <CheckCircle className="w-4 h-4 mr-2" /> Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No new notifications.</div>
        ) : (
          notifications.map((notification) => (
            <Card key={notification.id} className={`transition-all ${!notification.read ? 'border-brand-500/50 bg-brand-50/30 dark:bg-brand-900/10' : 'opacity-70'}`}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className={`p-2 rounded-lg ${!notification.read ? 'bg-white dark:bg-slate-800 shadow-sm' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`font-semibold ${!notification.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs font-medium text-slate-500">{notification.time}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{notification.message}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-brand-500 mt-2"></div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
