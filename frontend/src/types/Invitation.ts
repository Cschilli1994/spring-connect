export type Invitation = {
  toUser: string;
  fromUser: string;
  game: string;
  issuedAt: number;
  id: string;
  status: InvitationStatus;
};

export type InvitationStatus = "ACCEPTED" | "DECLINED" | "PENDING" | "EXPIRED";
