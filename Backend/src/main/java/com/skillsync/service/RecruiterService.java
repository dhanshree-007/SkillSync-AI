package com.skillsync.service;

import com.skillsync.dto.recruiter.*;
import java.util.List;

public interface RecruiterService {
    RecruiterDashboardResponse getDashboard(String email);
    
    CompanyDto createOrUpdateCompany(String email, CompanyDto request);
    CompanyDto getCompanyDetails(String email);
    
    JobResponse postJob(String email, JobRequest request);
    JobResponse updateJob(String email, Long jobId, JobRequest request);
    void deleteJob(String email, Long jobId);
    List<JobResponse> getAllPostedJobs(String email);
    
    List<JobApplicationResponse> getJobApplications(String email, Long jobId);
    JobApplicationResponse updateApplicationStatus(String email, Long applicationId, UpdateApplicationStatusRequest request);
}
