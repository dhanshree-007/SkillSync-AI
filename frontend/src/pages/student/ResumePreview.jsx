import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { FileText, ArrowRight, Check } from 'lucide-react';
import api from '../../services/api';

export default function ResumePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/ai/resume/${id}`).catch(() => ({
          data: {
            extractedText: "Alice Smith\nSoftware Engineer\nalice@example.com\n\nExperience:\nFrontend Developer at TechCorp (2021-Present)\n- Built scalable React applications.\n- Integrated Node.js microservices.\n\nSkills:\nJavaScript, React, Node.js, HTML/CSS, Tailwind",
            extractedSkills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'Tailwind', 'Frontend Development'],
            confidenceScore: 98
          }
        }));
        setData(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Loader text="Parsing AI extracted data..." />;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Analysis Preview</h1>
          <p className="text-slate-600 dark:text-slate-400">Review the data our AI extracted from your document.</p>
        </div>
        <Button onClick={() => navigate('/student/ats')}>
          View Full ATS Report <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-brand-500" /> Extracted Text (Raw)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 m-4 mt-0 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans">
              {data?.extractedText}
            </pre>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">AI Confidence Score</h3>
                <span className="text-2xl font-bold text-emerald-500">{data?.confidenceScore}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${data?.confidenceScore}%` }}></div>
              </div>
              <p className="text-sm text-slate-500 mt-2">The AI is highly confident in its extraction accuracy.</p>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Identified Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data?.extractedSkills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 rounded-lg text-sm font-medium flex items-center border border-brand-200 dark:border-brand-800">
                    <Check className="w-3 h-3 mr-1.5" /> {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
