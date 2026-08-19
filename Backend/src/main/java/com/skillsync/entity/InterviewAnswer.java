package com.skillsync.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "interview_answers")
public class InterviewAnswer extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", referencedColumnName = "id", nullable = false)
    private InterviewQuestion question;

    @NotBlank(message = "Answer text is required")
    @Column(name = "answer_text", nullable = false, columnDefinition = "TEXT")
    private String answerText;

    private Integer score;

    @Column(name = "ai_feedback", columnDefinition = "TEXT")
    private String aiFeedback;
}
