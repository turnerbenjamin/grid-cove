import { useEffect } from "react";
import { useGridContext } from "../../hooks/contexts/gridContext";
import Grid from "../grid/Grid";

export default function LogoGrid() {
  const { setDoRevealPixelArt } = useGridContext();
  const logoString = "322223323323323333323CC3323323322223";

  useEffect(() => {
    setDoRevealPixelArt(true);
  }, []);

  return (
    <div className="w-12 h-12">
      <Grid pixelArt={logoString} noGap />
    </div>
  );
}
