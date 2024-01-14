package com.zone.connect.entities.Game;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<GameEntity, Integer> {

    Optional<GameEntity> findById(Integer id);

}
