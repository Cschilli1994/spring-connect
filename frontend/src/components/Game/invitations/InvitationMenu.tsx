import { useEffect, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { Invitation } from "../../../types/Invitation";

export default function InvitationMenu() {
  const { callSecuredEndpoint, user } = useAuthContext();

  const [invitations, setInvitations] = useState<Invitation[]>([]);

  function getInvitations() {
    callSecuredEndpoint(`/invitation/${user.id}`, "GET")
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
          key={invite.id}
          className="cursor-pointer hover:bg-slate-400 rounded-md border"
        >
          Join
        </button>
      ))}
    </div>
  );
}
