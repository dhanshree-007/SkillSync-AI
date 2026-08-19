package com.skillsync.service.impl;

import com.skillsync.dto.student.*;
import com.skillsync.entity.*;
import com.skillsync.exception.ResourceNotFoundException;
import com.skillsync.repository.*;
import com.skillsync.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final ResumeRepository resumeRepository;
    private final SkillRepository skillRepository;
    private final ResumeSkillRepository resumeSkillRepository;
    private final LearningRoadmapRepository roadmapRepository;

    private StudentProfile getStudentProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return studentProfileRepository.findAll().stream()
                .filter(p -> p.getUser().getId().equals(user.getId()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));
    }

    @Override
    public StudentDashboardResponse getDashboard(String email) {
        StudentProfile profile = getStudentProfile(email);
        
        List<ResumeResponse> recentResumes = profile.getResumes().stream()
                .map(this::mapToResumeResponse)
                .limit(3)
                .collect(Collectors.toList());
                
        List<RoadmapResponse> activeRoadmaps = profile.getRoadmaps().stream()
                .map(this::mapToRoadmapResponse)
                .collect(Collectors.toList());
                
        List<SkillDto> skills = getSkills(email);

        return StudentDashboardResponse.builder()
                .profile(mapToProfileResponse(profile))
                .recentResumes(recentResumes)
                .activeRoadmaps(activeRoadmaps)
                .skills(skills)
                .build();
    }

    @Override
    public StudentProfileResponse getProfile(String email) {
        return mapToProfileResponse(getStudentProfile(email));
    }

    @Override
    @Transactional
    public StudentProfileResponse updateProfile(String email, UpdateProfileRequest request) {
        StudentProfile profile = getStudentProfile(email);
        profile.setFullName(request.getFullName());
        profile.setPhone(request.getPhone());
        profile.setProfilePictureUrl(request.getProfilePictureUrl());
        
        studentProfileRepository.save(profile);
        return mapToProfileResponse(profile);
    }

    @Override
    @Transactional
    public ResumeResponse uploadResume(String email, UploadResumeRequest request) {
        StudentProfile profile = getStudentProfile(email);
        
        Resume resume = new Resume();
        resume.setStudentProfile(profile);
        resume.setFileUrl(request.getFileUrl());
        resume.setPublicId(request.getPublicId());
        resume.setRawText(request.getRawText());
        // For Phase 2, mock AI ATS score
        resume.setAtsScore(75);
        resume.setFeedbackJson("{\"feedback\": \"Good layout, add more keywords\"}");
        
        resume = resumeRepository.save(resume);
        return mapToResumeResponse(resume);
    }

    @Override
    public List<ResumeResponse> getResumes(String email) {
        StudentProfile profile = getStudentProfile(email);
        return profile.getResumes().stream()
                .map(this::mapToResumeResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ResumeResponse getResumeById(String email, Long resumeId) {
        StudentProfile profile = getStudentProfile(email);
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));
                
        if (!resume.getStudentProfile().getId().equals(profile.getId())) {
            throw new ResourceNotFoundException("Resume not found for this user");
        }
        return mapToResumeResponse(resume);
    }

    @Override
    @Transactional
    public void deleteResume(String email, Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));
        StudentProfile profile = getStudentProfile(email);
        
        if (resume.getStudentProfile().getId().equals(profile.getId())) {
            resumeRepository.delete(resume);
        } else {
            throw new ResourceNotFoundException("Resume not found for this user");
        }
    }

    @Override
    public List<SkillDto> getSkills(String email) {
        StudentProfile profile = getStudentProfile(email);
        
        // Find latest resume to get skills for now
        return profile.getResumes().stream()
                .flatMap(r -> r.getResumeSkills().stream())
                .map(rs -> {
                    SkillDto dto = new SkillDto();
                    dto.setId(rs.getSkill().getId());
                    dto.setName(rs.getSkill().getName());
                    dto.setCategory(rs.getSkill().getCategory());
                    dto.setProficiencyLevel(rs.getProficiencyLevel());
                    return dto;
                })
                .distinct() // simple distinct implementation
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<SkillDto> updateSkills(String email, UpdateSkillsRequest request) {
        StudentProfile profile = getStudentProfile(email);
        // Implementation for manual skill update would go here
        // Usually, this links to user_skills table, but in our schema, it's tied to resume_skills
        // For Phase 2, returning mocked list
        return request.getSkills();
    }

    @Override
    public List<RoadmapResponse> getRoadmaps(String email) {
        StudentProfile profile = getStudentProfile(email);
        return profile.getRoadmaps().stream()
                .map(this::mapToRoadmapResponse)
                .collect(Collectors.toList());
    }

    @Override
    public RoadmapResponse getRoadmapById(String email, Long roadmapId) {
        StudentProfile profile = getStudentProfile(email);
        LearningRoadmap roadmap = roadmapRepository.findById(roadmapId)
                .orElseThrow(() -> new ResourceNotFoundException("Roadmap not found"));
                
        if (!roadmap.getStudentProfile().getId().equals(profile.getId())) {
            throw new ResourceNotFoundException("Roadmap not found for this user");
        }
        return mapToRoadmapResponse(roadmap);
    }

    // Mappers
    private StudentProfileResponse mapToProfileResponse(StudentProfile profile) {
        return StudentProfileResponse.builder()
                .id(profile.getId())
                .fullName(profile.getFullName())
                .email(profile.getUser().getEmail())
                .phone(profile.getPhone())
                .profilePictureUrl(profile.getProfilePictureUrl())
                .build();
    }

    private ResumeResponse mapToResumeResponse(Resume resume) {
        return ResumeResponse.builder()
                .id(resume.getId())
                .fileUrl(resume.getFileUrl())
                .atsScore(resume.getAtsScore())
                .feedbackJson(resume.getFeedbackJson())
                .createdAt(resume.getCreatedAt() != null ? resume.getCreatedAt().toString() : null)
                .build();
    }

    private RoadmapResponse mapToRoadmapResponse(LearningRoadmap roadmap) {
        return RoadmapResponse.builder()
                .id(roadmap.getId())
                .targetRole(roadmap.getTargetRole())
                .progressPercentage(roadmap.getProgressPercentage())
                .missingSkills(roadmap.getMissingSkills())
                .roadmapStructureJson(roadmap.getRoadmapStructureJson())
                .createdAt(roadmap.getCreatedAt() != null ? roadmap.getCreatedAt().toString() : null)
                .build();
    }
}
