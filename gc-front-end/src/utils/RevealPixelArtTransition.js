export default class RevealPixelArtTransition {
  static getDelay(x, y, gridSize, totalDelay = 500) {
    const percentAtWhichCellTransitions =
      (x - 1 + y - 1) / ((gridSize - 1) * 2);
    return percentAtWhichCellTransitions * totalDelay;
  }
}
