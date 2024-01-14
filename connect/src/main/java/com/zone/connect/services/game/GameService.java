package com.zone.connect.services.game;

import org.springframework.stereotype.Service;

import com.zone.connect.entities.Game.GameEntity;
import com.zone.connect.entities.Game.GameRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GameService {

    private final GameRepository gameRepo;

    public GameEntity findGameById(Integer id) {

        return gameRepo.findById(id).orElse(null);
    }

}
