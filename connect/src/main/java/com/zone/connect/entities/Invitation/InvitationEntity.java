package com.zone.connect.entities.Invitation;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@Table(name = "invitations")
@AllArgsConstructor
@NoArgsConstructor
public class InvitationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String fromUser;

    private String toUser;

    private Date issuedAt;

    private String game;

    @Enumerated(EnumType.STRING)
    private InvitationStatus status;

}
