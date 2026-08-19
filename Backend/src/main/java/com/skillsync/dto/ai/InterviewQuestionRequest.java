package com.skillsync.dto.ai;

import com.skillsync.entity.enums.InterviewType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InterviewQuestionRequest {
    @NotBlank(message = "Target role is required")
    private String targetRole;

    @NotNull(message = "Interview type is required")
    private InterviewType interviewType;
}
