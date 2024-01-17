package com.zone.connect.services;

import java.sql.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.zone.connect.controllers.invitation.SendInvitationRequest;
import com.zone.connect.entities.Game.GameEntity;
import com.zone.connect.entities.Game.GameRepository;
import com.zone.connect.entities.Invitation.InvitationEntity;
import com.zone.connect.entities.Invitation.InvitationRepository;
import com.zone.connect.entities.Invitation.InvitationStatus;
import com.zone.connect.entities.User.User;
import com.zone.connect.entities.User.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InvitationService {

    private final InvitationRepository repository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;

    public void createInvitation(SendInvitationRequest invitationDetails) {

        User toUser = userRepository.findByEmail(invitationDetails.getTo()).orElseThrow();

        InvitationEntity invitation = InvitationEntity
                .builder()
                .fromUser(invitationDetails.getFrom())
                .toUser(toUser.getId())
                .game(invitationDetails.getGame())
                .status(InvitationStatus.PENDING)
                .issuedAt(new Date(System.currentTimeMillis()))
                .build();

        repository.save(invitation);

    }

    public List<InvitationEntity> getUsersReceivedInvites(String user) {
        return repository.findByToUserAndStatus(user, InvitationStatus.PENDING);
    }

    private int acceptInvitation(String id) {
        // update game with user

        InvitationEntity invitation = repository.findById(id).orElseThrow();

        GameEntity game = gameRepository.findById(invitation.getGame()).orElseThrow();

        if (game.getPlayerTwoId() != null) {
            expireInvitation(id);
            throw new Error("Invitation Expired");
        }

        gameRepository.updatePlayerTwoIdById(game.getId(), invitation.getToUser());

        return repository.updateStatusById(id, InvitationStatus.ACCEPTED);
    }

    private int declineInvitation(String id) {
        return repository.updateStatusById(id, InvitationStatus.DECLINED);
    }

    private int expireInvitation(String id) {
        return repository.updateStatusById(id, InvitationStatus.EXPIRED);
    }

    public int updateStatus(String id, InvitationStatus status) {
        switch (status) {
            case ACCEPTED:
                return acceptInvitation(id);
            case DECLINED:
                return declineInvitation(id);
            default:
                throw new Error("Invalid Invitation Status");
        }
    }

}
