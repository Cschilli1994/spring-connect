package com.zone.connect.controllers.invitation;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zone.connect.entities.Invitation.InvitationEntity;
import com.zone.connect.services.InvitationService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/invitation")
@AllArgsConstructor
public class InvitationController {

    private final InvitationService invitationService;

    @PostMapping
    public ResponseEntity<String> sendInvitation(@RequestBody SendInvitationRequest requestInvitation) {

        try {
            invitationService.createInvitation(requestInvitation);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest().body("Failed to send invitation.");
        }

    }

    @GetMapping("/{user}")
    public ResponseEntity<List<InvitationEntity>> getUsersRecievedInvites(@PathVariable String user) {

        try {
            List<InvitationEntity> invitations = invitationService.getUsersReceivedInvites(user);

            return ResponseEntity.ok(invitations);

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/reply")
    public ResponseEntity replyInvitation(@RequestBody InvitationReplyRequest invitationReply) {
        try {
            // TODO: handle exception
            invitationService.updateStatus(invitationReply.getId(), invitationReply.getStatus());
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest().body(null);
        }

    }

}
