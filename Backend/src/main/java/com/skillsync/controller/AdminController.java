package com.skillsync.controller;

import com.skillsync.dto.admin.AdminDashboardResponse;
import com.skillsync.dto.admin.UpdateUserStatusRequest;
import com.skillsync.dto.admin.UserResponse;
import com.skillsync.dto.recruiter.JobApplicationResponse;
import com.skillsync.dto.recruiter.JobResponse;
import com.skillsync.dto.student.SkillDto;
import com.skillsync.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Tag(name = "Admin Module", description = "APIs for platform management, user moderation, and global analytics")
@SecurityRequirement(name = "bearerAuth")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    @Operation(summary = "Get Admin Dashboard", description = "Retrieves platform-wide statistics")
    public ResponseEntity<AdminDashboardResponse> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboard());
    }

    @GetMapping("/students")
    @Operation(summary = "Get All Students", description = "Retrieves a list of all registered students")
    public ResponseEntity<List<UserResponse>> getAllStudents() {
        return ResponseEntity.ok(adminService.getAllStudents());
    }

    @GetMapping("/recruiters")
    @Operation(summary = "Get All Recruiters", description = "Retrieves a list of all registered recruiters")
    public ResponseEntity<List<UserResponse>> getAllRecruiters() {
        return ResponseEntity.ok(adminService.getAllRecruiters());
    }

    @PutMapping("/users/{userId}/status")
    @Operation(summary = "Update User Status", description = "Block or Unblock a user account")
    public ResponseEntity<UserResponse> updateUserStatus(
            @PathVariable Long userId,
            @Valid @RequestBody UpdateUserStatusRequest request) {
        return ResponseEntity.ok(adminService.updateUserStatus(userId, request));
    }

    @DeleteMapping("/users/{userId}")
    @Operation(summary = "Delete User", description = "Permanently deletes a user and all associated data")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/jobs")
    @Operation(summary = "Get All Jobs", description = "Retrieves a list of all jobs across the platform")
    public ResponseEntity<List<JobResponse>> getAllJobs() {
        return ResponseEntity.ok(adminService.getAllJobs());
    }

    @GetMapping("/applications")
    @Operation(summary = "Get All Applications", description = "Retrieves a list of all applications across the platform")
    public ResponseEntity<List<JobApplicationResponse>> getAllApplications() {
        return ResponseEntity.ok(adminService.getAllApplications());
    }

    @PostMapping("/skills")
    @Operation(summary = "Add Skill to Dictionary", description = "Adds a new skill to the platform's global skill dictionary")
    public ResponseEntity<SkillDto> addSkill(@Valid @RequestBody SkillDto request) {
        return ResponseEntity.ok(adminService.addSkill(request));
    }

    @GetMapping("/skills")
    @Operation(summary = "Get Global Skills", description = "Retrieves the platform's global skill dictionary")
    public ResponseEntity<List<SkillDto>> getAllSkills() {
        return ResponseEntity.ok(adminService.getAllSkills());
    }
}
