package com.skillsync.service.impl;

import com.skillsync.dto.recruiter.*;
import com.skillsync.entity.*;
import com.skillsync.exception.ResourceNotFoundException;
import com.skillsync.repository.*;
import com.skillsync.service.RecruiterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecruiterServiceImpl implements RecruiterService {

    private final UserRepository userRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final CompanyRepository companyRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;

    private RecruiterProfile getRecruiterProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return recruiterProfileRepository.findAll().stream()
                .filter(p -> p.getUser().getId().equals(user.getId()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter profile not found"));
    }

    @Override
    public RecruiterDashboardResponse getDashboard(String email) {
        RecruiterProfile profile = getRecruiterProfile(email);
        
        CompanyDto companyDto = null;
        if (profile.getCompany() != null) {
            companyDto = mapToCompanyDto(profile.getCompany());
        }

        List<Job> allJobs = jobRepository.findAll().stream()
                .filter(j -> j.getRecruiterProfile().getId().equals(profile.getId()))
                .collect(Collectors.toList());

        long activeJobsCount = allJobs.stream().filter(Job::isActive).count();
        
        long totalApplications = allJobs.stream()
                .mapToLong(j -> j.getApplications().size())
                .sum();
                
        List<JobResponse> recentJobs = allJobs.stream()
                .sorted((j1, j2) -> j2.getCreatedAt().compareTo(j1.getCreatedAt()))
                .limit(5)
                .map(this::mapToJobResponse)
                .collect(Collectors.toList());

        return RecruiterDashboardResponse.builder()
                .companyDetails(companyDto)
                .activeJobsCount(activeJobsCount)
                .totalApplicationsReceived(totalApplications)
                .recentJobs(recentJobs)
                .build();
    }

    @Override
    @Transactional
    public CompanyDto createOrUpdateCompany(String email, CompanyDto request) {
        RecruiterProfile profile = getRecruiterProfile(email);
        Company company = profile.getCompany();
        
        if (company == null) {
            company = new Company();
        }
        
        company.setName(request.getName());
        company.setWebsite(request.getWebsite());
        company.setDescription(request.getDescription());
        company.setLogoUrl(request.getLogoUrl());
        
        company = companyRepository.save(company);
        profile.setCompany(company);
        recruiterProfileRepository.save(profile);
        
        return mapToCompanyDto(company);
    }

    @Override
    public CompanyDto getCompanyDetails(String email) {
        RecruiterProfile profile = getRecruiterProfile(email);
        if (profile.getCompany() == null) {
            throw new ResourceNotFoundException("No company associated with this profile");
        }
        return mapToCompanyDto(profile.getCompany());
    }

    @Override
    @Transactional
    public JobResponse postJob(String email, JobRequest request) {
        RecruiterProfile profile = getRecruiterProfile(email);
        
        if (profile.getCompany() == null) {
            throw new IllegalStateException("Must create a company profile before posting jobs");
        }
        
        Job job = new Job();
        job.setRecruiterProfile(profile);
        job.setCompany(profile.getCompany());
        updateJobEntityFromRequest(job, request);
        
        job = jobRepository.save(job);
        return mapToJobResponse(job);
    }

    @Override
    @Transactional
    public JobResponse updateJob(String email, Long jobId, JobRequest request) {
        RecruiterProfile profile = getRecruiterProfile(email);
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
                
        if (!job.getRecruiterProfile().getId().equals(profile.getId())) {
            throw new ResourceNotFoundException("Job not found for this recruiter");
        }
        
        updateJobEntityFromRequest(job, request);
        job = jobRepository.save(job);
        return mapToJobResponse(job);
    }

    @Override
    @Transactional
    public void deleteJob(String email, Long jobId) {
        RecruiterProfile profile = getRecruiterProfile(email);
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
                
        if (!job.getRecruiterProfile().getId().equals(profile.getId())) {
            throw new ResourceNotFoundException("Job not found for this recruiter");
        }
        
        jobRepository.delete(job);
    }

    @Override
    public List<JobResponse> getAllPostedJobs(String email) {
        RecruiterProfile profile = getRecruiterProfile(email);
        return jobRepository.findAll().stream()
                .filter(j -> j.getRecruiterProfile().getId().equals(profile.getId()))
                .map(this::mapToJobResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobApplicationResponse> getJobApplications(String email, Long jobId) {
        RecruiterProfile profile = getRecruiterProfile(email);
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
                
        if (!job.getRecruiterProfile().getId().equals(profile.getId())) {
            throw new ResourceNotFoundException("Job not found for this recruiter");
        }
        
        return job.getApplications().stream()
                .map(this::mapToJobApplicationResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public JobApplicationResponse updateApplicationStatus(String email, Long applicationId, UpdateApplicationStatusRequest request) {
        RecruiterProfile profile = getRecruiterProfile(email);
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));
                
        if (!application.getJob().getRecruiterProfile().getId().equals(profile.getId())) {
            throw new ResourceNotFoundException("Application not found for this recruiter's jobs");
        }
        
        application.setStatus(request.getStatus());
        application = jobApplicationRepository.save(application);
        return mapToJobApplicationResponse(application);
    }

    // Mappers
    private CompanyDto mapToCompanyDto(Company company) {
        return CompanyDto.builder()
                .id(company.getId())
                .name(company.getName())
                .website(company.getWebsite())
                .description(company.getDescription())
                .logoUrl(company.getLogoUrl())
                .build();
    }

    private void updateJobEntityFromRequest(Job job, JobRequest request) {
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setRequiredSkills(request.getRequiredSkills());
        job.setExperienceLevel(request.getExperienceLevel());
        job.setLocation(request.getLocation());
        job.setSalaryRange(request.getSalaryRange());
        job.setJobType(request.getJobType());
        job.setActive(request.isActive());
    }

    private JobResponse mapToJobResponse(Job job) {
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .requiredSkills(job.getRequiredSkills())
                .experienceLevel(job.getExperienceLevel())
                .location(job.getLocation())
                .salaryRange(job.getSalaryRange())
                .jobType(job.getJobType())
                .isActive(job.isActive())
                .companyName(job.getCompany() != null ? job.getCompany().getName() : null)
                .companyId(job.getCompany() != null ? job.getCompany().getId() : null)
                .applicationCount(job.getApplications() != null ? job.getApplications().size() : 0)
                .createdAt(job.getCreatedAt() != null ? job.getCreatedAt().toString() : null)
                .build();
    }

    private JobApplicationResponse mapToJobApplicationResponse(JobApplication application) {
        return JobApplicationResponse.builder()
                .id(application.getId())
                .jobId(application.getJob().getId())
                .jobTitle(application.getJob().getTitle())
                .studentId(application.getStudentProfile().getId())
                .studentName(application.getStudentProfile().getFullName())
                .studentEmail(application.getStudentProfile().getUser().getEmail())
                .resumeId(application.getResume().getId())
                .resumeFileUrl(application.getResume().getFileUrl())
                .atsMatchScore(application.getAtsMatchScore())
                .status(application.getStatus())
                .appliedAt(application.getCreatedAt() != null ? application.getCreatedAt().toString() : null)
                .build();
    }
}
