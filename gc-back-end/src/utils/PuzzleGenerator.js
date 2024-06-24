export default class PuzzleGenerator {
  static generate(pixelArt) {
    const solution = PuzzleGenerator.#getSolutionString(pixelArt);
    return {
      solution,
    };
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
    }
    return {
      chars,
      topOccurringChars,
    };
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
}
