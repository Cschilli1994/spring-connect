package com.zone.connect.controllers.user;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zone.connect.entities.User.User;
import com.zone.connect.entities.User.UserRepository;
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
    private final UserRepository userRepo;

    @GetMapping("/ping")
    public ResponseEntity<User> ping(
            HttpServletRequest request) {

        Cookie[] cookies = request.getCookies();

        for (Cookie cookie : cookies) {
            if ("jwtToken".equals(cookie.getName())) {
                String username = jwtService.extractUsername(cookie.getValue());
                User user = userRepo.findByEmail(username).orElseThrow();
                return ResponseEntity.ok(user.sanitize());
            }
        }

        return ResponseEntity.badRequest().body(null);

    }

}
