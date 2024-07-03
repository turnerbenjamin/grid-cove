export default class GridColour {
  #colourCode;
  #label;
  #rgb;
  #isDark;
  #isEliminated;

  /**
   * Represents a GridColour object.
   * @constructor
   * @param {string} label - The label of the GridColour.
   * @param {string} rgb - The RGB value of the GridColour.
   * @param {string} colourCode - The colour code of the GridColour.
   * @param {boolean} [isEliminated=false] - Indicates if the GridColour represents eliminated.
   */
  constructor(label, rgb, colourCode, isEliminated = false) {
    this.#label = label;
    this.#rgb = rgb;
    this.#colourCode = colourCode;
    this.#isDark = this.#checkIfIsDark(rgb);
    this.#isEliminated = isEliminated;
  }

  //Determines if the colour is dark. Used to help ensure sufficient contrast when
  //selecting a foreground colour
  #checkIfIsDark(rgb) {
    const rgbString = rgb.replaceAll(/[rgba()]/g, "");
    const [red, green, blue] = rgbString.split(",");
    return parseInt(red) + parseInt(green) + parseInt(blue) < 256;
  }

  get isDark() {
    return this.#isDark;
  }

  get colourCode() {
    return this.#colourCode;
  }

  get label() {
    return this.#label;
  }

  get rgb() {
    return this.#rgb;
  }
  get isEliminated() {
    return this.#isEliminated;
  }
}
