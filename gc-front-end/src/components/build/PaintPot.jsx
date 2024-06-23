import { useGridContext } from "../../hooks/contexts/gridContext";
import { FaCheck } from "react-icons/fa6";
import classNames from "classnames";

export default function PaintPot({ colour }) {
  const { fillStyle, setFillStyle } = useGridContext();

  const isSelected = fillStyle === colour;

  const tickClasses = classNames({
    "fill-grid-black": !colour.isDark,
    "fill-grid-white": colour.isDark,
  });

  return (
    <div
      className="w-full md:h-full md-w-fit aspect-square shadow-sm shadow-grid-white/50 cursor-pointer flex flex-col items-center justify-center"
      style={{ backgroundColor: colour.rgb }}
      title={colour.label}
      onClick={() => setFillStyle(colour)}
    >
      {isSelected && <FaCheck className={tickClasses} />}
    </div>
  );
}
