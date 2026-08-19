package com.skillsync.dto.ai;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class InterviewEvaluationRequest {
    @NotBlank(message = "Question text is required")
    private String questionText;

    @NotBlank(message = "Answer text is required")
    private String answerText;
}
