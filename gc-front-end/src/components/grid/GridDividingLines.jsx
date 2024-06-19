import classNames from "classnames";
import { useEffect, useRef } from "react";

export default function GridDividingLines() {
  const length = 10;
  const canvasRef = useRef(null);
  const dpr = Math.ceil(window.devicePixelRatio);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = canvasRef.current.getBoundingClientRect().width * dpr;
    canvas.height = canvasRef.current.getBoundingClientRect().height * dpr;

    const c = canvas.getContext("2d");
    c.scale(dpr, dpr);

    c.strokeStyle = "rgba(212, 42, 102, 1)";
    c.lineWidth = 2;

    const drawLine = (relativePosition) => {
      console.log(relativePosition);
      c.beginPath();
      c.moveTo(canvas.width * relativePosition, 0);
      c.lineTo(canvas.width * relativePosition, canvas.height);
      c.stroke();
      c.closePath();

      c.beginPath();
      c.moveTo(0, canvas.height * relativePosition);
      c.lineTo(canvas.width, canvas.height * relativePosition);
      c.stroke();
      c.closePath();
    };

    const denominator = length / 5;
    for (let numerator = 1; numerator < denominator; numerator++) {
      drawLine(numerator / denominator);
    }
  }, [length, dpr]);

  return (
    <div
      className={classNames(
        "absolute inset-0 pointer-events-none w-full h-full "
      )}
      id="canvas-wrapper"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
