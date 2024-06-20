import classnames from "classnames";

export default function Clue({ clue, isRow }) {
  const clueClasses = classnames(
    "flex w-fit h-fit text-xs sm:text-sm md:text-base gap-0 mt-auto select-none",
    {
      "flex-row m-auto mr-0": isRow,
      "flex-col m-auto mb-0 ": !isRow,
    }
  );

  const clueElements = clue.map((clueElement, i) => {
    const isLastElement = i === clue.length - 1;
    return (
      <div key={i} className="h-[1.5ch]">
        {clueElement}
        {!isLastElement && ","}
      </div>
    );
  });

  return <div className={clueClasses}>{clueElements}</div>;
}
