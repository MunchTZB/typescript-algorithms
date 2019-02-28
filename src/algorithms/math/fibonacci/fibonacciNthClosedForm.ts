export default function fibonacciClosedForm(position:number) {
  const topMaxValidPosition = 75;

  if (position < 1 || position > topMaxValidPosition) {
    throw new Error(`Can't handle position smaller than 1 or greater than ${topMaxValidPosition}`);
  }

  const sqrt5 = Math.sqrt(5);
  const phi = (1 + sqrt5) / 2;

  return Math.floor((phi ** position) / sqrt5 + .5);
}