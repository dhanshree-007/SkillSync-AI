package com.skillsync.dto.recruiter;

import com.skillsync.entity.enums.JobType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JobResponse {
    private Long id;
    private String title;
    private String description;
    private String requiredSkills;
    private String experienceLevel;
    private String location;
    private String salaryRange;
    private JobType jobType;
    private boolean isActive;
    
    private String companyName;
    private Long companyId;
    
    private Integer applicationCount;
    private String createdAt;
}
