import APIErrors from "./APIErrors.js";

export default class PuzzleGenerator {
  /**
   * Generates a puzzle based on the given pixelArt and puzzleSize.
   *
   * @param {string[][]} pixelArt - The pixel art representing the puzzle.
   * @param {number} puzzleSize - The size of the puzzle.
   * @returns {Object} An object containing the generated puzzle solution and clues.
   */
  static generate(pixelArt, puzzleSize) {
    const solution = PuzzleGenerator.#getSolutionString(pixelArt);
    const clues = PuzzleGenerator.#getClues(solution, parseInt(puzzleSize));
    return {
      solution,
      clues,
    };
  }

  //Builds a solution string from the given pixel art string
  static #getSolutionString(pixelArt) {
    const charCodeProfile = PuzzleGenerator.#getCharProfileFromString(pixelArt);
    const charCodesToFill = PuzzleGenerator.#getCharCodesToFill(
      charCodeProfile,
      pixelArt.length
    );
    return PuzzleGenerator.#buildSolutionString(pixelArt, charCodesToFill);
  }

  //Map a pixel art string to a solution string returning 1 for
  //chars in charCodes to fill else 0
  static #buildSolutionString(pixelArt, charCodesToFill) {
    let solutionString = "";
    for (let i = 0; i < pixelArt.length; i++) {
      const char = pixelArt[i];
      solutionString += charCodesToFill[char] ? "1" : "0";
    }
    return solutionString;
  }

  //Randomly splits charCode profile in two. The first array will be
  //used for to fill so long as it has at least 35% cover.
  static #getCharCodesToFill(profile, length) {
    const [firstHalf, secondHalf] = this.#shuffleAndRandomlySplitArray(profile);
    const firstHalfCover = PuzzleGenerator.#getTotalCover(firstHalf, length);
    const secondHalfCover = PuzzleGenerator.#getTotalCover(secondHalf, length);
    const toFill =
      (firstHalfCover / length) * 100 > 35 ? firstHalf : secondHalf;

    PuzzleGenerator.#ensureCorrectDistribution(
      toFill,
      Math.max(firstHalfCover, secondHalfCover),
      length
    );

    return toFill.reduce((charMap, charProfile) => {
      charMap[charProfile.char] = true;
      return charMap;
    }, {});
  }

  //If the cover of to fill is over 90 then chars are removed until it
  //is less or equal to 90
  static #ensureCorrectDistribution(toFill, toFillCover, length) {
    const maxCover = Math.floor(length * 0.9);
    if (toFillCover > maxCover) {
      PuzzleGenerator.#redistributeChars({
        amountToRemove: toFillCover - maxCover,
        from: toFill,
      });
    }
  }

  //Returns the total cover for a given set of characters
  static #getTotalCover(charProfiles) {
    return charProfiles.reduce((total, char) => total + char.occurrence, 0);
  }

  //Redistribute chars from one array to another where an array has
  //too high a proportion of the total char coverage
  static #redistributeChars({ amountToRemove, from }) {
    from.sort((a, b) => b.occurrence - a.occurrence);
    let amountRemoved = 0;
    while (amountRemoved < amountToRemove) {
      const charRemoved = from.pop();
      amountRemoved += charRemoved.occurrence;
    }
  }

  //Shuffles an array of chars and randomly splits this in two
  static #shuffleAndRandomlySplitArray(arr) {
    arr.sort(() => 0.5 - Math.random());
    const indexToSplitAt = Math.floor(Math.random() * (arr.length - 1)) + 1;
    const firstHalf = arr.slice(0, indexToSplitAt);
    const secondHalf = arr.slice(indexToSplitAt);
    return [firstHalf, secondHalf];
  }

  //Returns an object with an array of all chars
  //and an array of chars that make up at least 10% of the string
  static #getCharProfileFromString(string) {
    const profile = {};
    for (const char of string) {
      profile[char] = (profile[char] || 0) + 1;
      if (profile[char] > string.length * 0.9)
        throw APIErrors.INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION;
    }
    return Object.entries(profile).map(([char, occurrence]) => {
      return { char, occurrence };
    });
  }

  //Generates a clues object for a given solution string
  static #getClues(solution, puzzleSize) {
    const rowClues = [];
    const columnClues = [];
    for (let i = 0; i < puzzleSize; i++) {
      rowClues.push(PuzzleGenerator.#getRowClue(i, puzzleSize, solution));
      columnClues.push(PuzzleGenerator.#getColumnClue(i, puzzleSize, solution));
    }
    return {
      rowClues,
      columnClues,
    };
  }

  //Get clues for a given row
  static #getRowClue(index, puzzleSize, solution) {
    const left = index * puzzleSize;
    const right = left + puzzleSize;
    const lineString = solution.slice(left, right);
    return PuzzleGenerator.#getLineClue(lineString);
  }

  //Get clues for a given column
  static #getColumnClue(index, puzzleSize, solution) {
    let lineString = "";
    for (let i = index; i < solution.length; i += puzzleSize) {
      lineString += solution[i];
    }
    return PuzzleGenerator.#getLineClue(lineString);
  }

  //Build clues for a given line
  static #getLineClue(lineString) {
    const clue = [];
    let runningFillLength = 0;
    for (const char of lineString) {
      if (char === "1") runningFillLength++;
      else {
        if (runningFillLength > 0) clue.push(runningFillLength);
        runningFillLength = 0;
      }
    }
    if (runningFillLength > 0) clue.push(runningFillLength);
    return clue;
  }
}
