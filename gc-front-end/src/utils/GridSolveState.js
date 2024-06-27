export default class GridSolveState {
  #gridCellString;
  #rowStates = [];
  #columnStates = [];
  #puzzle;
  #isSolved;

  constructor(gridCellString, puzzle) {
    this.#gridCellString = gridCellString;
    this.#puzzle = puzzle;
    this.#initialiseSolveState();
  }

  get isSolved() {
    return this.#isSolved;
  }

  getRowSolveState(index) {
    return this.#rowStates[index];
  }

  getColumnSolveState(index) {
    return this.#columnStates[index];
  }

  #initialiseSolveState() {
    this.#isSolved = true;
    for (let i = 0; i < this.#puzzle.size; i++) {
      this.#rowStates.push(this.#getRowState(i));
      this.#columnStates.push(this.#getColumnState(i));
      if (!this.#rowStates[i] || !this.#columnStates[i]) this.#isSolved = false;
    }
  }

  #getRowState(index) {
    const left = index * this.#puzzle.size;
    const right = left + this.#puzzle.size;
    const lineString = this.#gridCellString.slice(left, right);
    return this.#getLineState(lineString, this.#puzzle.clues.rowClues[index]);
  }

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
