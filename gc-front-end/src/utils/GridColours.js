import GridColour from "./GridColour";

export default class GridColours {
  static #rgbaCodes = {
    BLACK: "rgba(34, 34, 34, 1)",
    SAPPHIRE: "rgba(42, 102, 212, 1)",
    BLUE: "rgba(43, 206, 255, 1)",
    GREY: "rgba(68, 68, 68, 1)",
    CYAN: "rgba(83, 222, 247, 1)",
    MINT: "rgba(86, 213, 118, 1)",
    GREEN: "rgba(94, 214, 46, 1)",
    PURPLE: "rgba(171, 64, 183, 1)",
    APPLE: "rgba(174, 235, 32, 1)",
    WHITE: "rgba(238, 238, 238, 1)",
    PINK: "rgba(250, 48, 163, 1)",
    GOLD: "rgba(254, 205, 12, 1)",
    YELLOW: "rgba(254, 247, 17, 1)",
    RED: "rgba(255, 20, 52, 1)",
    AMBER: "rgba(255, 100, 29, 1)",
    ORANGE: "rgba(255, 153, 29, 1)",
  };

  static #colourCodesToLabelMap = {
    0: "WHITE",
    1: "BLACK",
    2: "BLUE",
    3: "GREY",
    4: "CYAN",
    5: "MINT",
    6: "GREEN",
    7: "PURPLE",
    8: "APPLE",
    9: "SAPPHIRE",
    A: "PINK",
    B: "GOLD",
    C: "YELLOW",
    D: "RED",
    E: "AMBER",
    F: "ORANGE",
  };

  static #labelToColourCodeMap = {
    BLACK: "0",
    SAPPHIRE: "1",
    BLUE: "2",
    GREY: "3",
    CYAN: "4",
    MINT: "5",
    GREEN: "6",
    PURPLE: "7",
    APPLE: "8",
    WHITE: "9",
    PINK: "A",
    GOLD: "B",
    YELLOW: "C",
    RED: "D",
    AMBER: "E",
    ORANGE: "F",
  };

  static #BLACK = new GridColour(
    "Black",
    this.#rgbaCodes.BLACK,
    this.#labelToColourCodeMap.BLACK
  );

  static #SAPPHIRE = new GridColour(
    "Sapphire",
    this.#rgbaCodes.SAPPHIRE,
    this.#labelToColourCodeMap.SAPPHIRE
  );

  static #BLUE = new GridColour(
    "Blue",
    this.#rgbaCodes.BLUE,
    this.#labelToColourCodeMap.BLUE
  );

  static #GREY = new GridColour(
    "Grey",
    this.#rgbaCodes.GREY,
    this.#labelToColourCodeMap.GREY
  );

  static #CYAN = new GridColour(
    "Cyan",
    this.#rgbaCodes.CYAN,
    this.#labelToColourCodeMap.CYAN
  );
  static #MINT = new GridColour(
    "Mint",
    this.#rgbaCodes.MINT,
    this.#labelToColourCodeMap.MINT
  );

  static #GREEN = new GridColour(
    "Green",
    this.#rgbaCodes.GREEN,
    this.#labelToColourCodeMap.GREEN
  );

  static #PURPLE = new GridColour(
    "Purple",
    this.#rgbaCodes.PURPLE,
    this.#labelToColourCodeMap.PURPLE
  );

  static #APPLE = new GridColour(
    "Apple",
    this.#rgbaCodes.APPLE,
    this.#labelToColourCodeMap.APPLE
  );

  static #WHITE = new GridColour(
    "White",
    this.#rgbaCodes.WHITE,
    this.#labelToColourCodeMap.WHITE
  );

  static #PINK = new GridColour(
    "Pink",
    this.#rgbaCodes.PINK,
    this.#labelToColourCodeMap.PINK
  );

  static #GOLD = new GridColour(
    "Gold",
    this.#rgbaCodes.GOLD,
    this.#labelToColourCodeMap.GOLD
  );

  static #YELLOW = new GridColour(
    "Yellow",
    this.#rgbaCodes.YELLOW,
    this.#labelToColourCodeMap.YELLOW
  );

  static #RED = new GridColour(
    "Red",
    this.#rgbaCodes.RED,
    this.#labelToColourCodeMap.RED
  );

  static #AMBER = new GridColour(
    "Amber",
    this.#rgbaCodes.AMBER,
    this.#labelToColourCodeMap.AMBER
  );

  static #ORANGE = new GridColour(
    "Orange",
    this.#rgbaCodes.ORANGE,
    this.#labelToColourCodeMap.ORANGE
  );

  static get BLACK() {
    return this.#BLACK;
  }

  static get SAPPHIRE() {
    return this.#SAPPHIRE;
  }

  static get BLUE() {
    return this.#BLUE;
  }

  static get GREY() {
    return this.#GREY;
  }

  static get CYAN() {
    return this.#CYAN;
  }

  static get MINT() {
    return this.#MINT;
  }

  static get GREEN() {
    return this.#GREEN;
  }

  static get PURPLE() {
    return this.#PURPLE;
  }

  static get APPLE() {
    return this.#APPLE;
  }

  static get WHITE() {
    return this.#WHITE;
  }

  static get PINK() {
    return this.#PINK;
  }

  static get GOLD() {
    return this.#GOLD;
  }

  static get YELLOW() {
    return this.#YELLOW;
  }

  static get RED() {
    return this.#RED;
  }

  static get AMBER() {
    return this.#AMBER;
  }

  static get ORANGE() {
    return this.#ORANGE;
  }

  static getAllColours() {
    return [
      this.BLACK,
      this.SAPPHIRE,
      this.BLUE,
      this.GREY,
      this.CYAN,
      this.MINT,
      this.GREEN,
      this.PURPLE,
      this.APPLE,
      this.WHITE,
      this.PINK,
      this.GOLD,
      this.YELLOW,
      this.RED,
      this.AMBER,
      this.ORANGE,
    ];
  }

  static getColourByColourCode(colourCode) {
    return this[this.#colourCodesToLabelMap[colourCode]];
  }
}
