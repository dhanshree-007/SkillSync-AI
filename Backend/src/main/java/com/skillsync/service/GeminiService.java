package com.skillsync.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key:mock-key}")
    private String apiKey;

    private final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=";
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String generateContent(String systemPrompt, String userPrompt) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> requestBody = new HashMap<>();
            
            // Format specific to Gemini API
            Map<String, Object> systemInstruction = new HashMap<>();
            systemInstruction.put("role", "user");
            systemInstruction.put("parts", List.of(Map.of("text", systemPrompt)));

            Map<String, Object> userContent = new HashMap<>();
            userContent.put("role", "user");
            userContent.put("parts", List.of(Map.of("text", userPrompt)));

            requestBody.put("contents", List.of(systemInstruction, userContent));

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            String url = GEMINI_API_URL + apiKey;
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JsonNode root = objectMapper.readTree(response.getBody());
                return root.path("candidates")
                           .get(0)
                           .path("content")
                           .path("parts")
                           .get(0)
                           .path("text")
                           .asText();
            }
            throw new RuntimeException("Failed to get a valid response from Gemini API");

        } catch (Exception e) {
            // For development without a real API key, return a mocked JSON response
            System.err.println("Gemini API call failed: " + e.getMessage());
            return "{\"mocked\": true, \"message\": \"Failed to call Gemini API. Is your API key valid?\"}";
        }
    }
}
