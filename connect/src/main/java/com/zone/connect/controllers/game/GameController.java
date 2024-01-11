package com.zone.connect.controllers.game;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/game")
public class GameController {

    @PostMapping
    public ResponseEntity<String> createGame(@RequestBody CreateGameRequest payload) {

        return ResponseEntity
                .ok("Created Game with goal set to " + payload.getGoal() + " for player " + payload.getPlayer());
    }

}
