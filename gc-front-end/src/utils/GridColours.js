import GridColour from "./GridColour";

export default class GridColours {
  static #rgbCodes = {
    BLACK: "rgb(34, 34, 34)",
    SAPPHIRE: "rgb(42, 102, 212)",
    BLUE: "rgb(43, 206, 255)",
    GREY: "rgb(68, 68, 68)",
    BROWN: "rgb(160,82,45)",
    MINT: "rgb(86, 213, 118)",
    GREEN: "rgb(94, 214, 46)",
    PURPLE: "rgb(171, 64, 183)",
    CREAM: "rgb(248,226,177)",
    WHITE: "rgb(238, 238, 238)",
    PINK: "rgb(250, 48, 163)",
    GOLD: "rgb(254, 205, 12)",
    YELLOW: "rgb(254, 247, 17)",
    RED: "rgb(255, 20, 52)",
    AMBER: "rgb(255, 100, 29)",
    ORANGE: "rgb(255, 153, 29)",
  };

  static #colourCodesToLabelMap = {
    0: "WHITE",
    1: "BLACK",
    2: "BLUE",
    3: "GREY",
    4: "BROWN",
    5: "MINT",
    6: "GREEN",
    7: "PURPLE",
    8: "CREAM",
    9: "SAPPHIRE",
    A: "PINK",
    B: "GOLD",
    C: "YELLOW",
    D: "RED",
    E: "AMBER",
    F: "ORANGE",
  };

  static #labelToColourCodeMap = {
    WHITE: "0",
    BLACK: "1",
    BLUE: "2",
    GREY: "3",
    BROWN: "4",
    MINT: "5",
    GREEN: "6",
    PURPLE: "7",
    CREAM: "8",
    SAPPHIRE: "9",
    PINK: "A",
    GOLD: "B",
    YELLOW: "C",
    RED: "D",
    AMBER: "E",
    ORANGE: "F",
  };

  static #BLACK = new GridColour(
    "Black",
    this.#rgbCodes.BLACK,
    this.#labelToColourCodeMap.BLACK
  );

  static #SAPPHIRE = new GridColour(
    "Sapphire",
    this.#rgbCodes.SAPPHIRE,
    this.#labelToColourCodeMap.SAPPHIRE
  );

  static #BLUE = new GridColour(
    "Blue",
    this.#rgbCodes.BLUE,
    this.#labelToColourCodeMap.BLUE
  );

  static #GREY = new GridColour(
    "Grey",
    this.#rgbCodes.GREY,
    this.#labelToColourCodeMap.GREY
  );

  static #BROWN = new GridColour(
    "Brown",
    this.#rgbCodes.BROWN,
    this.#labelToColourCodeMap.BROWN
  );
  static #MINT = new GridColour(
    "Mint",
    this.#rgbCodes.MINT,
    this.#labelToColourCodeMap.MINT
  );

  static #GREEN = new GridColour(
    "Green",
    this.#rgbCodes.GREEN,
    this.#labelToColourCodeMap.GREEN
  );

  static #PURPLE = new GridColour(
    "Purple",
    this.#rgbCodes.PURPLE,
    this.#labelToColourCodeMap.PURPLE
  );

  static #CREAM = new GridColour(
    "Cream",
    this.#rgbCodes.CREAM,
    this.#labelToColourCodeMap.CREAM
  );

  static #WHITE = new GridColour(
    "White",
    this.#rgbCodes.WHITE,
    this.#labelToColourCodeMap.WHITE
  );

  static #PINK = new GridColour(
    "Pink",
    this.#rgbCodes.PINK,
    this.#labelToColourCodeMap.PINK
  );

  static #GOLD = new GridColour(
    "Gold",
    this.#rgbCodes.GOLD,
    this.#labelToColourCodeMap.GOLD
  );

  static #YELLOW = new GridColour(
    "Yellow",
    this.#rgbCodes.YELLOW,
    this.#labelToColourCodeMap.YELLOW
  );

  static #RED = new GridColour(
    "Red",
    this.#rgbCodes.RED,
    this.#labelToColourCodeMap.RED
  );

  static #AMBER = new GridColour(
    "Amber",
    this.#rgbCodes.AMBER,
    this.#labelToColourCodeMap.AMBER
  );

  static #ORANGE = new GridColour(
    "Orange",
    this.#rgbCodes.ORANGE,
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

  static get BROWN() {
    return this.#BROWN;
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

  static get CREAM() {
    return this.#CREAM;
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
      this.BROWN,
      this.MINT,
      this.GREEN,
      this.PURPLE,
      this.CREAM,
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
