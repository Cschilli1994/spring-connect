import Circle from "../../icons/Circle";
import Token from "../../icons/Token";

type SpaceProps = {
  value: 0 | 1 | 2;
  row: number;
  col: number;
};

export default function Space({ value, row, col }: SpaceProps) {
  function onSelect() {
    console.log("Play token in column: " + col);
  }

  return (
    <div onClick={onSelect} className="cursor-pointer">
      {value === 0 ? (
        <Circle fill="white" stroke="white" size={150} />
      ) : (
        <Token size={150} fill="none" stroke={value === 1 ? "blue" : "red"} />
      )}
    </div>
  );
}
