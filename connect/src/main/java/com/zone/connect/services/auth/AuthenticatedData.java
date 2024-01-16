package com.zone.connect.services.auth;

import com.zone.connect.entities.User.User;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticatedData {
    private String token;

    private User user;
}
