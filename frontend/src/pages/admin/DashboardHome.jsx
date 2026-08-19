import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { Loader } from '../../components/common/Loader';
import { Line, Bar } from 'react-chartjs-2';
import api from '../../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

export default function DashboardHome() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/dashboard').catch(() => ({
          data: {
            totalUsers: 15420,
            activeJobs: 1240,
            totalApplications: 45000,
            revenue: '$12,450'
          }
        }));
        setStats(response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader text="Loading Admin Dashboard..." />;

  const growthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'New Users',
      data: [1200, 1900, 1500, 2500, 2200, 3100, 4000],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Revenue ($)',
      data: [5000, 7500, 6000, 9000, 11000, 10500, 12450],
      backgroundColor: '#10b981',
      borderRadius: 4
    }]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Welcome, {user?.fullName || 'Admin'}. Here is the platform overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: stats?.totalUsers || 0, color: "text-brand-500" },
          { title: "Active Jobs", value: stats?.activeJobs || 0, color: "text-amber-500" },
          { title: "Total Applications", value: stats?.totalApplications || 0, color: "text-secondary-500" },
          { title: "Platform Revenue", value: stats?.revenue || '$0', color: "text-emerald-500" }
        ].map((kpi, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{kpi.title}</p>
              <h3 className={`text-3xl font-bold mt-2 ${kpi.color}`}>
                {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-96 flex flex-col">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 relative">
            <Line data={growthData} options={{ responsive: true, maintainAspectRatio: false }} />
          </CardContent>
        </Card>
        
        <Card className="h-96 flex flex-col">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 relative pb-4">
            <Bar data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
