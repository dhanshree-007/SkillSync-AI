package com.skillsync.dto.recruiter;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RecruiterDashboardResponse {
    private CompanyDto companyDetails;
    private long activeJobsCount;
    private long totalApplicationsReceived;
    private List<JobResponse> recentJobs;
}
