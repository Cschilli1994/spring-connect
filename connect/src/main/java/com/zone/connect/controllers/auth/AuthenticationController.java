package com.zone.connect.controllers.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zone.connect.entities.User.User;
import com.zone.connect.payloads.AuthenticationRequestCredentials;
import com.zone.connect.payloads.RegisterRequestCredentials;
import com.zone.connect.services.auth.AuthenticationService;
import com.zone.connect.services.auth.AuthenticatedData;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<User> register(
            HttpServletResponse response,
            @RequestBody RegisterRequestCredentials credentialPayload) {
        AuthenticatedData authedData = authService.register(credentialPayload);
        Cookie cookie = new Cookie("jwtToken", authedData.getToken());
        cookie.setHttpOnly(true); // Set HttpOnly attribute
        cookie.setPath("/");
        cookie.setDomain("localhost");
        response.addCookie(cookie);
        return ResponseEntity.ok(authedData.getUser());
    }

    @PostMapping("/authenticate")
    public ResponseEntity<User> authenticate(
            HttpServletResponse response,
            @RequestBody AuthenticationRequestCredentials credentialPayload) {
        AuthenticatedData authedData = authService.authenticate(credentialPayload);
        Cookie cookie = new Cookie("jwtToken", authedData.getToken());
        cookie.setHttpOnly(true); // Set HttpOnly attribute
        cookie.setPath("/");
        cookie.setDomain("localhost");
        response.addCookie(cookie);
        return ResponseEntity.ok(authedData.getUser());
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(
            HttpServletResponse response) {

        Cookie cookie = new Cookie("jwtToken", "");
        cookie.setHttpOnly(true); // Set HttpOnly attribute
        cookie.setPath("/");
        cookie.setDomain("localhost");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok("Logged Out");
    }

}
