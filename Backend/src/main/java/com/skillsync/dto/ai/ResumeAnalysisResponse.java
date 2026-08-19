package com.skillsync.dto.ai;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ResumeAnalysisResponse {
    private int atsScore;
    private List<String> extractedSkills;
    private List<String> strengths;
    private List<String> weaknesses;
    private List<String> improvementSuggestions;
}
