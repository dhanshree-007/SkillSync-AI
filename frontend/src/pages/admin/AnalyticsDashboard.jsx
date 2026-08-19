import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Loader } from '../../components/common/Loader';
import { Doughnut, Line } from 'react-chartjs-2';
import api from '../../services/api';

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading AI/Platform analytics
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) return <Loader text="Loading advanced analytics..." />;

  const userDistributionData = {
    labels: ['Students', 'Recruiters', 'Admins'],
    datasets: [{
      data: [12500, 2900, 20],
      backgroundColor: ['#6366f1', '#10b981', '#f59e0b'],
      borderWidth: 0
    }]
  };

  const aiUsageData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'AI Resume Scans',
      data: [300, 450, 400, 600, 500, 200, 250],
      borderColor: '#ec4899',
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Deep dive into platform usage, AI metrics, and growth.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="h-96 flex flex-col">
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 relative flex items-center justify-center pb-6">
            <Doughnut data={userDistributionData} options={{ responsive: true, maintainAspectRatio: false, cutout: '70%' }} />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2 h-96 flex flex-col">
          <CardHeader>
            <CardTitle>AI Feature Utilization</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 relative pb-6">
            <Line data={aiUsageData} options={{ responsive: true, maintainAspectRatio: false }} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
