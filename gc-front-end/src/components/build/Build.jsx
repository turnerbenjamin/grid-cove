import { GridContextProvider } from "../../hooks/contexts/gridContext";
import GridColours from "../../utils/GridColours";
import Builder from "./Builder";

export default function Build() {
  return (
    <GridContextProvider defaultFillStyle={GridColours.BLACK}>
      <Builder />
    </GridContextProvider>
  );
}
