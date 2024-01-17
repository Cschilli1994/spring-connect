import { useEffect, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { Invitation, InvitationStatus } from "../../../types/Invitation";
import { useNavigate } from "react-router-dom";

export default function InvitationMenu() {
  const navigate = useNavigate();

  const { callSecuredEndpoint, user } = useAuthContext();

  const [invitations, setInvitations] = useState<Invitation[]>([]);

  function getInvitations() {
    callSecuredEndpoint(`/invitation/${user?.id}`, "GET")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }

        throw new Error("Failed to get invitations");
      })
      .then((respJson: Invitation[]) => {
        setInvitations(respJson);
      });
  }

  function replyInvitation(id: string, status: InvitationStatus, game: string) {
    callSecuredEndpoint("/invitation/reply", "POST", { id, status }).then(
      (resp) => {
        if (resp.ok) {
          navigate(`/game/${game}`);
        } else {
          throw new Error("Failed to accept invitation");
        }
      }
    );
  }

  useEffect(() => {
    getInvitations();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex">
        <span>
          You have {invitations.length} invitation
          {invitations.length !== 1 ? "s" : null}
        </span>
        <button
          onClick={getInvitations}
          className="cursor-pointer hover:bg-slate-400 rounded-md border"
        >
          Refresh
        </button>
      </div>
      {invitations.map((invite, i) => (
        <button
          onClick={() => {
            replyInvitation(invite.id, "ACCEPTED", invite.game);
          }}
          key={invite.id}
          className="cursor-pointer hover:bg-slate-400 rounded-md border"
        >
          Join
        </button>
      ))}
    </div>
  );
}
