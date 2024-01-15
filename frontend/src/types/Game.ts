type BoardValues = 0 | 1 | 2;

export type Game = {
  id: number;
  board: BoardValues[][];
  playerOneId: number;
  playerTwoId: number;
  status: GameStatus;
  turns: number;
};

export type GameStatus = "PREPARING" | "IN_PROGRESS" | "COMPLETE";
