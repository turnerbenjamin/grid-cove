import APIErrors from "./APIErrors.js";

export default class PuzzleGenerator {
  static generate(pixelArt, puzzleSize) {
    PuzzleGenerator.#validatePuzzleSize(pixelArt, puzzleSize);
    const solution = PuzzleGenerator.#getSolutionString(pixelArt);
    const clues = PuzzleGenerator.#getClues(solution, puzzleSize);
    return {
      solution,
      clues,
    };
  }

  static #validatePuzzleSize(pixelArt, puzzleSize) {
    if (puzzleSize % 5 !== 0) throw APIErrors.INVALID_PUZZLE_SIZE;
  }

  //Builds a solution string from the given pixel art string
  static #getSolutionString(pixelArt) {
    const charCodeProfile = PuzzleGenerator.#getCharProfileFromString(pixelArt);
    const charCodesToFill =
      PuzzleGenerator.#getCharCodesToFill(charCodeProfile);
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

  //Randomly assign chars to be filled. Will ensure that at least one
  //char from the topOccurring chars (>10%) is filled.
  static #getCharCodesToFill({ chars, topOccurringChars }) {
    const doFill = {};
    const mustFill = PuzzleGenerator.#getRandomChar(topOccurringChars);
    let filledCellCount = 0;
    for (const charCode of chars) {
      if (filledCellCount === chars.length - 1) break;
      if (charCode === mustFill || Math.random() < 0.6) {
        filledCellCount += 1;
        doFill[charCode] = true;
      }
    }
    return doFill;
  }

  //Returns a random char from an array of chars
  static #getRandomChar(chars) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    return chars[randomIndex];
  }

  //Returns an object with an array of all chars
  //and an array of chars that make up at least 10% of the string
  static #getCharProfileFromString(string) {
    const profile = {};
    const chars = [];
    const topOccurringChars = [];

    for (const char of string) {
      if (!profile[char]) {
        chars.push(char);
        PuzzleGenerator.#addCharToProfile(profile, char);
      }
      profile[char].occurrence++;
      if (PuzzleGenerator.#doAddToTopOccurringChars(profile, string, char)) {
        topOccurringChars.push(char);
      }
      PuzzleGenerator.#validateCharacterDistribution(profile, string, char);
    }
    return {
      chars,
      topOccurringChars,
    };
  }

  static #validateCharacterDistribution(profile, string, char) {
    if (profile[char].occurrence > string.length * 0.9)
      throw APIErrors.INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION;
  }

  //Checks whether char comprises at least 10% of the string and
  //has not already been added to the top occurring chars
  static #doAddToTopOccurringChars(profile, string, char) {
    if (
      !profile[char].inTopOccurringChars &&
      profile[char].occurrence >= string.length / 10
    ) {
      profile[char].inTopOccurringChars = true;
      return true;
    }
  }

  //Adds initial profile object for a given char to the profile
  static #addCharToProfile(profile, char) {
    profile[char] = {
      occurrence: 0,
      inTopOccurringChars: false,
    };
  }

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

  static #getRowClue(index, puzzleSize, solution) {
    const lineString = solution.slice(
      index * puzzleSize,
      index * puzzleSize + puzzleSize
    );
    return PuzzleGenerator.#getLineClue(lineString);
  }

  static #getColumnClue(index, puzzleSize, solution) {
    let lineString = "";
    for (let i = index; i < solution.length; i += puzzleSize) {
      lineString += solution[i];
    }
    return PuzzleGenerator.#getLineClue(lineString);
  }

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
