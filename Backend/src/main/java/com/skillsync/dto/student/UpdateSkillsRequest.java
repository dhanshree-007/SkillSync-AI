package com.skillsync.dto.student;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class UpdateSkillsRequest {
    
    @NotEmpty(message = "Skills list cannot be empty")
    @Valid
    private List<SkillDto> skills;
}
