import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useGridContext } from "../../hooks/contexts/gridContext";

export default function GridDividingLines() {
  const { gridSize } = useGridContext();

  const canvasRef = useRef(null);
  const dpr = Math.ceil(window.devicePixelRatio);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasRef.current.getBoundingClientRect().width * dpr;
    canvas.height = canvasRef.current.getBoundingClientRect().height * dpr;

    const c = canvas.getContext("2d");
    c.scale(dpr, dpr);

    c.strokeStyle = "rgb(94, 214, 46)";
    c.lineWidth = 2;

    const drawLine = (relativePosition) => {
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

    const denominator = gridSize / 5;
    for (let numerator = 1; numerator < denominator; numerator++) {
      drawLine(numerator / denominator);
    }
  }, [gridSize, dpr]);

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
