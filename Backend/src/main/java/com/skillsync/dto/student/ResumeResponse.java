package com.skillsync.dto.student;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResumeResponse {
    private Long id;
    private String fileUrl;
    private Integer atsScore;
    private String feedbackJson;
    private String createdAt;
}
