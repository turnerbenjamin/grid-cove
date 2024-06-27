import classNames from "classnames";
import { useGridContext } from "../../hooks/contexts/gridContext";
import CrossOutDiv from "../general/CrossOutDiv";

export default function ModeSelector({ colour }) {
  const { fillStyle, setFillStyle } = useGridContext();
  const isSelected = fillStyle === colour;

  const classes = classNames(
    "relative w-12 h-12 flex flex-col items-center justify-center text-grid-red text-4xl border-2 cursor-pointer select-none",
    {
      " border-grid-white": !isSelected,
      "border-primary-500 shadow shadow-primary-300": isSelected,
    }
  );

  return (
    <div
      className={classes}
      style={{ backgroundColor: colour.rgb }}
      onClick={() => setFillStyle(colour)}
      role="option"
      title={colour.label}
    >
      {colour?.isEliminated && <CrossOutDiv />}
    </div>
  );
}
