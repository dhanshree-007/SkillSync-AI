package com.skillsync.Backend.dto;

import com.skillsync.Backend.model.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String fullName;
    private String email;
    private String password;
    private Role role;
}