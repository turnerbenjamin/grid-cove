export default class GridColour {
  #colourCode;
  #label;
  #rgb;
  #isDark;
  #isEliminated;

  constructor(label, rgb, colourCode, isEliminated = false) {
    this.#label = label;
    this.#rgb = rgb;
    this.#colourCode = colourCode;
    this.#isDark = this.#checkIfIsDark(rgb);
    this.#isEliminated = isEliminated;
  }

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
