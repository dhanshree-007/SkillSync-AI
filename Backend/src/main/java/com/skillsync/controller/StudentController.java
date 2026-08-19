package com.skillsync.controller;

import com.skillsync.dto.student.*;
import com.skillsync.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
@Tag(name = "Student Module", description = "APIs for student dashboard, profile, resumes, and roadmaps")
@SecurityRequirement(name = "bearerAuth")
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/dashboard")
    @Operation(summary = "Get Student Dashboard", description = "Retrieves an overview of the student's profile, recent resumes, and active roadmaps")
    public ResponseEntity<StudentDashboardResponse> getDashboard(Authentication authentication) {
        return ResponseEntity.ok(studentService.getDashboard(authentication.getName()));
    }

    @GetMapping("/profile")
    @Operation(summary = "Get Student Profile", description = "Retrieves the authenticated student's profile")
    public ResponseEntity<StudentProfileResponse> getProfile(Authentication authentication) {
        return ResponseEntity.ok(studentService.getProfile(authentication.getName()));
    }

    @PutMapping("/profile")
    @Operation(summary = "Update Student Profile", description = "Updates full name, phone, and profile picture")
    public ResponseEntity<StudentProfileResponse> updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(studentService.updateProfile(authentication.getName(), request));
    }

    @PostMapping("/resume/upload")
    @Operation(summary = "Upload a Resume", description = "Saves resume metadata. Actual file upload logic belongs to Cloudinary integration in Phase 3")
    public ResponseEntity<ResumeResponse> uploadResume(
            Authentication authentication,
            @Valid @RequestBody UploadResumeRequest request) {
        return ResponseEntity.ok(studentService.uploadResume(authentication.getName(), request));
    }

    @GetMapping("/resumes")
    @Operation(summary = "Get All Resumes", description = "Retrieves a list of all uploaded resumes for the student")
    public ResponseEntity<List<ResumeResponse>> getResumes(Authentication authentication) {
        return ResponseEntity.ok(studentService.getResumes(authentication.getName()));
    }

    @GetMapping("/resume/{id}")
    @Operation(summary = "Get Resume Details", description = "Retrieves details of a specific resume including ATS score and feedback")
    public ResponseEntity<ResumeResponse> getResumeById(
            Authentication authentication,
            @PathVariable Long id) {
        return ResponseEntity.ok(studentService.getResumeById(authentication.getName(), id));
    }

    @DeleteMapping("/resume/{id}")
    @Operation(summary = "Delete a Resume", description = "Deletes a specific resume")
    public ResponseEntity<Void> deleteResume(
            Authentication authentication,
            @PathVariable Long id) {
        studentService.deleteResume(authentication.getName(), id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/skills")
    @Operation(summary = "Get Student Skills", description = "Retrieves all parsed and verified skills for the student")
    public ResponseEntity<List<SkillDto>> getSkills(Authentication authentication) {
        return ResponseEntity.ok(studentService.getSkills(authentication.getName()));
    }

    @PutMapping("/skills")
    @Operation(summary = "Update Student Skills", description = "Manually update the list of skills")
    public ResponseEntity<List<SkillDto>> updateSkills(
            Authentication authentication,
            @Valid @RequestBody UpdateSkillsRequest request) {
        return ResponseEntity.ok(studentService.updateSkills(authentication.getName(), request));
    }

    @GetMapping("/roadmaps")
    @Operation(summary = "Get All Learning Roadmaps", description = "Retrieves a list of active AI-generated learning roadmaps")
    public ResponseEntity<List<RoadmapResponse>> getRoadmaps(Authentication authentication) {
        return ResponseEntity.ok(studentService.getRoadmaps(authentication.getName()));
    }

    @GetMapping("/roadmap/{id}")
    @Operation(summary = "Get Roadmap Details", description = "Retrieves the JSON structure and progress of a specific roadmap")
    public ResponseEntity<RoadmapResponse> getRoadmapById(
            Authentication authentication,
            @PathVariable Long id) {
        return ResponseEntity.ok(studentService.getRoadmapById(authentication.getName(), id));
    }
}
