export type Game = {
  id: number;
  board: number[][];
  playerOneId: number;
  playerTwoId: number;
  status: GameStatus;
  turns: number;
};

export type GameStatus = "PREPARING" | "IN_PROGRESS" | "COMPLETE";
