import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Loader } from '../../components/common/Loader';
import { Button } from '../../components/common/Button';
import { Radar, Doughnut } from 'react-chartjs-2';
import { CheckCircle2, XCircle, ArrowRight, Sparkles, Target, Zap, UploadCloud, History, FileText, ChevronDown } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getStoredResumes } from '../../utils/resumeStorage';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ArcElement);

export default function AtsScore() {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const history = getStoredResumes();
    setResumes(history);

    // Check if query param specifies an ID (e.g. /student/ats?id=123)
    const paramId = searchParams.get('id');
    if (paramId && history.some(r => String(r.id) === String(paramId))) {
      setSelectedResumeId(paramId);
    } else if (history.length > 0) {
      setSelectedResumeId(history[0].id);
    }

    setLoading(false);
  }, [searchParams]);

  if (loading) return <Loader text="Generating ATS deep dive..." />;

  // Selected Resume or fallback empty object
  const activeResume = resumes.find(r => String(r.id) === String(selectedResumeId)) || null;

  // Doughnut Chart Configuration
  const doughnutScore = activeResume ? activeResume.atsScore : 0;
  const doughnutData = {
    labels: ['ATS Score', 'Gap'],
    datasets: [{
      data: [doughnutScore, 100 - doughnutScore],
      backgroundColor: activeResume ? ['#72936A', '#E2E6DF'] : ['#D2D8CF', '#ECEEEA'],
      borderWidth: 0,
    }]
  };

  // Radar Chart Metrics
  const metrics = activeResume?.metrics || { impact: 0, brevity: 0, style: 0, sections: 0, keywords: 0 };
  const radarData = {
    labels: ['Impact', 'Brevity', 'Style', 'Sections', 'Keywords'],
    datasets: [{
      label: activeResume ? activeResume.fileName : 'Your Score',
      data: [metrics.impact, metrics.brevity, metrics.style, metrics.sections, metrics.keywords],
      backgroundColor: 'rgba(114, 147, 106, 0.25)',
      borderColor: '#72936A',
      borderWidth: 2.5,
      pointBackgroundColor: '#9BC744',
    }, {
      label: 'Target Benchmark',
      data: [85, 80, 80, 100, 90],
      backgroundColor: 'rgba(148, 163, 184, 0.08)',
      borderColor: 'rgba(148, 163, 184, 0.4)',
      borderDash: [4, 4],
      borderWidth: 1.5,
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
    }]
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Top Header & ChatGPT-Style Resume History Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-[#D2D8CF] shadow-sm">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-[#1E2B21] flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-[#72936A]" />
            ATS Score Deep Analysis
          </h1>
          <p className="text-[#506153] text-sm mt-1 font-medium">
            Accurate evaluation engine parsing your candidate profile.
          </p>
        </div>

        {/* Action Controls & ChatGPT-Style History Dropdown */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {resumes.length > 0 && (
            <div className="relative flex items-center gap-2 bg-[#ECEEEA] px-3.5 py-2 rounded-xl border border-[#D2D8CF] text-xs font-bold text-[#1E2B21]">
              <History className="w-4 h-4 text-[#72936A]" />
              <select
                value={selectedResumeId || ''}
                onChange={(e) => setSelectedResumeId(e.target.value)}
                className="bg-transparent font-extrabold text-[#1E2B21] cursor-pointer focus:outline-none pr-2"
              >
                {resumes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.fileName} ({r.atsScore}% Match - {r.uploadedAt})
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button 
            onClick={() => navigate('/student/resume/upload')} 
            className="btn-primary text-xs font-extrabold px-4 py-2 flex items-center gap-2 shadow-sm"
          >
            <UploadCloud className="w-4 h-4" /> Upload New Resume
          </Button>
        </div>
      </div>

      {/* 🔴 IF NO RESUME UPLOADED YET (SHOW 0% ACCURATE STATE) */}
      {!activeResume ? (
        <Card className="glass-card-3d border border-[#D2D8CF] rounded-3xl p-12 text-center max-w-2xl mx-auto space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl icon-tile-3d-sage flex items-center justify-center text-[#4A6E42] shadow-sm">
            <FileText className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-[#1E2B21]">No Resume Analyzed Yet</h2>
            <p className="text-[#506153] text-sm font-medium leading-relaxed max-w-md mx-auto">
              Upload your candidate resume PDF to run real-time ATS scoring, keyword extraction, and skill gap analysis. Your results and history will be saved here.
            </p>
          </div>
          <Button 
            onClick={() => navigate('/student/resume/upload')} 
            className="btn-primary px-8 py-3 rounded-full text-sm font-extrabold inline-flex items-center gap-2 shadow-md"
          >
            <UploadCloud className="w-4 h-4" /> Upload Resume Now <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>
      ) : (
        <>
          {/* Active Resume Info Bar */}
          <div className="bg-[#9BC744]/15 border border-[#9BC744]/40 px-4 py-2.5 rounded-xl flex items-center justify-between text-xs font-bold text-[#1E2B21]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#4D7314]" />
              <span>Viewing Report For: <strong className="text-[#3C5B10] font-extrabold">{activeResume.fileName}</strong></span>
            </div>
            <span className="text-[#506153] font-mono">Analyzed on {activeResume.uploadedAt}</span>
          </div>

          {/* Score Overview & Radar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Circular Score Card */}
            <Card className="glass-card-3d flex flex-col items-center justify-center p-8 border border-[#72936A]/40 rounded-2xl relative overflow-hidden">
              <h3 className="font-extrabold text-xs text-[#4A6E42] uppercase tracking-widest mb-6 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#72936A]" /> Overall Match Score
              </h3>
              
              <div className="relative w-48 h-48 flex items-center justify-center">
                <Doughnut 
                  data={doughnutData} 
                  options={{ cutout: '82%', plugins: { tooltip: { enabled: false }, legend: { display: false } } }} 
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-extrabold text-[#1E2B21] tracking-tight">
                    {doughnutScore}%
                  </span>
                  <span className="text-xs text-[#506153] font-extrabold tracking-wider uppercase mt-1">ATS Verified</span>
                </div>
              </div>

              <div className={`mt-6 px-4 py-1.5 rounded-full text-xs font-extrabold border ${
                doughnutScore >= 80 ? 'bg-[#9BC744]/20 border-[#9BC744]/50 text-[#3C5B10]' :
                doughnutScore >= 60 ? 'bg-[#F0C465]/20 border-[#F0C465]/50 text-[#946914]' :
                'bg-rose-100 border-rose-300 text-rose-700'
              }`}>
                {doughnutScore >= 80 ? '⚡ Strong Candidate Match' : doughnutScore >= 60 ? '⚠️ Moderate Match (Gaps Detected)' : '🚨 Needs Optimization'}
              </div>
            </Card>

            {/* Performance Radar Breakdown */}
            <Card className="glass-card-3d md:col-span-2 border border-[#D2D8CF] rounded-2xl p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg font-extrabold text-[#1E2B21] flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#4A6E42]" /> Multi-Metric Performance Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="h-72 p-0 relative">
                <Radar 
                  data={radarData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false, 
                    scales: { 
                      r: { 
                        min: 0, 
                        max: 100, 
                        ticks: { display: false },
                        grid: { color: 'rgba(114, 147, 106, 0.2)' },
                        angleLines: { color: 'rgba(114, 147, 106, 0.2)' },
                        pointLabels: { color: '#1E2B21', font: { size: 12, weight: 'bold' } }
                      } 
                    } 
                  }} 
                />
              </CardContent>
            </Card>
          </div>

          {/* Matched vs Missing Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Matched Skills Card */}
            <Card className="glass-card-3d border border-[#D2D8CF] rounded-2xl p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center text-[#3C5B10] text-base font-extrabold">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-[#4A6E42]" /> Matched Skills (Detected)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <p className="text-xs text-[#506153] font-medium">Skills successfully identified in your resume document:</p>
                <div className="flex flex-wrap gap-2">
                  {activeResume.matchedSkills?.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-[#9BC744]/20 border border-[#9BC744]/40 text-[#3C5B10] rounded-lg text-xs font-bold">
                      ✓ {skill}
                    </span>
                  ))}
                </div>

                <div className="border-t border-[#D2D8CF] pt-4 mt-4 space-y-2">
                  <h4 className="text-xs font-extrabold text-[#506153] uppercase tracking-wider">Document Strengths:</h4>
                  <ul className="space-y-2 text-xs text-[#1E2B21] font-semibold">
                    {activeResume.strengths?.map((str, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4A6E42] mt-1.5 mr-2 shrink-0"></span>
                        {str}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Missing Skills Card */}
            <Card className="glass-card-3d border border-[#D2D8CF] rounded-2xl p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center text-[#946914] text-base font-extrabold">
                  <XCircle className="w-5 h-5 mr-2 text-[#946914]" /> Missing Skills (Recommended)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <p className="text-xs text-[#506153] font-medium">Key industry keywords missing from your candidate resume:</p>
                <div className="flex flex-wrap gap-2">
                  {activeResume.missingSkills?.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-[#F0C465]/20 border border-[#F0C465]/40 text-[#946914] rounded-lg text-xs font-bold">
                      ✕ {skill}
                    </span>
                  ))}
                </div>

                <div className="border-t border-[#D2D8CF] pt-4 mt-4 space-y-2">
                  <h4 className="text-xs font-extrabold text-[#506153] uppercase tracking-wider">Optimization Areas:</h4>
                  <ul className="space-y-2 text-xs text-[#1E2B21] font-semibold">
                    {activeResume.weaknesses?.map((wk, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#946914] mt-1.5 mr-2 shrink-0"></span>
                        {wk}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

          </div>
        </>
      )}
    </div>
  );
}
