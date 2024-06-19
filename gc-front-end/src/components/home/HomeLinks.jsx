import HomeLink from "./HomeLink";

export default function HomeLinks() {
  return (
    <div className="flex flex-col gap-[5vh]">
      <HomeLink
        boxStyling="border-grid-apple group-hover:bg-grid-apple"
        to="/puzzles"
      >
        SOLVE
      </HomeLink>
      <HomeLink
        boxStyling="border-grid-yellow group-hover:bg-grid-yellow"
        to="/build"
      >
        BUILD
      </HomeLink>
    </div>
  );
}
