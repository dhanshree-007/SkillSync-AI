package com.skillsync.service;

import com.skillsync.dto.auth.AuthResponse;
import com.skillsync.dto.auth.LoginRequest;
import com.skillsync.dto.auth.RefreshTokenRequest;
import com.skillsync.dto.auth.RegisterRequest;
import com.skillsync.dto.auth.ResetPasswordRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse refreshToken(RefreshTokenRequest request);
    void resetPassword(ResetPasswordRequest request);
}
