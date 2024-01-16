package com.zone.connect.services;

import java.sql.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.zone.connect.controllers.invitation.SendInvitationRequest;
import com.zone.connect.entities.Invitation.InvitationEntity;
import com.zone.connect.entities.Invitation.InvitationRepository;
import com.zone.connect.entities.User.User;
import com.zone.connect.entities.User.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InvitationService {

    private final InvitationRepository repository;
    private final UserRepository userRepository;

    public void createInvitation(SendInvitationRequest invitationDetails) {

        User toUser = userRepository.findByEmail(invitationDetails.getTo()).orElseThrow();

        InvitationEntity invitation = InvitationEntity
                .builder()
                .fromUser(invitationDetails.getFrom())
                .toUser(toUser.getId())
                .game(invitationDetails.getGame())
                .issuedAt(new Date(System.currentTimeMillis()))
                .build();

        repository.save(invitation);

    }

    public List<InvitationEntity> getUsersRecievedInvites(String user) {
        return repository.findByToUser(user);
    }
}
