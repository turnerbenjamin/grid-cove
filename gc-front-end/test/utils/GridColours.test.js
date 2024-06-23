import GridColours from "../../src/utils/GridColours";

describe("Grid colours test", () => {
  //?US5-GCS-1
  test("It should return an array of 16 GridColour objects", () => {
    //Act
    const actual = GridColours.getAllColours().length;
    //Assert
    expect(actual).toBe(16);
  });

  //?US5-GCS-2
  test("It should set unique colourCodes for each object", () => {
    //Act
    const actual = new Set(
      GridColours.getAllColours().map((gc) => gc.colourCode)
    ).size;
    //Assert
    expect(actual).toBe(16);
  });
});
