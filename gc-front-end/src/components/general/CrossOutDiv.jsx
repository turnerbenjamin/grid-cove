import classNames from "classnames";
import { useEffect, useRef } from "react";

export default function CrossOutDiv() {
  const canvasRef = useRef(null);
  const dpr = Math.ceil(window.devicePixelRatio);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasRef.current.getBoundingClientRect().width * dpr;
    canvas.height = canvasRef.current.getBoundingClientRect().height * dpr;

    const c = canvas.getContext("2d");
    c.scale(dpr, dpr);

    c.strokeStyle = "rgb(255, 20, 52)";
    c.lineWidth = 2;

    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(canvas.width, canvas.height);
    c.stroke();
    c.closePath();

    c.beginPath();
    c.moveTo(canvas.width, 0);
    c.lineTo(0, canvas.height);
    c.stroke();
    c.closePath();
  }, [dpr]);

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
