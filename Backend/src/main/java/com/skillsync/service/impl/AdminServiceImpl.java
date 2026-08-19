package com.skillsync.service.impl;

import com.skillsync.dto.admin.AdminDashboardResponse;
import com.skillsync.dto.admin.UpdateUserStatusRequest;
import com.skillsync.dto.admin.UserResponse;
import com.skillsync.dto.recruiter.JobApplicationResponse;
import com.skillsync.dto.recruiter.JobResponse;
import com.skillsync.dto.student.SkillDto;
import com.skillsync.entity.*;
import com.skillsync.entity.enums.Role;
import com.skillsync.exception.ResourceNotFoundException;
import com.skillsync.repository.*;
import com.skillsync.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final InterviewSessionRepository interviewSessionRepository;
    private final SkillRepository skillRepository;

    @Override
    public AdminDashboardResponse getDashboard() {
        long students = userRepository.findAll().stream().filter(u -> u.getRole() == Role.STUDENT).count();
        long recruiters = userRepository.findAll().stream().filter(u -> u.getRole() == Role.RECRUITER).count();
        long activeJobs = jobRepository.findAll().stream().filter(Job::isActive).count();
        long applications = jobApplicationRepository.count();
        long interviews = interviewSessionRepository.count();

        return AdminDashboardResponse.builder()
                .totalStudents(students)
                .totalRecruiters(recruiters)
                .totalActiveJobs(activeJobs)
                .totalApplications(applications)
                .totalInterviewsConducted(interviews)
                .build();
    }

    @Override
    public List<UserResponse> getAllStudents() {
        return userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.STUDENT)
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserResponse> getAllRecruiters() {
        return userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.RECRUITER)
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserResponse updateUserStatus(Long userId, UpdateUserStatusRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                
        user.setActive(request.getIsActive());
        user = userRepository.save(user);
        return mapToUserResponse(user);
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        // Due to cascade delete on foreign keys in schema, this removes associated profiles
        userRepository.delete(user);
    }

    @Override
    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(this::mapToJobResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobApplicationResponse> getAllApplications() {
        return jobApplicationRepository.findAll().stream()
                .map(this::mapToJobApplicationResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SkillDto addSkill(SkillDto request) {
        Skill skill = new Skill();
        skill.setName(request.getName());
        skill.setCategory(request.getCategory());
        skill = skillRepository.save(skill);
        
        request.setId(skill.getId());
        return request;
    }

    @Override
    public List<SkillDto> getAllSkills() {
        return skillRepository.findAll().stream()
                .map(s -> {
                    SkillDto dto = new SkillDto();
                    dto.setId(s.getId());
                    dto.setName(s.getName());
                    dto.setCategory(s.getCategory());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    // Mappers
    private UserResponse mapToUserResponse(User user) {
        String fullName = "";
        if (user.getRole() == Role.STUDENT) {
            fullName = studentProfileRepository.findAll().stream()
                    .filter(p -> p.getUser().getId().equals(user.getId()))
                    .findFirst()
                    .map(StudentProfile::getFullName).orElse("");
        } else if (user.getRole() == Role.RECRUITER) {
            fullName = recruiterProfileRepository.findAll().stream()
                    .filter(p -> p.getUser().getId().equals(user.getId()))
                    .findFirst()
                    .map(RecruiterProfile::getFullName).orElse("");
        }

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(fullName)
                .role(user.getRole())
                .isActive(user.isActive())
                .createdAt(user.getCreatedAt() != null ? user.getCreatedAt().toString() : null)
                .build();
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
