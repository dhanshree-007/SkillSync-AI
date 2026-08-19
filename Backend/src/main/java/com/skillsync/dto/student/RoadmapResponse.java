package com.skillsync.dto.student;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoadmapResponse {
    private Long id;
    private String targetRole;
    private Integer progressPercentage;
    private String missingSkills;
    private String roadmapStructureJson;
    private String createdAt;
}
