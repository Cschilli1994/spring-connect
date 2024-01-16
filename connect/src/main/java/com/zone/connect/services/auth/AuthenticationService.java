package com.zone.connect.services.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zone.connect.entities.User.Role;
import com.zone.connect.entities.User.User;
import com.zone.connect.entities.User.UserRepository;
import com.zone.connect.payloads.AuthenticationRequestCredentials;
import com.zone.connect.payloads.RegisterRequestCredentials;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticatedData register(RegisterRequestCredentials credentials) {

        var user = User.builder()
                .email(credentials.getEmail())
                .password(passwordEncoder.encode((credentials.getPassword())))
                .role(Role.USER)
                .build();

        repository.save(user);

        return AuthenticatedData
                .builder()
                .token(jwtService.generateToken(user))
                .user(user.sanitize())
                .build();

    }

    public AuthenticatedData authenticate(AuthenticationRequestCredentials credentials) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        credentials.getEmail(),
                        credentials.getPassword()));

        var user = repository.findByEmail(credentials.getEmail()).orElseThrow();

        return AuthenticatedData
                .builder()
                .token(jwtService.generateToken(user))
                .user(user.sanitize())
                .build();

    }
}
