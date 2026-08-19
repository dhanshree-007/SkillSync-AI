package com.skillsync.config;

import com.skillsync.entity.RecruiterProfile;
import com.skillsync.entity.StudentProfile;
import com.skillsync.entity.User;
import com.skillsync.entity.enums.Role;
import com.skillsync.repository.RecruiterProfileRepository;
import com.skillsync.repository.StudentProfileRepository;
import com.skillsync.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Seed default demo user: dhanshreesaini7877@gmail.com
        createStudentIfAbsent("dhanshreesaini7877@gmail.com", "password123", "Dhanshree Saini");

        // Seed standard demo accounts
        createStudentIfAbsent("student@example.com", "password123", "Demo Student");
        createRecruiterIfAbsent("recruiter@example.com", "password123", "Demo Recruiter");
        createAdminIfAbsent("admin@example.com", "password123");
    }

    private void createStudentIfAbsent(String email, String rawPassword, String fullName) {
        if (userRepository.findByEmail(email).isEmpty()) {
            User user = new User();
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(rawPassword));
            user.setRole(Role.STUDENT);
            user.setActive(true);
            user = userRepository.save(user);

            StudentProfile profile = new StudentProfile();
            profile.setUser(user);
            profile.setFullName(fullName);
            studentProfileRepository.save(profile);
        }
    }

    private void createRecruiterIfAbsent(String email, String rawPassword, String fullName) {
        if (userRepository.findByEmail(email).isEmpty()) {
            User user = new User();
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(rawPassword));
            user.setRole(Role.RECRUITER);
            user.setActive(true);
            user = userRepository.save(user);

            RecruiterProfile profile = new RecruiterProfile();
            profile.setUser(user);
            profile.setFullName(fullName);
            recruiterProfileRepository.save(profile);
        }
    }

    private void createAdminIfAbsent(String email, String rawPassword) {
        if (userRepository.findByEmail(email).isEmpty()) {
            User user = new User();
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(rawPassword));
            user.setRole(Role.ADMIN);
            user.setActive(true);
            userRepository.save(user);
        }
    }
}
