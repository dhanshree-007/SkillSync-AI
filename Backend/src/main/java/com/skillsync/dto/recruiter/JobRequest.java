package com.skillsync.dto.recruiter;

import com.skillsync.entity.enums.JobType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class JobRequest {

    @NotBlank(message = "Job title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    private String requiredSkills;
    private String experienceLevel;
    private String location;
    private String salaryRange;

    @NotNull(message = "Job type is required")
    private JobType jobType;
    
    private boolean isActive = true;
}
