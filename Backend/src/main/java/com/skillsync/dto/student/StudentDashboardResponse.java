package com.skillsync.dto.student;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StudentDashboardResponse {
    private StudentProfileResponse profile;
    private List<ResumeResponse> recentResumes;
    private List<RoadmapResponse> activeRoadmaps;
    private List<SkillDto> skills;
}
