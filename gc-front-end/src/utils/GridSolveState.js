export default class GridSolveState {
  #gridCellString;
  #rowStates = [];
  #columnStates = [];
  #puzzle;
  #isSolved;

  /**
   * Creates an instance of GridSolveState.
   * @param {string} gridCellString - The string representation of the grid cells.
   * @param {Puzzle} puzzle - The puzzle object.
   */
  constructor(gridCellString, puzzle) {
    this.#gridCellString = gridCellString;
    this.#puzzle = puzzle;
    this.#initialiseSolveState();
  }

  /**
   * Checks if the grid is solved.
   *
   * @returns {boolean} True if the grid is solved, false otherwise.
   */
  get isSolved() {
    return this.#isSolved;
  }

  /**
   * Retrieves the solve state of a specific row in the grid.
   *
   * @param {number} index - The index of the row.
   * @returns {boolean} - True if the row is solved, false otherwise.
   */
  getRowSolveState(index) {
    return this.#rowStates[index];
  }

  /**
   * Retrieves the solve state of a specific column in the grid.
   *
   * @param {number} index - The index of the column.
   * @returns {boolean} - True if the column is solved, false otherwise.
   */
  getColumnSolveState(index) {
    return this.#columnStates[index];
  }

  //Controller for working out solve state
  #initialiseSolveState() {
    this.#isSolved = true;
    for (let i = 0; i < this.#puzzle.size; i++) {
      this.#rowStates.push(this.#getRowState(i));
      this.#columnStates.push(this.#getColumnState(i));
      if (!this.#rowStates[i] || !this.#columnStates[i]) this.#isSolved = false;
    }
  }

  //Controller to get state for a given row
  #getRowState(index) {
    const left = index * this.#puzzle.size;
    const right = left + this.#puzzle.size;
    const lineString = this.#gridCellString.slice(left, right);
    return this.#getLineState(lineString, this.#puzzle.clues.rowClues[index]);
  }

  //Controller to get state for a given column
  #getColumnState(index) {
    let lineString = "";
    for (
      let i = index;
      i < this.#gridCellString.length;
      i += this.#puzzle.size
    ) {
      lineString += this.#gridCellString[i];
    }
    return this.#getLineState(
      lineString,
      this.#puzzle.clues.columnClues[index]
    );
  }

  //Logic for determining if a given row or column matches the clue
  #getLineState(lineString, clue) {
    const filledRuns = [];
    let runningFillLength = 0;
    for (const char of lineString) {
      if (char === "1") runningFillLength++;
      else {
        if (runningFillLength > 0) filledRuns.push(runningFillLength);
        runningFillLength = 0;
      }
    }
    if (runningFillLength > 0) filledRuns.push(runningFillLength);
    if (filledRuns.length === 0) filledRuns.push(0);
    return clue.toString() === filledRuns.toString();
  }
}
