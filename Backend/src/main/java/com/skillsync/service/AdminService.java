package com.skillsync.service;

import com.skillsync.dto.admin.AdminDashboardResponse;
import com.skillsync.dto.admin.UpdateUserStatusRequest;
import com.skillsync.dto.admin.UserResponse;
import com.skillsync.dto.recruiter.JobApplicationResponse;
import com.skillsync.dto.recruiter.JobResponse;
import com.skillsync.dto.student.SkillDto;

import java.util.List;

public interface AdminService {
    AdminDashboardResponse getDashboard();
    
    List<UserResponse> getAllStudents();
    List<UserResponse> getAllRecruiters();
    
    UserResponse updateUserStatus(Long userId, UpdateUserStatusRequest request);
    void deleteUser(Long userId);
    
    List<JobResponse> getAllJobs();
    List<JobApplicationResponse> getAllApplications();
    
    SkillDto addSkill(SkillDto request);
    List<SkillDto> getAllSkills();
}
