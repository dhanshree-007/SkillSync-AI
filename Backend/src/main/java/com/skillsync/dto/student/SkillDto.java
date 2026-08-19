package com.skillsync.dto.student;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SkillDto {
    private Long id;
    
    @NotBlank(message = "Skill name is required")
    private String name;
    
    private String category;
    
    @NotBlank(message = "Proficiency level is required")
    private String proficiencyLevel; // e.g. Beginner, Intermediate, Expert
}
