type CircleProps = {
  fill: string;
  size: number;
  stroke: string;
};

export default function Circle({ fill, size, stroke }: CircleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 300 300"
      fill={fill}
      stroke={stroke}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="150" cy="150" r="150" fill={fill} stroke={stroke} />
    </svg>
  );
}
