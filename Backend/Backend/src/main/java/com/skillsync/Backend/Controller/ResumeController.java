package com.skillsync.Backend.Controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.skillsync.Backend.Service.GeminiService;
import com.skillsync.Backend.model.Resume;
import com.skillsync.Backend.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final Cloudinary cloudinary;
    private final ResumeRepository resumeRepository;
    private final GeminiService geminiService;

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {

        try {
            String userEmail = authentication.getName();

            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap("resource_type", "auto")
            );

            String fileUrl = uploadResult.get("secure_url").toString();

            Resume resume = new Resume();
            resume.setUserEmail(userEmail);
            resume.setFileUrl(fileUrl);
            resume.setFileName(file.getOriginalFilename());

            resumeRepository.save(resume);

            return ResponseEntity.ok(resume);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload failed: " + e.getMessage());
        }
    }

    @PostMapping(
            value = "/analyze",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> analyzeResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("targetRole") String targetRole) {

        try {
            // Extract text from PDF
            PDDocument document = PDDocument.load(file.getInputStream());
            PDFTextStripper stripper = new PDFTextStripper();
            String resumeText = stripper.getText(document);
            document.close();

            // Analyze using Gemini
            String analysisResult = geminiService.analyzeResume(resumeText, targetRole);

            return ResponseEntity.ok(analysisResult);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Analysis failed: " + e.getMessage());
        }
    }
}