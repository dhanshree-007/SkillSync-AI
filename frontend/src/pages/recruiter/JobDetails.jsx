import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { MapPin, DollarSign, Clock, Users, ArrowLeft } from 'lucide-react';
import api from '../../services/api';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/recruiter/jobs/${id}`).catch(() => ({
          data: {
            id,
            title: 'Senior Frontend Developer',
            jobType: 'FULL_TIME',
            location: 'Remote',
            salaryRange: '$100k - $140k',
            experienceLevel: 'SENIOR',
            description: 'We are looking for an experienced frontend engineer to lead our React architecture...',
            skillsRequired: 'React, TypeScript, Redux, Tailwind CSS',
            status: 'ACTIVE',
            applications: 45,
            postedDate: '2023-10-01'
          }
        }));
        setJob(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <Loader text="Loading job details..." />;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-700/50 pb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">{job.title}</h1>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              job.status === 'ACTIVE' 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
            }`}>
              {job.status}
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Posted on {job.postedDate}</p>
        </div>
        
        <div className="ml-auto flex gap-3">
          <Button variant="outline" onClick={() => navigate(`/recruiter/jobs/${id}/edit`)}>Edit Job</Button>
          <Button onClick={() => navigate(`/recruiter/applications?jobId=${id}`)}>
            <Users className="w-4 h-4 mr-2" /> View Applications ({job.applications})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Job Description</h3>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {job.description}
              </p>
              
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skillsRequired.split(',').map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-full font-medium">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Overview</h3>
              
              <div className="flex items-center text-slate-700 dark:text-slate-300">
                <MapPin className="h-5 w-5 mr-3 text-brand-500" />
                <div>
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="font-medium">{job.location}</p>
                </div>
              </div>
              
              <div className="flex items-center text-slate-700 dark:text-slate-300">
                <Clock className="h-5 w-5 mr-3 text-brand-500" />
                <div>
                  <p className="text-xs text-slate-500">Job Type</p>
                  <p className="font-medium">{job.jobType.replace('_', ' ')}</p>
                </div>
              </div>

              <div className="flex items-center text-slate-700 dark:text-slate-300">
                <DollarSign className="h-5 w-5 mr-3 text-brand-500" />
                <div>
                  <p className="text-xs text-slate-500">Salary Range</p>
                  <p className="font-medium">{job.salaryRange}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
