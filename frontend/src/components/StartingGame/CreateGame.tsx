import { useAuthContext } from "../../contexts/AuthProvider";

type CreateGameProps = {
  goal: number;
};

export default function CreateGame({ goal }: CreateGameProps) {
  const { user, callSecuredEndpoint } = useAuthContext();

  function createGame() {
    callSecuredEndpoint("/game", "POST", {
      goal,
      player: user,
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.text();
        }
      })
      .then((payload) => {
        console.log({ payload });
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
