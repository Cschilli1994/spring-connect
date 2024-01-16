package com.zone.connect.controllers.invitation;

import lombok.Data;

@Data
public class SendInvitationRequest {
    private String from;
    private String to;
    private String game;
}
