package com.skillsync.dto.admin;

import com.skillsync.entity.enums.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String fullName;
    private Role role;
    private boolean isActive;
    private String createdAt;
}
