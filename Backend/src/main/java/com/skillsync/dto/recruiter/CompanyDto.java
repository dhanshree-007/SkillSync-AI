package com.skillsync.dto.recruiter;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyDto {
    private Long id;

    @NotBlank(message = "Company name is required")
    private String name;

    private String website;
    private String description;
    private String logoUrl;
}
