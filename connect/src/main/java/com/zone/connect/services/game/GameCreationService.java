package com.zone.connect.services.game;

import org.springframework.stereotype.Service;

import com.zone.connect.entities.Game.GameEntity;
import com.zone.connect.entities.Game.GameRepository;
import com.zone.connect.entities.Game.GameStatus;
import com.zone.connect.entities.User.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameCreationService {

    private final GameRepository repository;

    public GameEntity createPlayerInitiatedGame(User player, int goal) {

        GameEntity game = GameEntity
                .builder()
                .playerOneId(player.getId())
                .status(GameStatus.PREPARING)
                .turns(0)
                .board(newBoardByGoal(goal))
                .build();

        return repository.save(game);

    }

    private Integer[][] createEmptyBoard(int rows, int cols) {

        Integer[][] newBoard = new Integer[rows][cols];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                newBoard[i][j] = 0;
            }
        }

        return newBoard;
    }

    private Integer[][] newBoardByGoal(int goal) {
        switch (goal) {
            case 3:
                return createEmptyBoard(4, 5);
            case 4:
                return createEmptyBoard(5, 6);
            case 5:
                return createEmptyBoard(6, 7);
        }

        return createEmptyBoard(4, 5);
    }

}
