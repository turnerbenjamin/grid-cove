export default class GridColour {
  #colourCode;
  #label;
  #rgba;
  #isDark;

  constructor(label, rgba, colourCode) {
    this.#label = label;
    this.#rgba = rgba;
    this.#colourCode = colourCode;
    this.#isDark = this.#checkIfIsDark(rgba);
  }

  #checkIfIsDark(rgba) {
    const rgbString = rgba.replaceAll(/[rgba()]/g, "");
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

  get rgba() {
    return this.#rgba;
  }
}
