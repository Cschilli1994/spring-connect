import { useGameContext } from "../../contexts/GameProvider";

export default function GameInfo() {
  const { game } = useGameContext();

  if (!game) {
    // not loaded yet
    return null;
  }
  return (
    <div className="w-full flex flex-col">
      <h1>{game.id}</h1>
      <h2>{game.playerOneId}</h2>
      <h2>{game.playerTwoId ? game.playerTwoId : "N/A"}</h2>
    </div>
  );
}
