import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import GridColours from "../../utils/GridColours";

const GridContext = createContext();

const GridContextProvider = function ({
  defaultFillStyle,
  size,
  doColourInsideTheLines = false,
  doNotOverwriteFilledCellsOnDrag = false,
  children,
}) {
  const [fillStyle, setFillStyle] = useState(
    defaultFillStyle || GridColours.BLACK
  );
  const [gridSize, setGridSize] = useState(size ?? null);
  const [gridCells, setGridCells] = useState(null);
  const [originTarget, setOriginTarget] = useState(null);
  const [gridFillString, setGridFillString] = useState(null);
  const [doUpdateGridString, setDoUpdateGridString] = useState(null);
  const [doRevealPixelArt, setDoRevealPixelArt] = useState(false);

  const gridRef = useRef();

  const handleUpdateCellColour = useCallback(
    (cellKey, isDrag) => {
      if (gridCells[cellKey].colour === fillStyle) return;
      if (
        isDrag &&
        doNotOverwriteFilledCellsOnDrag &&
        fillStyle !== GridColours.WHITE &&
        gridCells[cellKey].colour !== GridColours.WHITE
      )
        return;
      const gridCellsClone = [...gridCells];
      gridCellsClone[cellKey].colour = fillStyle;
      setGridCells(gridCellsClone);
    },
    [gridCells, fillStyle]
  );

  const resetGrid = () => {
    setGridCells((curr) =>
      curr.map((cell) => {
        cell.colour = GridColours.WHITE;
        return cell;
      })
    );
  };

  const doUpdateCellOnDrag = useCallback(
    (cellToCheck) => {
      if (!cellToCheck.dataset?.key) return false;
      if (!doColourInsideTheLines) return true;
      const { row, col } = cellToCheck.dataset;
      if (
        parseInt(row) !== originTarget.row &&
        parseInt(col) !== originTarget.col
      )
        return false;
      return true;
    },
    [originTarget]
  );

  useEffect(() => {
    if (!gridCells) return;
    const handleMouseDown = (e) => {
      if (e.button !== 0) return;
      const cellKey = e.target?.dataset?.key;
      if (cellKey === undefined) return;
      handleUpdateCellColour(cellKey, false);
      setOriginTarget(gridCells[cellKey]);
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleUpdateCellColour]);

  const getCurrentGridFillString = () => {
    return gridCells.map((cell) => cell.colour.colourCode).join("");
  };

  const handleUpdateGridFillString = () => {
    const fillString = getCurrentGridFillString();
    setGridFillString(fillString);
  };

  useEffect(() => {
    if (!doUpdateGridString) return;
    handleUpdateGridFillString();
    setDoUpdateGridString(false);
    gridRef?.current?.dispatchEvent(new Event("change"));
  }, [doUpdateGridString]);

  useEffect(() => {
    if (!gridSize) return;
    setGridCells(
      Array.from({ length: gridSize ** 2 }, (_, i) => {
        const row = Math.floor(i / gridSize) + 1;
        const col = Math.floor(i % gridSize) + 1;
        return { colour: GridColours.WHITE, key: i, col, row };
      })
    );
    setDoUpdateGridString(true);
  }, [gridSize]);

  useEffect(() => {
    if (!originTarget) return;
    const handleMouseMove = (e) => {
      if (!doUpdateCellOnDrag(e.target)) return;
      const { key } = e.target.dataset;
      handleUpdateCellColour(key, true);
    };
    const handleMouseUp = () => {
      setOriginTarget(null);
      setDoUpdateGridString(true);
      gridRef?.current?.dispatchEvent(new Event("change"));
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [originTarget]);

  const model = {
    gridRef,
    fillStyle,
    setFillStyle,
    gridSize,
    setGridSize,
    gridCells,
    gridFillString,
    getCurrentGridFillString,
    resetGrid,
    doRevealPixelArt,
    setDoRevealPixelArt,
  };

  return <GridContext.Provider value={model}>{children}</GridContext.Provider>;
};

const useGridContext = function () {
  return useContext(GridContext);
};

export { useGridContext, GridContextProvider };
