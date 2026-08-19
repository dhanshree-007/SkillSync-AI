package com.skillsync.service;

import com.skillsync.dto.ai.*;

public interface AIService {
    ResumeAnalysisResponse analyzeResume(String resumeText);
    SkillGapResponse analyzeSkillGap(SkillGapRequest request);
    String generateRoadmap(RoadmapRequest request);
    InterviewQuestionResponse generateInterviewQuestion(InterviewQuestionRequest request);
    InterviewEvaluationResponse evaluateInterviewAnswer(InterviewEvaluationRequest request);
    String recommendJobs(String currentSkills);
}
