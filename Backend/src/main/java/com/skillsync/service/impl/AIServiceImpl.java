package com.skillsync.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillsync.dto.ai.*;
import com.skillsync.service.AIService;
import com.skillsync.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AIServiceImpl implements AIService {

    private final GeminiService geminiService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public ResumeAnalysisResponse analyzeResume(String resumeText) {
        String systemPrompt = "You are an expert ATS (Applicant Tracking System) and Career Coach. Analyze the provided resume text. Return ONLY a valid JSON object matching this schema: { \"atsScore\": integer (0-100), \"extractedSkills\": [string], \"strengths\": [string], \"weaknesses\": [string], \"improvementSuggestions\": [string] }. Do not include markdown formatting or extra text.";
        String prompt = "Resume Text:\n" + resumeText;
        
        String jsonResponse = geminiService.generateContent(systemPrompt, prompt);
        return parseJsonSafely(cleanJson(jsonResponse), ResumeAnalysisResponse.class, getDefaultResumeResponse());
    }

    @Override
    public SkillGapResponse analyzeSkillGap(SkillGapRequest request) {
        String systemPrompt = "You are an expert tech recruiter. Compare the candidate's resume with the target role. Return ONLY a valid JSON object matching this schema: { \"targetRole\": string, \"presentSkills\": [string], \"missingSkills\": [string], \"learningPathSuggestion\": string }. Do not include markdown.";
        String prompt = "Target Role: " + request.getTargetRole() + "\nResume Text: " + request.getResumeText();
        
        String jsonResponse = geminiService.generateContent(systemPrompt, prompt);
        return parseJsonSafely(cleanJson(jsonResponse), SkillGapResponse.class, getDefaultSkillGapResponse(request.getTargetRole()));
    }

    @Override
    public String generateRoadmap(RoadmapRequest request) {
        String systemPrompt = "You are an expert technical mentor. Generate a personalized learning roadmap from Beginner to Advanced to bridge the skill gap for the target role. Include recommended resources (courses, books, docs). Return the output as a well-structured JSON array representing modules or steps.";
        String prompt = "Target Role: " + request.getTargetRole() + "\nCurrent Skills: " + String.join(", ", request.getCurrentSkills()) + "\nMissing Skills: " + String.join(", ", request.getMissingSkills());
        
        return cleanJson(geminiService.generateContent(systemPrompt, prompt));
    }

    @Override
    public InterviewQuestionResponse generateInterviewQuestion(InterviewQuestionRequest request) {
        String systemPrompt = "You are a strict, expert technical and HR interviewer. Generate a single realistic interview question for the target role and interview type. Also provide the expected key points for a perfect answer. Return ONLY a valid JSON object matching: { \"questionText\": string, \"expectedKeyPoints\": [string] }. Do not include markdown.";
        String prompt = "Target Role: " + request.getTargetRole() + "\nInterview Type: " + request.getInterviewType().name();
        
        String jsonResponse = geminiService.generateContent(systemPrompt, prompt);
        return parseJsonSafely(cleanJson(jsonResponse), InterviewQuestionResponse.class, getDefaultQuestionResponse());
    }

    @Override
    public InterviewEvaluationResponse evaluateInterviewAnswer(InterviewEvaluationRequest request) {
        String systemPrompt = "You are an expert technical interviewer evaluating a candidate's answer. Provide a harsh but fair evaluation. Return ONLY a valid JSON object matching: { \"overallScore\": integer (0-100), \"grammarScore\": integer (0-100), \"technicalScore\": integer (0-100), \"confidenceScore\": integer (0-100), \"feedback\": string }. Do not include markdown.";
        String prompt = "Question: " + request.getQuestionText() + "\nCandidate's Answer: " + request.getAnswerText();
        
        String jsonResponse = geminiService.generateContent(systemPrompt, prompt);
        return parseJsonSafely(cleanJson(jsonResponse), InterviewEvaluationResponse.class, getDefaultEvaluationResponse());
    }

    @Override
    public String recommendJobs(String currentSkills) {
        String systemPrompt = "You are a career advisor algorithm. Based on the provided skills, recommend 3-5 specific job titles. Return a simple JSON array of strings.";
        return cleanJson(geminiService.generateContent(systemPrompt, currentSkills));
    }

    // --- Helper Methods ---

    private String cleanJson(String response) {
        // Remove markdown formatting like ```json ... ``` that Gemini sometimes adds
        if (response != null && response.contains("```json")) {
            return response.replaceAll("```json", "").replaceAll("```", "").trim();
        }
        return response != null ? response.trim() : "{}";
    }

    private <T> T parseJsonSafely(String json, Class<T> clazz, T fallback) {
        try {
            return objectMapper.readValue(json, clazz);
        } catch (JsonProcessingException e) {
            System.err.println("Failed to parse Gemini JSON output: " + e.getMessage());
            System.err.println("Raw output was: " + json);
            return fallback;
        }
    }

    // Default Fallbacks in case API fails or returns malformed JSON
    private ResumeAnalysisResponse getDefaultResumeResponse() {
        return ResumeAnalysisResponse.builder()
                .atsScore(50)
                .extractedSkills(List.of("Java", "Spring Boot"))
                .strengths(List.of("Good formatting"))
                .weaknesses(List.of("Lacks keywords"))
                .improvementSuggestions(List.of("Add more project details"))
                .build();
    }

    private SkillGapResponse getDefaultSkillGapResponse(String targetRole) {
        return SkillGapResponse.builder()
                .targetRole(targetRole)
                .presentSkills(List.of("Java"))
                .missingSkills(List.of("React", "AWS"))
                .learningPathSuggestion("Start by learning React basics.")
                .build();
    }

    private InterviewQuestionResponse getDefaultQuestionResponse() {
        return InterviewQuestionResponse.builder()
                .questionText("Tell me about a time you faced a difficult technical challenge.")
                .expectedKeyPoints(List.of("Describe the situation", "Explain the action taken", "Highlight the result"))
                .build();
    }

    private InterviewEvaluationResponse getDefaultEvaluationResponse() {
        return InterviewEvaluationResponse.builder()
                .overallScore(70)
                .grammarScore(80)
                .technicalScore(60)
                .confidenceScore(75)
                .feedback("Good structure, but lacking technical depth.")
                .build();
    }
}
