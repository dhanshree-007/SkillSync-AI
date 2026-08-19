import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { ArrowLeft, Download, Mail, Phone, ExternalLink } from 'lucide-react';
import api from '../../services/api';

export default function CandidateDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await api.get(`/recruiter/candidate/${id}`).catch(() => ({
          data: {
            id,
            name: 'Alice Smith',
            email: 'alice@example.com',
            phone: '+1 234 567 890',
            university: 'Stanford University',
            status: 'INTERVIEW',
            appliedFor: 'Senior Frontend Developer',
            atsScore: 92,
            skills: ['React', 'TypeScript', 'Node.js', 'Figma'],
            aiSummary: 'Alice is a strong match for the Senior Frontend Developer role. She has extensive experience in the required tech stack and demonstrates solid architectural understanding. Her resume lacks explicit mention of Redux, but her context in React state management is strong.'
          }
        }));
        setCandidate(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidate();
  }, [id]);

  if (loading) return <Loader text="Loading candidate profile..." />;
  if (!candidate) return <div>Candidate not found.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-700/50 pb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">{candidate.name}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Applied for: <span className="font-medium text-slate-700 dark:text-slate-300">{candidate.appliedFor}</span></p>
        </div>
        <div className="ml-auto flex gap-3">
          <Button variant="outline" className="gap-2"><Mail className="w-4 h-4" /> Email Candidate</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="w-24 h-24 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center text-3xl font-bold text-brand-600 dark:text-brand-400 mb-4">
                  {candidate.name.charAt(0)}
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{candidate.name}</h3>
                <p className="text-sm text-slate-500">{candidate.university}</p>
              </div>
              
              <div className="pt-6 space-y-4">
                <div className="flex items-center text-slate-700 dark:text-slate-300 text-sm">
                  <Mail className="h-4 w-4 mr-3 text-slate-400" /> {candidate.email}
                </div>
                <div className="flex items-center text-slate-700 dark:text-slate-300 text-sm">
                  <Phone className="h-4 w-4 mr-3 text-slate-400" /> {candidate.phone}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <h4 className="text-sm font-semibold text-slate-500 mb-4">ATS Match Score</h4>
              <div className="relative w-32 h-32">
                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" className="text-slate-200 dark:text-slate-700" />
                  <circle 
                    cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" 
                    strokeDasharray={`${(candidate.atsScore / 100) * 283} 283`}
                    className="text-emerald-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">{candidate.atsScore}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                AI Candidate Summary
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed p-4 bg-brand-50 dark:bg-brand-900/10 rounded-xl border border-brand-100 dark:border-brand-900/30">
                {candidate.aiSummary}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Original Resume</h3>
                <p className="text-sm text-slate-500">View or download the candidate's submitted PDF.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline"><ExternalLink className="w-4 h-4 mr-2" /> View</Button>
                <Button><Download className="w-4 h-4 mr-2" /> Download</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
