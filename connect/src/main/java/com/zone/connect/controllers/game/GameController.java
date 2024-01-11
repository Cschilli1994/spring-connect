package com.zone.connect.controllers.game;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zone.connect.entities.User.User;
import com.zone.connect.services.auth.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/game")
@RequiredArgsConstructor
public class GameController {

    private final JwtService jwtService;

    @PostMapping
    public ResponseEntity<String> createGame(
            HttpServletRequest request,
            @RequestBody CreateGameRequest payload) {

        User user = getUserFromRequest(request);

        return ResponseEntity
                .ok("Created Game with goal set to " + payload.getGoal() + " for player " + user.getEmail());
    }

    private User getUserFromRequest(HttpServletRequest request) {
        Cookie cookies[] = request.getCookies();

        User user = null;

        for (Cookie cookie : cookies) {
            if ("jwtToken".equals(cookie.getName())) {
                user = jwtService.getUser(cookie.getValue());
            }
        }

        return user;
    }

}
