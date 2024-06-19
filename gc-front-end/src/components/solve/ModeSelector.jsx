import classNames from "classnames";

export default function ModeSelector({ isFill, isClear, isEliminate }) {
  const classes = classNames(
    "w-12 h-12 flex flex-col items-center justify-center text-grid-red text-4xl border border-grid-white cursor-pointer select-none",
    {
      "bg-grid-black": isFill,
      "bg-grid-white": isClear || isEliminate,
    }
  );

  return <div className={classes}>{isEliminate && "X"}</div>;
}
