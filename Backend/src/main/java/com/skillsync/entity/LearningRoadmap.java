package com.skillsync.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "learning_roadmaps")
public class LearningRoadmap extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @NotBlank
    @Column(name = "target_role", nullable = false, length = 150)
    private String targetRole;

    @Column(name = "missing_skills", columnDefinition = "TEXT")
    private String missingSkills;

    @Column(name = "roadmap_structure_json", columnDefinition = "LONGTEXT")
    private String roadmapStructureJson;

    @Column(name = "progress_percentage")
    private Integer progressPercentage = 0;
}
