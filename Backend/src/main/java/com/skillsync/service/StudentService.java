package com.skillsync.service;

import com.skillsync.dto.student.*;
import java.util.List;

public interface StudentService {
    StudentDashboardResponse getDashboard(String email);
    StudentProfileResponse getProfile(String email);
    StudentProfileResponse updateProfile(String email, UpdateProfileRequest request);
    
    ResumeResponse uploadResume(String email, UploadResumeRequest request);
    List<ResumeResponse> getResumes(String email);
    ResumeResponse getResumeById(String email, Long resumeId);
    void deleteResume(String email, Long resumeId);
    
    List<SkillDto> getSkills(String email);
    List<SkillDto> updateSkills(String email, UpdateSkillsRequest request);
    
    List<RoadmapResponse> getRoadmaps(String email);
    RoadmapResponse getRoadmapById(String email, Long roadmapId);
}
