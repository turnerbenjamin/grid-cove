import { GridContextProvider } from "../../hooks/contexts/gridContext";
import Builder from "./Builder";

export default function Build() {
  return (
    <GridContextProvider>
      <Builder />
    </GridContextProvider>
  );
}
