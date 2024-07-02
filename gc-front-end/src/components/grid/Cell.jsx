import { useEffect, useState } from "react";
import classNames from "classnames";

import { useGridContext } from "../../hooks/contexts/gridContext";
import CrossOutDiv from "../general/CrossOutDiv";
import GridColours from "../../utils/GridColours";
import RevealPixelArtTransition from "../../utils/RevealPixelArtTransition";

export default function Cell({ cellData, hiddenColour }) {
  const { doRevealPixelArt, gridSize } = useGridContext();
  const [isFlipped, setIsFlipped] = useState(false);

  //Reveals hidden colour with delay where do reveal pixel art is true
  //Delay is determined by the RevealPixelArtTransition class to effect
  //An animation
  useEffect(() => {
    if (!doRevealPixelArt) return;
    const delay = RevealPixelArtTransition.getDelay(
      cellData.col,
      cellData.row,
      gridSize
    );
    setTimeout(() => {
      setIsFlipped(true);
    }, delay);
  }, [doRevealPixelArt, cellData]);

  const cellClasses = classNames(
    "absolute inset-0  cursor-pointer select-none backface-hidden transition",
    {
      "duration-1000": isFlipped,
    }
  );

  const frontFaceClasses = classNames(cellClasses, {
    "rotate-Y-180": isFlipped,
  });

  const backFaceClasses = classNames(cellClasses, {
    "rotate-Y-180": !isFlipped,
  });

  return (
    <div className="relative w-full aspect-square transform">
      <div
        className={frontFaceClasses}
        role="cell"
        data-key={cellData.key}
        data-row={cellData.row}
        data-col={cellData.col}
        title={`${cellData.col},${cellData.row}`}
        style={{ backgroundColor: cellData.colour?.rgb }}
      >
        {cellData.colour?.isEliminated && <CrossOutDiv />}
      </div>
      {hiddenColour !== undefined && (
        <div
          className={backFaceClasses}
          role="img"
          style={{
            backgroundColor:
              GridColours.getColourByColourCode(hiddenColour).rgb,
          }}
        />
      )}
    </div>
  );
}
