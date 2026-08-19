package com.skillsync.dto.ai;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class InterviewQuestionResponse {
    private String questionText;
    private List<String> expectedKeyPoints;
}
