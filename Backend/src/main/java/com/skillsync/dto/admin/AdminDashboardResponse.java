package com.skillsync.dto.admin;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDashboardResponse {
    private long totalStudents;
    private long totalRecruiters;
    private long totalActiveJobs;
    private long totalApplications;
    private long totalInterviewsConducted;
}
