package com.skillsync.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String token;
    private String email;
    @NotBlank
    private String newPassword;
}
