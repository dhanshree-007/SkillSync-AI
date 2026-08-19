package com.skillsync.dto.ai;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SkillGapRequest {
    @NotBlank(message = "Target role is required")
    private String targetRole;

    @NotBlank(message = "Resume text is required")
    private String resumeText;
}
