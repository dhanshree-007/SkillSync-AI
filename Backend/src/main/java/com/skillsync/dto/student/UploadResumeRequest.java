package com.skillsync.dto.student;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UploadResumeRequest {
    @NotBlank(message = "File URL is required")
    private String fileUrl;
    
    private String publicId;
    private String rawText;
}
