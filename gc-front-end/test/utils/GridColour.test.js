import GridColour from "../../src/utils/GridColour";

describe("Grid colour test", () => {
  //?US5-GCR-1
  test("It should have the isDark property set to true where the sum of its RGB elements is less than 440", () => {
    //Arrange
    const gridColour = new GridColour("Dark", "rgba(85,85,85,1)");
    //Act
    const actual = gridColour.isDark;
    //Assert
    expect(actual).toBe(true);
  });
});
