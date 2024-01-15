import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import GameProvider from "../contexts/GameProvider";
import GameInfo from "../components/Game/GameInfo";
import Space from "../components/Game/Board/Space";
import Board from "../components/Game/Board/Board";

export default function GamePage() {
  const { gameId } = useParams();

  return (
    <GameProvider id={gameId}>
      <div className="w-full h-full flex flex-col">
        <Header />
        <GameInfo />
        <Board />
      </div>
    </GameProvider>
  );
}
