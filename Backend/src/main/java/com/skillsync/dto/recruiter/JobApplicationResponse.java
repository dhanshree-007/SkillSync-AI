package com.skillsync.dto.recruiter;

import com.skillsync.entity.enums.ApplicationStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JobApplicationResponse {
    private Long id;
    private Long jobId;
    private String jobTitle;
    
    private Long studentId;
    private String studentName;
    private String studentEmail;
    
    private Long resumeId;
    private String resumeFileUrl;
    
    private Integer atsMatchScore;
    private ApplicationStatus status;
    private String appliedAt;
}
