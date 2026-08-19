import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { Loader } from '../../components/common/Loader';
import { Line, Doughnut } from 'react-chartjs-2';
import api from '../../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

export default function DashboardHome() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/recruiter/dashboard').catch(() => ({
          data: {
            activeJobs: 12,
            totalApplications: 345,
            interviewsScheduled: 28,
            newCandidates: 45
          }
        }));
        setData(response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader text="Loading Recruiter Dashboard..." />;

  const applicationTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Applications Received',
      data: [12, 19, 15, 25, 22, 10, 14],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const statusDistributionData = {
    labels: ['Pending', 'Interviewing', 'Rejected', 'Hired'],
    datasets: [{
      data: [150, 45, 120, 30],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(16, 185, 129, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-slate-900 dark:text-white">
          Recruiter Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Welcome back, {user?.fullName || 'Recruiter'}. Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Active Jobs", value: data?.activeJobs || 0, color: "text-brand-500" },
          { title: "Total Applications", value: data?.totalApplications || 0, color: "text-secondary-500" },
          { title: "Interviews Scheduled", value: data?.interviewsScheduled || 0, color: "text-amber-500" },
          { title: "New Candidates (This Week)", value: data?.newCandidates || 0, color: "text-emerald-500" }
        ].map((kpi, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{kpi.title}</p>
              <h3 className={`text-3xl font-bold mt-2 ${kpi.color}`}>{kpi.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 h-96 flex flex-col">
          <CardHeader>
            <CardTitle>Application Trends</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 relative">
            <Line data={applicationTrendData} options={{ responsive: true, maintainAspectRatio: false }} />
          </CardContent>
        </Card>
        
        <Card className="h-96 flex flex-col">
          <CardHeader>
            <CardTitle>Pipeline Status</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 relative flex items-center justify-center">
            <Doughnut data={statusDistributionData} options={{ responsive: true, maintainAspectRatio: false, cutout: '70%' }} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
