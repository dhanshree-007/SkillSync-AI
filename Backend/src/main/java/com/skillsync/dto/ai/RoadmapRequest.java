package com.skillsync.dto.ai;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class RoadmapRequest {
    @NotBlank(message = "Target role is required")
    private String targetRole;

    @NotEmpty(message = "Current skills list cannot be empty")
    private List<String> currentSkills;

    @NotEmpty(message = "Missing skills list cannot be empty")
    private List<String> missingSkills;
}
