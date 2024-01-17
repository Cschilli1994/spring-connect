package com.zone.connect.entities.Invitation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;

public interface InvitationRepository extends JpaRepository<InvitationEntity, String> {

    List<InvitationEntity> findByToUser(String toUser);

    List<InvitationEntity> findByFromUser(String fromUser);

    @Query("SELECT i FROM InvitationEntity i WHERE i.toUser = :userId AND i.status = :status")
    List<InvitationEntity> findByToUserAndStatus(@Param("userId") String userId,
            @Param("status") InvitationStatus status);

    @Modifying
    @Transactional
    @Query("UPDATE InvitationEntity i SET i.status = :status WHERE i.id = :invitationId")
    int updateStatusById(@Param("invitationId") String invitationId, @Param("status") InvitationStatus status);
}
