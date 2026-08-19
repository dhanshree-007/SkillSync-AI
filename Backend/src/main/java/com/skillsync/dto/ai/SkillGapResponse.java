package com.skillsync.dto.ai;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SkillGapResponse {
    private String targetRole;
    private List<String> presentSkills;
    private List<String> missingSkills;
    private String learningPathSuggestion;
}
