import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/common/Table';
import { Loader } from '../../components/common/Loader';
import { useToast } from '../../components/common/Toast';
import { Eye, Trash2, UploadCloud, FileText, AlertTriangle, ArrowRight, BarChart2 } from 'lucide-react';
import { getStoredResumes, deleteStoredResume, clearAllStoredResumes } from '../../utils/resumeStorage';

import ResumeViewerModal from '../../components/common/ResumeViewerModal';

export default function ResumeHistory() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const loadHistory = () => {
    setLoading(true);
    setTimeout(() => {
      const data = getStoredResumes();
      setResumes(data);
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleOpenViewer = (resume) => {
    setSelectedResume(resume);
    setIsViewerOpen(true);
  };

  const handleViewAnalysis = (id) => {
    navigate(`/student/ats?id=${id}`);
  };

  const handleDeleteOne = (id, fileName) => {
    const updated = deleteStoredResume(id);
    setResumes(updated);
    addToast(`Deleted "${fileName}" from history`, 'success');
  };

  const handleClearAll = () => {
    const updated = clearAllStoredResumes();
    setResumes(updated);
    setShowClearConfirm(false);
    addToast('All resume history deleted', 'info');
  };

  if (loading) return <Loader text="Loading your resume history..." />;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-[#D2D8CF] shadow-sm">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#1E2B21] flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#72936A]" />
            Resume History & Analysis Log
          </h1>
          <p className="text-[#506153] text-sm mt-1 font-medium">
            View, inspect, or remove your uploaded candidate resumes and historical ATS reports.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button 
            onClick={() => navigate('/student/resume/upload')} 
            className="btn-primary flex-1 sm:flex-initial text-xs font-extrabold px-4 py-2 flex items-center gap-2 shadow-sm"
          >
            <UploadCloud className="w-4 h-4" /> Upload New Resume
          </Button>

          {resumes.length > 0 && (
            <Button 
              variant="outline"
              onClick={() => setShowClearConfirm(!showClearConfirm)}
              className="text-rose-600 border-rose-200 hover:bg-rose-50 text-xs font-bold"
            >
              <Trash2 className="w-4 h-4 mr-1" /> Delete All
            </Button>
          )}
        </div>
      </div>

      {/* Delete All Confirmation Dialog Banner */}
      {showClearConfirm && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
            <div>
              <h4 className="font-extrabold text-sm text-rose-900">Confirm History Clear</h4>
              <p className="text-xs text-rose-700 font-medium">Are you sure you want to delete all resume records? This cannot be undone.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowClearConfirm(false)}>Cancel</Button>
            <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold" onClick={handleClearAll}>
              Yes, Delete All
            </Button>
          </div>
        </div>
      )}

      {/* Main Resume History Table */}
      <Card className="glass-card-3d p-0 overflow-hidden border border-[#D2D8CF] shadow-lg rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#ECEEEA]/80 border-b border-[#D2D8CF]">
              <TableHead className="font-extrabold text-[#1E2B21]">Resume File</TableHead>
              <TableHead className="font-extrabold text-[#1E2B21]">ATS Score</TableHead>
              <TableHead className="font-extrabold text-[#1E2B21]">Date Uploaded</TableHead>
              <TableHead className="text-right font-extrabold text-[#1E2B21]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resumes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-[#506153]">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <FileText className="w-12 h-12 text-[#72936A]/50" />
                    <p className="font-extrabold text-[#1E2B21]">No resumes found in history</p>
                    <p className="text-xs text-[#506153] max-w-sm font-medium">Upload a resume to get instant ATS scoring, skill gap analysis, and AI recommendations.</p>
                    <Button onClick={() => navigate('/student/resume/upload')} className="btn-primary mt-2">
                      <UploadCloud className="w-4 h-4 mr-2" /> Upload Resume Now
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              resumes.map((resume) => (
                <TableRow key={resume.id} className="hover:bg-[#ECEEEA]/40 transition-colors border-b border-[#D2D8CF]/60">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg icon-tile-3d-sage text-[#4A6E42] flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-extrabold text-[#1E2B21] block">{resume.fileName}</span>
                        <span className="text-xs text-[#506153]">PDF Document</span>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold border ${
                      resume.atsScore >= 80 ? 'bg-[#9BC744]/20 text-[#3C5B10] border-[#9BC744]/40' :
                      resume.atsScore >= 60 ? 'bg-[#F0C465]/20 text-[#946914] border-[#F0C465]/40' :
                      'bg-rose-100 text-rose-700 border-rose-200'
                    }`}>
                      {resume.atsScore}% Match
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-[#506153] text-xs font-mono font-bold">
                    {resume.uploadedAt}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewAnalysis(resume.id)}
                        className="text-[#4A6E42] hover:bg-[#72936A]/10 font-bold text-xs"
                        title="View Full ATS Report"
                      >
                        <BarChart2 className="h-4 w-4 mr-1 text-[#72936A]" /> View ATS Report
                      </Button>

                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleOpenViewer(resume)}
                        className="text-[#506153] hover:bg-[#ECEEEA] font-bold text-xs"
                        title="Preview PDF Document"
                      >
                        <Eye className="h-4 w-4 mr-1 text-[#506153]" /> Preview PDF
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-rose-500 hover:text-rose-700 hover:bg-rose-50" 
                        onClick={() => handleDeleteOne(resume.id, resume.fileName)}
                        title="Delete Resume"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Resume Document Viewer Modal */}
      <ResumeViewerModal 
        resume={selectedResume}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        onViewAnalysis={handleViewAnalysis}
      />
    </div>
  );
}
