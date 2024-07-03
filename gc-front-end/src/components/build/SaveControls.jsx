import { useEffect, useMemo, useState } from "react";

import { useGridContext } from "../../hooks/contexts/gridContext";
import { usePuzzleContext } from "../../hooks/contexts/puzzleContext";
import Button from "../general/Button";
import BuildSuccessModal from "./BuildSuccessModal";
import ErrorModal from "../general/ErrorModal";
import PuzzleValidator from "../../utils/PuzzleValidator";
import RenderedErrors from "../general/RenderedErrors";
import TitleInput from "./TitleInput";

export default function SaveControls() {
  const { getCurrentGridFillString, gridRef, gridSize, resetGrid } =
    useGridContext();
  const {
    createNewPuzzle,
    puzzleServiceIsLoading,
    puzzleServiceErrors,
    handleClearErrors,
  } = usePuzzleContext();
  const [pixelArtTitle, setPixelArtTitle] = useState("");
  const [newPuzzleId, setNewPuzzleId] = useState(null);
  const [doShowValidationErrors, setDoShowValidationErrors] = useState(false);
  const [gridFillString, setGridFillString] = useState(
    getCurrentGridFillString()
  );

  useEffect(() => {
    const handleGridUpdate = () => {
      setGridFillString(getCurrentGridFillString());
    };
    gridRef?.current?.addEventListener("change", handleGridUpdate);
    return () =>
      gridRef?.current?.removeEventListener("change", handleGridUpdate);
  }, [getCurrentGridFillString]);

  //Handle the UI logic of saving a puzzle
  const handleSave = async () => {
    setDoShowValidationErrors(true);
    if (validationErrors) return;
    const title = pixelArtTitle;
    const newPuzzle = await createNewPuzzle(gridFillString, title, gridSize);
    if (newPuzzle) {
      setNewPuzzleId(newPuzzle._id);
      resetGrid();
      setDoShowValidationErrors(false);
      setPixelArtTitle("");
    }
  };

  //Returns an array of validation errors where found
  const validationErrors = useMemo(() => {
    const [isValidated, errors] = PuzzleValidator.validate({
      pixelArt: gridFillString,
      title: pixelArtTitle,
    });
    return isValidated ? null : errors;
  }, [gridFillString, pixelArtTitle]);

  return (
    <>
      <div className="flex flex-row items-stretch justify-center gap-2 mt-4">
        <TitleInput value={pixelArtTitle} onChange={setPixelArtTitle} />
        <Button
          onClick={handleSave}
          isLoading={puzzleServiceIsLoading}
          isDisabled={doShowValidationErrors && validationErrors}
        >
          Save
        </Button>
      </div>
      {puzzleServiceErrors && (
        <ErrorModal onClose={handleClearErrors} errors={puzzleServiceErrors} />
      )}
      {newPuzzleId && (
        <BuildSuccessModal
          onClose={() => setNewPuzzleId(null)}
          newPuzzleId={newPuzzleId}
        />
      )}
      {doShowValidationErrors && validationErrors && (
        <RenderedErrors errors={validationErrors} />
      )}
    </>
  );
}
