package com.zone.connect.entities.Invitation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository extends JpaRepository<InvitationEntity, String> {

    List<InvitationEntity> findByToUser(String toUser);

    List<InvitationEntity> findByFromUser(String fromUser);
}
