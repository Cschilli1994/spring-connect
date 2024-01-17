package com.zone.connect.controllers.invitation;

import com.zone.connect.entities.Invitation.InvitationStatus;

import lombok.Data;

@Data
public class InvitationReplyRequest {

    private InvitationStatus status;

    private String id;
}
