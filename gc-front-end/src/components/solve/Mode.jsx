import classNames from "classnames";

import GridColours from "../../utils/GridColours";
import ModeSelector from "./ModeSelector";

export default function Mode({ disabled }) {
  const classes = classNames("flex flex-col items-center justify-center", {
    "opacity-50 pointer-events-none disabled": disabled,
  });

  return (
    <div className={classes}>
      <h3 className="mb-2 select-none">MODE</h3>
      <div
        className="flex flex-row md:flex-col gap-2 items-center justify-center"
        role="menu"
      >
        <ModeSelector colour={GridColours.BLACK} />
        <ModeSelector colour={GridColours.WHITE} />
        <ModeSelector colour={GridColours.ELIMINATED} />
      </div>
    </div>
  );
}
