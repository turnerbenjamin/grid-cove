export default class PuzzleController {
  #puzzleService;

  constructor(puzzleService) {
    this.#puzzleService = puzzleService;
  }

  createPuzzle = async (req) => {
    await this.#puzzleService.createPuzzle(
      req.body.pixelArt,
      req.body.title,
      req.body.size,
      req.user
    );
  };
}
