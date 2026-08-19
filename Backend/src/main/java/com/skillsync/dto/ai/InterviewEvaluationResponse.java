package com.skillsync.dto.ai;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InterviewEvaluationResponse {
    private int overallScore;
    private int grammarScore;
    private int technicalScore;
    private int confidenceScore;
    private String feedback;
}
