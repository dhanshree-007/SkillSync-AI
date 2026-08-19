package com.skillsync.Backend.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://generativelanguage.googleapis.com")
            .build();

    public String analyzeResume(String resumeText, String targetRole) {

        String prompt = "You are an ATS (Applicant Tracking System) resume analyzer. " +
                "Analyze the following resume text for the target role: " + targetRole + ". " +
                "Return ONLY a valid JSON object (no markdown, no extra text) with these exact fields: " +
                "{ " +
                "\"atsScore\": <number 0-100>, " +
                "\"extractedSkills\": [<list of technical skills found>], " +
                "\"missingSkills\": [<list of important skills missing for the target role>], " +
                "\"suggestions\": [<list of 3-5 improvement suggestions>] " +
                "}. " +
                "Resume text: " + resumeText;

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of(
                                "parts", List.of(
                                        Map.of("text", prompt)
                                )
                        )
                )
        );

        try {

    String response = webClient.post()
            .uri(uriBuilder -> uriBuilder
                    .path("/v1beta/models/gemini-2.0-flash:generateContent")
                    .queryParam("key", apiKey)
                    .build())
            .bodyValue(requestBody)
            .exchangeToMono(clientResponse ->
                    clientResponse.bodyToMono(String.class)
                            .map(body -> {
                                System.out.println("===== STATUS =====");
                                System.out.println(clientResponse.statusCode());

                                System.out.println("===== GOOGLE RESPONSE =====");
                                System.out.println(body);

                                return body;
                            })
            )
            .block();

    return response;

} catch (Exception e) {
    e.printStackTrace();
    return "{\"error\":\"" + e.getMessage() + "\"}";
}
        
    }
}