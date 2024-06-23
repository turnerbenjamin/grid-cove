export default class GridColour {
  #colourCode;
  #label;
  #rgb;
  #isDark;

  constructor(label, rgb, colourCode) {
    this.#label = label;
    this.#rgb = rgb;
    this.#colourCode = colourCode;
    this.#isDark = this.#checkIfIsDark(rgb);
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
}
