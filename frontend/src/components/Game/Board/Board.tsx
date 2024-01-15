import { useGameContext } from "../../../contexts/GameProvider";
import Space from "./Space";

export default function Board() {
  const { game } = useGameContext();

  return (
    <div className="flex flex-col bg-black">
      {game?.board?.map((row, rowIndex) => (
        <div className="flex w-full justify-center">
          {row.map((spaceValue, colIndex) => (
            <div className="p-1" key={`space-${rowIndex}-${colIndex}`}>
              <Space value={spaceValue} row={rowIndex} col={colIndex} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
