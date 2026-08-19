import React, { useState } from 'react';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Bell, ShieldAlert, Users, CheckCircle } from 'lucide-react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'ALERT', title: 'High API Usage Detected', message: 'Gemini AI API usage exceeded 90% of quota.', time: '10 mins ago', read: false },
    { id: 2, type: 'USER', title: 'New Corporate Account', message: 'NextGen Tech requested verification.', time: '2 hours ago', read: false },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'ALERT': return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'USER': return <Users className="w-5 h-5 text-brand-500" />;
      default: return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-700/50 pb-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">System Notifications</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Platform-level alerts and updates.</p>
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
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
