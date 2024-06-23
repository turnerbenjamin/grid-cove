import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import GridColours from "../../utils/GridColours";

const GridContext = createContext();

const GridContextProvider = function ({ defaultFillStyle, children }) {
  const [fillStyle, setFillStyle] = useState(defaultFillStyle || null);
  const [gridSize, setGridSize] = useState(null);
  const [gridCells, setGridCells] = useState(null);
  const [originTarget, setOriginTarget] = useState(null);

  useEffect(() => {
    if (!gridSize) return;
    setGridCells(
      Array.from({ length: gridSize ** 2 }, (_, i) => {
        const x = Math.floor(i / gridSize) + 1;
        const y = Math.floor(i % gridSize) + 1;
        return { colour: GridColours.WHITE, key: i, x, y };
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

  useEffect(() => {
    if (!gridCells) return;
    const handleMouseDown = (e) => {
      const cellKey = e.target?.dataset?.key;
      if (cellKey === undefined) return;
      handleUpdateCellColour(cellKey);
      setOriginTarget(cellKey);
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleUpdateCellColour]);

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
