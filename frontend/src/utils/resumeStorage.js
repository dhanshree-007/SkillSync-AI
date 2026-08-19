const STORAGE_KEY = 'skillsync_resume_history';

export const getStoredResumes = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading stored resumes:', e);
  }
  
  // Default to empty array - No fake pre-populated baseline resume!
  return [];
};

export const getLatestResume = () => {
  const resumes = getStoredResumes();
  return resumes.length > 0 ? resumes[0] : null;
};

export const getResumeById = (id) => {
  const resumes = getStoredResumes();
  return resumes.find(r => String(r.id) === String(id)) || null;
};

export const saveUploadedResume = (file, evaluationObj = {}, fileDataURL = null) => {
  const current = getStoredResumes();
  
  const newResume = {
    id: Date.now(),
    fileName: file?.name || 'Uploaded_Resume.pdf',
    fileSize: file?.size || 1200000,
    fileDataURL: fileDataURL || null,
    atsScore: evaluationObj.overallScore || 75,
    metrics: evaluationObj.metrics || { impact: 80, brevity: 85, style: 80, sections: 90, keywords: 75 },
    matchedSkills: evaluationObj.matchedSkills || ['JavaScript', 'React.js', 'HTML/CSS', 'Git'],
    missingSkills: evaluationObj.missingSkills || ['AWS Cloud', 'Docker', 'GraphQL'],
    strengths: evaluationObj.strengths || ['Clear contact details', 'Good action verbs'],
    weaknesses: evaluationObj.weaknesses || ['Lacks cloud containerization keywords'],
    uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  const updated = [newResume, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save resume to localStorage:', e);
  }
  return newResume;
};

export const deleteStoredResume = (id) => {
  const current = getStoredResumes();
  const updated = current.filter(r => String(r.id) !== String(id));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {}
  return updated;
};

export const clearAllStoredResumes = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (e) {}
  return [];
};
