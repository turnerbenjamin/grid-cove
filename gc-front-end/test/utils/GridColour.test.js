import GridColour from "../../src/utils/GridColour";

describe("Grid colour test", () => {
  //?US5-GCR-1
  test("It should have the isDark property set to true where the sum of its RGB elements is less than 256", () => {
    //Arrange
    const gridColour = new GridColour("Dark", "rgba(85,85,85,1)");
    //Act
    const actual = gridColour.isDark;
    //Assert
    expect(actual).toBe(true);
  });

  //?US5-GCR-2
  test("It should have the isDark property set to false where the sum of its RGB elements is grater than or equal to 256", () => {
    //Arrange
    const gridColour = new GridColour("Light", "rgba(85,85,86,1)");
    //Act
    const actual = gridColour.isDark;
    //Assert
    expect(actual).toBe(false);
  });
});
