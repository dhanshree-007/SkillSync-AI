import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Loader } from '../../../components/common/Loader';
import { Briefcase, MapPin, Building2, Calendar, Clock, DollarSign, ArrowLeft, Bookmark, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useToast } from '../../../components/common/Toast';
import api from '../../../services/api';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/student/jobs/${id}`).catch(() => ({
          data: {
            id,
            title: 'Senior Frontend Developer',
            company: 'TechCorp Solutions',
            location: 'San Francisco, CA (Hybrid)',
            type: 'Full-time',
            salary: '$130,000 - $160,000',
            posted: '2 days ago',
            matchScore: 92,
            about: "TechCorp is looking for a Senior Frontend Developer to lead our UI architecture. You'll work on high-traffic consumer facing applications using React and Next.js.",
            requirements: [
              "5+ years of experience with modern JavaScript frameworks (React preferred).",
              "Deep understanding of state management (Redux, Zustand).",
              "Experience with TypeScript and modern tooling (Vite, Webpack).",
              "Strong sense of web design and fundamentals of user experience."
            ],
            missingSkills: ['GraphQL', 'AWS'],
            benefits: ["Medical/Dental/Vision", "401k Match", "Unlimited PTO", "Home Office Stipend"]
          }
        }));
        setJob(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = () => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      setApplied(true);
      addToast('Application submitted successfully!', 'success');
    }, 1500);
  };

  const handleSave = () => addToast('Job saved!', 'success');

  if (loading) return <Loader text="Loading job details..." />;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-brand-500 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Jobs
      </button>

      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                <Building2 className="w-10 h-10 text-slate-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{job.title}</h1>
                <p className="text-lg text-brand-600 dark:text-brand-400 font-medium mb-4">{job.company}</p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> {job.location}</span>
                  <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1.5" /> {job.type}</span>
                  <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1.5" /> {job.salary}</span>
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> {job.posted}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-3 w-full md:w-auto">
              <div className="flex items-center justify-center px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg font-bold border border-emerald-100 dark:border-emerald-800">
                AI Match Score: {job.matchScore}%
              </div>
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1 px-4" onClick={handleSave}>
                  <Bookmark className="w-4 h-4" />
                </Button>
                {applied ? (
                  <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 border-0" disabled>
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Applied
                  </Button>
                ) : (
                  <Button className="flex-1" onClick={handleApply} isLoading={applying}>
                    Apply Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">About the Role</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{job.about}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Requirements</h3>
                <ul className="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-400">
                  {job.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-amber-200 dark:border-amber-900/50">
            <CardContent className="p-6">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center mb-4">
                <ShieldAlert className="w-5 h-5 mr-2 text-amber-500" /> Skill Gaps Identified
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                To increase your chances, consider brushing up on these skills before the interview:
              </p>
              <div className="flex flex-wrap gap-2">
                {job.missingSkills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 text-sm font-medium rounded-md border border-amber-200 dark:border-amber-800/50">
                    {skill}
                  </span>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 text-xs h-8" onClick={() => navigate('/student/roadmap')}>
                Add to Learning Roadmap
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Benefits</h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
