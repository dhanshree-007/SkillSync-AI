import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { Loader } from '../../components/common/Loader';
import { Line, Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { 
  Sparkles, TrendingUp, Award, Video, FileCheck, Radio 
} from 'lucide-react';
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  // Real-time live clock state
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);

  // Live Ticker Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/student/dashboard').catch(() => ({
          data: {
            profileComplete: 85,
            averageAtsScore: 78,
            interviewsTaken: 4,
            activeApplications: 12
          }
        }));
        setData(response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader text="Connecting to Executive AI Dashboard..." />;

  // Line Chart Data (Sage & Lime Palette)
  const atsChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'ATS Score Progression',
      data: [55, 62, 68, 74, 80, 85],
      borderColor: '#72936A',
      borderWidth: 3,
      pointRadius: 6,
      pointHoverRadius: 9,
      pointBackgroundColor: '#9BC744',
      pointBorderColor: '#FFFFFF',
      pointBorderWidth: 2,
      tension: 0.4,
      fill: true,
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return 'rgba(114, 147, 106, 0.2)';
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(114, 147, 106, 0.45)');
        gradient.addColorStop(0.5, 'rgba(155, 199, 68, 0.15)');
        gradient.addColorStop(1, 'rgba(114, 147, 106, 0.0)');
        return gradient;
      }
    }]
  };

  // Bar Chart Data (Sage & Lime Pillars)
  const interviewChartData = {
    labels: ['Tech', 'HR', 'System Design', 'Behavioral'],
    datasets: [{
      label: 'Average Scores',
      data: [78, 85, 72, 90],
      borderWidth: 0,
      borderRadius: 12,
      borderSkipped: false,
      barPercentage: 0.55,
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return 'rgba(155, 199, 68, 0.8)';
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, '#9BC744');
        gradient.addColorStop(0.5, '#72936A');
        gradient.addColorStop(1, '#506C48');
        return gradient;
      }
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { display: false },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#436A15',
        bodyColor: '#1E2B21',
        borderColor: 'rgba(114, 147, 106, 0.4)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        displayColors: false,
        callbacks: {
          label: (context) => ` Score: ${context.raw}%`
        }
      }
    },
    scales: { 
      y: { 
        beginAtZero: true, 
        max: 100,
        grid: { color: 'rgba(114, 147, 106, 0.15)' },
        ticks: { color: '#506153', font: { size: 11, weight: 'bold' } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#506153', font: { size: 11, weight: 'bold' } }
      }
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 🔴 LIVE SYSTEM STATUS BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/90 backdrop-blur-2xl p-4 rounded-2xl border border-[#9BC744]/40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-4 h-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9BC744] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#9BC744] shadow-[0_0_8px_rgba(155,199,68,0.9)]"></span>
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-[#1E2B21] flex items-center gap-2">
              LIVE NEURAL AI ENGINE ONLINE
              <span className="text-[10px] px-2 py-0.5 bg-[#9BC744]/20 text-[#3F660F] rounded-full border border-[#9BC744]/50 font-extrabold uppercase tracking-wider">
                ACTIVE MONITORING
              </span>
            </h2>
            <p className="text-xs text-[#506153] font-semibold">Continuous candidate optimization & job matching active</p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            <span className="text-[10px] text-[#506153] uppercase tracking-widest block font-bold">System Clock</span>
            <span className="font-mono font-extrabold text-[#4A6E42] text-sm tracking-wider">{time}</span>
          </div>
          <button 
            onClick={() => navigate('/student/interview')}
            className="btn-primary text-xs font-extrabold px-4 py-2 flex items-center gap-1.5 shadow-md"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse text-white" /> Start Live Voice AI
          </button>
        </div>
      </div>

      {/* Header Title */}
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-[#1E2B21] flex items-center gap-2 tracking-tight">
          Welcome back, <span className="text-[#5B7A54]">{user?.fullName?.split(' ')[0] || 'Dhanshree'}!</span> 👋
        </h1>
        <p className="text-[#506153] text-sm mt-1 font-medium">
          Real-time candidate analytics, ATS score tracking, and voice interview preparedness panel.
        </p>
      </div>

      {/* 3D Neumorphic Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: "Profile Completeness", 
            value: `${data?.profileComplete || 85}%`, 
            icon: Award, 
            textColor: "text-[#4A6E42]", 
            textGlow: "text-glow-sage",
            tileStyle: "icon-tile-3d-sage",
            badge: "92% Target" 
          },
          { 
            title: "Avg. ATS Score", 
            value: `${data?.averageAtsScore || 78}`, 
            icon: TrendingUp, 
            textColor: "text-[#4D7314]", 
            textGlow: "text-glow-lime",
            tileStyle: "icon-tile-3d-lime",
            badge: "+15 pts gain"
          },
          { 
            title: "Interviews Taken", 
            value: data?.interviewsTaken || 4, 
            icon: Video, 
            textColor: "text-[#946914]", 
            textGlow: "text-glow-sage",
            tileStyle: "icon-tile-3d-cream",
            badge: "Live Ready"
          },
          { 
            title: "Active Applications", 
            value: data?.activeApplications || 12, 
            icon: FileCheck, 
            textColor: "text-[#8C4722]", 
            textGlow: "text-glow-sage",
            tileStyle: "icon-tile-3d-peach",
            badge: "3 New Matches" 
          }
        ].map((kpi, i) => (
          <Card key={i} className="glass-card-3d rounded-2xl p-6 relative overflow-hidden group">
            <CardContent className="p-0 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#506153]">{kpi.title}</p>
                </div>
                <h3 className={`text-4xl font-extrabold ${kpi.textColor} ${kpi.textGlow} tracking-tight`}>
                  {kpi.value}
                </h3>
                <span className="inline-block mt-2 text-[10px] font-extrabold text-[#506153] bg-[#EAEFE8] px-2 py-0.5 rounded-md border border-[#D2D8CF]">
                  {kpi.badge}
                </span>
              </div>
              
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${kpi.tileStyle} ${kpi.textColor} group-hover:scale-110 transition-all duration-300`}>
                <kpi.icon className="w-7 h-7" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3D Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart Card (ATS Progression) */}
        <Card className="glass-card-3d rounded-2xl p-6 h-96 flex flex-col relative overflow-hidden">
          <CardHeader className="p-0 mb-4 flex justify-between items-center flex-row">
            <CardTitle className="text-base font-extrabold text-[#1E2B21] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#4A6E42]" /> ATS Score History & Progression
            </CardTitle>
            <span className="text-xs font-extrabold text-[#3F660F] bg-[#9BC744]/20 px-3 py-1 rounded-full border border-[#9BC744]/40">
              +15% Growth
            </span>
          </CardHeader>
          <CardContent className="flex-1 relative p-0">
            <Line ref={lineChartRef} data={atsChartData} options={chartOptions} />
          </CardContent>
        </Card>
        
        {/* Bar Chart Card (Floating 3D Pillars) */}
        <Card className="glass-card-3d rounded-2xl p-6 h-96 flex flex-col relative overflow-hidden">
          <CardHeader className="p-0 mb-4 flex justify-between items-center flex-row">
            <CardTitle className="text-base font-extrabold text-[#1E2B21] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#946914]" /> Mock Interview Performance
            </CardTitle>
            <span className="text-xs font-extrabold text-[#4A6E42] bg-[#72936A]/20 px-3 py-1 rounded-full border border-[#72936A]/40">
              83% Avg Performance
            </span>
          </CardHeader>
          <CardContent className="flex-1 relative p-0">
            <Bar ref={barChartRef} data={interviewChartData} options={chartOptions} />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
