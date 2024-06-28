import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGridContext } from "../../hooks/contexts/gridContext";
import { usePuzzleContext } from "../../hooks/contexts/puzzleContext";

import Button from "../general/Button";
import PromptConfirmDangerousAction from "../general/PromptConfirmDangerousAction";

export default function AdminActions({ props, puzzle }) {
  const { setDoRevealPixelArt } = useGridContext();
  const { deletePuzzleById, puzzleServiceIsLoading } = usePuzzleContext();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const puzzleDeleted = await deletePuzzleById(puzzle._id);
    if (puzzleDeleted) navigate("/puzzles");
  };

  return (
    <>
      <div {...props}>
        <h3 className="mt-12 mb-2 text-center select-none">Admin Actions</h3>
        <div className="w-full h-[1px] bg-secondary-100 mb-6" />
        <div className="flex items-center justify-center gap-2">
          <Button onClick={() => setDoRevealPixelArt(true)}>Reveal</Button>
          <Button
            danger
            onClick={() => setShowConfirmDelete(true)}
            isLoading={puzzleServiceIsLoading}
          >
            Delete
          </Button>
        </div>
      </div>
      {showConfirmDelete && (
        <PromptConfirmDangerousAction
          onProceed={handleDelete}
          onCancel={() => setShowConfirmDelete(false)}
        >
          <p className="mb-1">This action is irreversible!</p>
          <p className="mb-8">Are you sure you want to delete this puzzle?</p>
        </PromptConfirmDangerousAction>
      )}
    </>
  );
}
