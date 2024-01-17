package com.zone.connect.entities.Game;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;

public interface GameRepository extends JpaRepository<GameEntity, String> {

    Optional<GameEntity> findById(String id);

    @Modifying
    @Transactional
    @Query("UPDATE GameEntity i SET i.playerTwoId = :playerTwoId WHERE i.id = :gameId")
    int updatePlayerTwoIdById(@Param("gameId") String gameId, @Param("playerTwoId") String playerTwoId);

}
