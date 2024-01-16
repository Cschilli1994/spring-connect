import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import GameProvider from "../contexts/GameProvider";
import GameInfo from "../components/Game/GameInfo";
import Space from "../components/Game/Board/Space";
import Board from "../components/Game/Board/Board";
import InvitationForm from "../components/Game/invitations/InvitationForm";

export default function GamePage() {
  const { gameId } = useParams();

  return (
    <GameProvider id={gameId}>
      <div className="w-full h-full flex flex-col">
        <Header />
        <GameInfo />
        <InvitationForm />
        <Board />
      </div>
    </GameProvider>
  );
}
