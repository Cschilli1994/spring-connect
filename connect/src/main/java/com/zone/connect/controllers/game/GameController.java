package com.zone.connect.controllers.game;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zone.connect.entities.Game.GameEntity;
import com.zone.connect.entities.User.User;
import com.zone.connect.services.auth.JwtService;
import com.zone.connect.services.game.GameCreationService;
import com.zone.connect.services.game.GameService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
// // 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1/game")
@RequiredArgsConstructor
public class GameController {

    private final JwtService jwtService;
    private final GameCreationService gcService;
    private final GameService gameService;

    @PostMapping
    public ResponseEntity<CreateGameResponse> createGame(
            HttpServletRequest request,
            @RequestBody CreateGameRequest payload) {

        User user = getUserFromRequest(request);
        GameEntity game = gcService.createPlayerInitiatedGame(user,
                payload.getGoal());
        return ResponseEntity
                .ok(new CreateGameResponse(game.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameEntity> getGame(@PathVariable String id) {

        try {
            GameEntity game = gameService.findGameById(id);
            return ResponseEntity.ok(game);
        } catch (Exception e) {
            // TODO: handle exception

            return ResponseEntity.badRequest().body(null);
        }

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
