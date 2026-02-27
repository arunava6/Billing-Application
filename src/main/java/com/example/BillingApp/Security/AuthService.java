package com.example.BillingApp.Security;

import com.example.BillingApp.Dto.AuthRequest;
import com.example.BillingApp.Dto.AuthResponse;
import com.example.BillingApp.Entity.User;
import com.example.BillingApp.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepo userRepo;
    private final JwtUtil jwtUtil;

    public AuthResponse loginServ(AuthRequest authRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );
        User user = userRepo.findByEmail(authRequest.getEmail()).orElseThrow(
                () -> new RuntimeException("Email not found!!")
        );
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return authresponse(user, token);
    }

    private AuthResponse authresponse(User user, String token) {
        AuthResponse authResponse = new AuthResponse();
        authResponse.setEmail(user.getEmail());
        authResponse.setToken(token);
        authResponse.setRole(user.getRole());

        return authResponse;
    }
}
