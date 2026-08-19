package com.skillsync.controller;

import com.skillsync.dto.recruiter.*;
import com.skillsync.service.RecruiterService;
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
@RequestMapping("/api/recruiter")
@RequiredArgsConstructor
@Tag(name = "Recruiter Module", description = "APIs for recruiter dashboard, company management, job posting, and applicant tracking")
@SecurityRequirement(name = "bearerAuth")
public class RecruiterController {

    private final RecruiterService recruiterService;

    @GetMapping("/dashboard")
    @Operation(summary = "Get Recruiter Dashboard", description = "Retrieves an overview of the company, active jobs, and recent applicant counts")
    public ResponseEntity<RecruiterDashboardResponse> getDashboard(Authentication authentication) {
        return ResponseEntity.ok(recruiterService.getDashboard(authentication.getName()));
    }

    @PostMapping("/company")
    @Operation(summary = "Create or Update Company", description = "Creates a new company profile or updates the existing one linked to the recruiter")
    public ResponseEntity<CompanyDto> createOrUpdateCompany(
            Authentication authentication,
            @Valid @RequestBody CompanyDto request) {
        return ResponseEntity.ok(recruiterService.createOrUpdateCompany(authentication.getName(), request));
    }

    @GetMapping("/company")
    @Operation(summary = "Get Company Details", description = "Retrieves details of the company associated with the current recruiter")
    public ResponseEntity<CompanyDto> getCompanyDetails(Authentication authentication) {
        return ResponseEntity.ok(recruiterService.getCompanyDetails(authentication.getName()));
    }

    @PostMapping("/jobs")
    @Operation(summary = "Post a New Job", description = "Creates a new job listing linked to the recruiter's company")
    public ResponseEntity<JobResponse> postJob(
            Authentication authentication,
            @Valid @RequestBody JobRequest request) {
        return ResponseEntity.ok(recruiterService.postJob(authentication.getName(), request));
    }

    @PutMapping("/jobs/{jobId}")
    @Operation(summary = "Update a Job", description = "Updates an existing job listing")
    public ResponseEntity<JobResponse> updateJob(
            Authentication authentication,
            @PathVariable Long jobId,
            @Valid @RequestBody JobRequest request) {
        return ResponseEntity.ok(recruiterService.updateJob(authentication.getName(), jobId, request));
    }

    @DeleteMapping("/jobs/{jobId}")
    @Operation(summary = "Delete a Job", description = "Deletes a job listing")
    public ResponseEntity<Void> deleteJob(
            Authentication authentication,
            @PathVariable Long jobId) {
        recruiterService.deleteJob(authentication.getName(), jobId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/jobs")
    @Operation(summary = "Get All Posted Jobs", description = "Retrieves all jobs posted by this recruiter")
    public ResponseEntity<List<JobResponse>> getAllPostedJobs(Authentication authentication) {
        return ResponseEntity.ok(recruiterService.getAllPostedJobs(authentication.getName()));
    }

    @GetMapping("/jobs/{jobId}/applications")
    @Operation(summary = "Get Job Applications", description = "Retrieves all student applications for a specific job")
    public ResponseEntity<List<JobApplicationResponse>> getJobApplications(
            Authentication authentication,
            @PathVariable Long jobId) {
        return ResponseEntity.ok(recruiterService.getJobApplications(authentication.getName(), jobId));
    }

    @PutMapping("/applications/{applicationId}/status")
    @Operation(summary = "Update Application Status", description = "Changes the status of a job application (e.g., SHORTLISTED, REJECTED)")
    public ResponseEntity<JobApplicationResponse> updateApplicationStatus(
            Authentication authentication,
            @PathVariable Long applicationId,
            @Valid @RequestBody UpdateApplicationStatusRequest request) {
        return ResponseEntity.ok(recruiterService.updateApplicationStatus(authentication.getName(), applicationId, request));
    }
}
