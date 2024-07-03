export default class RevealPixelArtTransition {
  /**
   * Calculates the delay for transitioning a cell in a pixel art grid.
   *
   * @param {number} x - The x-coordinate of the cell.
   * @param {number} y - The y-coordinate of the cell.
   * @param {number} gridSize - The size of the grid.
   * @param {number} [totalDelay=500] - The total delay for the transition.
   * @returns {number} The delay for transitioning the cell.
   */
  static getDelay(x, y, gridSize, totalDelay = 500) {
    const percentAtWhichCellTransitions =
      (x - 1 + y - 1) / ((gridSize - 1) * 2);
    return percentAtWhichCellTransitions * totalDelay;
  }
}
