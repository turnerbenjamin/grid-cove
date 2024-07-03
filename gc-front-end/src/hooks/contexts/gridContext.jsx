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
  const [doRevealPixelArt, setDoRevealPixelArt] = useState(false);

  const gridRef = useRef();

  //Update colour of a given grid cell
  const handleUpdateCellColour = useCallback(
    (cellKey) => {
      if (gridCells[cellKey].colour === fillStyle) return;
      const gridCellsClone = [...gridCells];
      gridCellsClone[cellKey].colour = fillStyle;
      setGridCells(gridCellsClone);
    },
    [gridCells, fillStyle]
  );

  //Resets all grid cells to white
  const resetGrid = () => {
    setGridCells((curr) =>
      curr.map((cell) => {
        cell.colour = GridColours.WHITE;
        return cell;
      })
    );
  };

  //Returns a current representation of the current cell colours
  const getCurrentGridFillString = () => {
    return gridCells?.map((cell) => cell.colour.colourCode).join("");
  };

  //Checks whether the cell is in the same row or column
  //as the originTarget cell
  const isUpdateInsideTheLines = (cellToCheck) => {
    const { row, col } = cellToCheck.dataset;
    const sameRow = parseInt(row) === originTarget.row;
    const sameCol = parseInt(col) === originTarget.col;
    return sameRow || sameCol;
  };

  //Checks whether a filled cell is being overwritten,
  //returns true if neither the current cell colour nor the
  //fill style are white
  const doesOverwriteFilledCells = (cellToCheckKey) => {
    const currentColour = gridCells[cellToCheckKey].colour;
    if (fillStyle === GridColours.WHITE) return false;
    if (currentColour === GridColours.WHITE) return false;
    return true;
  };

  //Controller for determining whether a cell should be updated when
  // dragged over.
  const doUpdateCellOnDrag = (cellToCheck) => {
    const cellKey = cellToCheck.dataset?.key;
    if (!cellKey) return false;
    if (doColourInsideTheLines && !isUpdateInsideTheLines(cellToCheck))
      return false;
    if (doNotOverwriteFilledCellsOnDrag && doesOverwriteFilledCells(cellKey))
      return false;
    return true;
  };

  //Update cell colour on mouse down
  const handleMouseDown = (e) => {
    if (e.button !== 0 && !e.touches) return;
    const cellKey = e.target?.dataset?.key;
    if (cellKey === undefined) return;
    handleUpdateCellColour(cellKey);
    setOriginTarget(gridCells[cellKey]);
  };

  //Set-up mouse down listener
  useEffect(() => {
    if (!gridCells || doRevealPixelArt) return;
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("touchstart", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("touchstart", handleMouseDown);
    };
  }, [handleUpdateCellColour, doRevealPixelArt]);

  const getTarget = (e) => {
    if (!e.touches) return e.target;
    e.preventDefault();
    const { clientX, clientY } = e.touches[0];
    return document.elementFromPoint(clientX, clientY);
  };

  //Handle mouse move logic - Updates cell colours between
  //mouse down and mouse up events according to logic
  //in doUpdateCellOnDrag
  const handleMouseMove = (e) => {
    const target = getTarget(e);
    if (!doUpdateCellOnDrag(target)) return;
    const { key } = target.dataset;
    handleUpdateCellColour(key);
  };

  //Unset origin target - This effectively removes the
  //mouse up and mouse down handlers
  const handleMouseUp = () => {
    setOriginTarget(null);
    gridRef?.current?.dispatchEvent(new Event("change"));
  };

  //Add mouse move and mouse up listeners
  useEffect(() => {
    if (!originTarget || doRevealPixelArt) return;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleMouseMove, { passive: false });
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove, {
        passive: false,
      });
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [originTarget, doRevealPixelArt]);

  //Initialise grid cells when grid size set
  useEffect(() => {
    if (!gridSize) return setGridCells(null);
    setGridCells(
      Array.from({ length: gridSize ** 2 }, (_, i) => {
        const row = Math.floor(i / gridSize) + 1;
        const col = Math.floor(i % gridSize) + 1;
        return { colour: GridColours.WHITE, key: i, col, row };
      })
    );
  }, [gridSize]);

  const model = {
    gridRef,
    fillStyle,
    setFillStyle,
    gridSize,
    setGridSize,
    gridCells,
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
