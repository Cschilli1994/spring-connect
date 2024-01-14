import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Game } from "../types/Game";
import { useAuthContext } from "./AuthProvider";

type GameContextValues = {
  game: Game;
};

const context = createContext(null);

type GameProviderProps = {
  id: string;
};

export default function GameProvider({
  id,
  children,
}: GameProviderProps & PropsWithChildren) {
  const [game, setGame] = useState(null);

  const { callSecuredEndpoint } = useAuthContext();

  useEffect(() => {
    callSecuredEndpoint(`/game/${id}`, "GET")
      .then((resp) => resp.json())
      .then((gameData: Game) => {
        setGame(gameData);
        console.log({ gameData });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return <context.Provider value={{ game }}>{children}</context.Provider>;
}

export function useGameContext() {
  return useContext<GameContextValues>(context);
}
