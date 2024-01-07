package com.zone.connect.controllers.user;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zone.connect.services.auth.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final JwtService jwtService;

    @GetMapping("/ping")
    public ResponseEntity<String> ping(
            HttpServletRequest request) {

        Cookie[] cookies = request.getCookies();

        for (Cookie cookie : cookies) {
            if ("jwtToken".equals(cookie.getName())) {
                String user = jwtService.extractUsername(cookie.getValue());
                return ResponseEntity.ok(user);
            }
        }

        return ResponseEntity.badRequest().body("Something went wrong");

    }

}
