import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import GridColours from "../../utils/GridColours";

const GridContext = createContext();

const GridContextProvider = function ({
  defaultFillStyle,
  doColourInsideTheLines = false,
  children,
}) {
  const [fillStyle, setFillStyle] = useState(defaultFillStyle || null);
  const [gridSize, setGridSize] = useState(null);
  const [gridCells, setGridCells] = useState(null);
  const [originTarget, setOriginTarget] = useState(null);

  useEffect(() => {
    if (!gridSize) return;
    setGridCells(
      Array.from({ length: gridSize ** 2 }, (_, i) => {
        const row = Math.floor(i / gridSize) + 1;
        const col = Math.floor(i % gridSize) + 1;
        return { colour: GridColours.WHITE, key: i, col, row };
      })
    );
  }, [gridSize]);

  const handleUpdateCellColour = useCallback(
    (cellKey) => {
      if (setGridCells[cellKey] === fillStyle) return;
      const gridCellsClone = [...gridCells];
      gridCellsClone[cellKey].colour = fillStyle;
      setGridCells(gridCellsClone);
    },
    [gridCells, fillStyle]
  );

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
      handleUpdateCellColour(cellKey);
      setOriginTarget(gridCells[cellKey]);
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleUpdateCellColour]);

  useEffect(() => {
    if (!originTarget) return;
    const handleMouseMove = (e) => {
      if (!doUpdateCellOnDrag(e.target)) return;
      const { key } = e.target.dataset;
      handleUpdateCellColour(key);
    };
    const handleMouseUp = (e) => {
      setOriginTarget(null);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [originTarget]);

  const model = {
    fillStyle,
    setFillStyle,
    gridSize,
    setGridSize,
    gridCells,
  };

  return <GridContext.Provider value={model}>{children}</GridContext.Provider>;
};

const useGridContext = function () {
  return useContext(GridContext);
};

export { useGridContext, GridContextProvider };
