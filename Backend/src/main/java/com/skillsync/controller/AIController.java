package com.skillsync.controller;

import com.skillsync.dto.ai.*;
import com.skillsync.service.AIService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@Tag(name = "AI Module", description = "Endpoints interacting with Google Gemini for resume analysis, gap analysis, and mock interviews")
@SecurityRequirement(name = "bearerAuth")
public class AIController {

    private final AIService aiService;

    @PostMapping("/resume/analyze")
    @Operation(summary = "Analyze Resume", description = "Extracts skills, strengths, weaknesses, and computes an ATS score from raw resume text")
    public ResponseEntity<ResumeAnalysisResponse> analyzeResume(@RequestBody String resumeText) {
        return ResponseEntity.ok(aiService.analyzeResume(resumeText));
    }

    @PostMapping("/skills/gap-analysis")
    @Operation(summary = "Skill Gap Analyzer", description = "Compares candidate's resume against a target role to find missing skills")
    public ResponseEntity<SkillGapResponse> analyzeSkillGap(@Valid @RequestBody SkillGapRequest request) {
        return ResponseEntity.ok(aiService.analyzeSkillGap(request));
    }

    @PostMapping("/roadmap/generate")
    @Operation(summary = "Generate Learning Roadmap", description = "Generates a personalized, step-by-step learning roadmap in JSON format")
    public ResponseEntity<String> generateRoadmap(@Valid @RequestBody RoadmapRequest request) {
        return ResponseEntity.ok(aiService.generateRoadmap(request));
    }

    @PostMapping("/interview/question")
    @Operation(summary = "Generate Interview Question", description = "Acts as an AI coach and generates a targeted interview question")
    public ResponseEntity<InterviewQuestionResponse> generateQuestion(@Valid @RequestBody InterviewQuestionRequest request) {
        return ResponseEntity.ok(aiService.generateInterviewQuestion(request));
    }

    @PostMapping("/interview/evaluate")
    @Operation(summary = "Evaluate Interview Answer", description = "Evaluates the candidate's answer and provides scores (technical, grammar, confidence)")
    public ResponseEntity<InterviewEvaluationResponse> evaluateAnswer(@Valid @RequestBody InterviewEvaluationRequest request) {
        return ResponseEntity.ok(aiService.evaluateInterviewAnswer(request));
    }

    @PostMapping("/jobs/recommend")
    @Operation(summary = "Job Recommendation Engine", description = "Recommends job titles based on a list of current skills")
    public ResponseEntity<String> recommendJobs(@RequestBody String currentSkills) {
        return ResponseEntity.ok(aiService.recommendJobs(currentSkills));
    }
}
