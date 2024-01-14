import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import { Game } from "../../types/Game";

type CreateGameProps = {
  goal: number;
};

export default function CreateGame({ goal }: CreateGameProps) {
  const { user, callSecuredEndpoint } = useAuthContext();

  const navigate = useNavigate();

  function createGame() {
    callSecuredEndpoint("/game", "POST", {
      goal,
      player: user,
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((payload: { id: number }) => {
        console.log({ payload });
        navigate(`/game/${payload.id}`);
      })
      .catch((err) => {
        console.log({ err });
      });
  }

  return (
    <button
      onClick={createGame}
      className="p-1 bg-secondary hover:bg-secCompl cursor-pointer rounded-md"
    >
      Start Game: Connect {goal}
    </button>
  );
}
