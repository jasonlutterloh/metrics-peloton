import {
  GREY,
  colors,
  getDefaultColorArray,
  getColorBasedOnArrayLengthAndIndex,
  getColorArrayBasedOnLength,
} from "../../src/utils/colorUtils";

describe("getDefaultColorArray", () => {
  it("should return the colors of the rainbow", () => {
    const colorsOfTheRainbow = getDefaultColorArray();
    expect(colorsOfTheRainbow).toHaveLength(9);
    expect(colorsOfTheRainbow[8]).toBe(colors.red);
    expect(colorsOfTheRainbow[7]).toBe(colors.pink);
    expect(colorsOfTheRainbow[6]).toBe(colors.orange);
    expect(colorsOfTheRainbow[5]).toBe(colors.yellow);
    expect(colorsOfTheRainbow[4]).toBe(colors.green);
    expect(colorsOfTheRainbow[3]).toBe(colors.teal);
    expect(colorsOfTheRainbow[2]).toBe(colors.blue);
    expect(colorsOfTheRainbow[1]).toBe(colors.violet);
    expect(colorsOfTheRainbow[0]).toBe(colors.purple);
  });
});

describe("getColorBasedOnArrayLengthAndIndex", () => {
  it("should return a color based on the array and length passed in", () => {
    // expect(getColorBasedOnArrayLengthAndIndex(1,1)).toBe(colors.red);
    expect(getColorBasedOnArrayLengthAndIndex(9, 0)).toBe(colors.purple);
    expect(getColorBasedOnArrayLengthAndIndex(9, 1)).toBe(colors.violet);
    expect(getColorBasedOnArrayLengthAndIndex(9, 2)).toBe(colors.blue);
    expect(getColorBasedOnArrayLengthAndIndex(9, 3)).toBe(colors.teal);
    expect(getColorBasedOnArrayLengthAndIndex(9, 4)).toBe(colors.green);
    expect(getColorBasedOnArrayLengthAndIndex(9, 5)).toBe(colors.yellow);
    expect(getColorBasedOnArrayLengthAndIndex(9, 6)).toBe(colors.orange);
    expect(getColorBasedOnArrayLengthAndIndex(9, 7)).toBe(colors.pink);
    expect(getColorBasedOnArrayLengthAndIndex(9, 8)).toBe(colors.red);

    expect(getColorBasedOnArrayLengthAndIndex(8, 0)).toBe(colors.purple);
    expect(getColorBasedOnArrayLengthAndIndex(8, 1)).toBe(colors.violet);
    expect(getColorBasedOnArrayLengthAndIndex(8, 2)).toBe(colors.blue);
    expect(getColorBasedOnArrayLengthAndIndex(8, 3)).toBe(colors.teal);
    expect(getColorBasedOnArrayLengthAndIndex(8, 4)).toBe(colors.green);
    expect(getColorBasedOnArrayLengthAndIndex(8, 5)).toBe(colors.yellow);
    expect(getColorBasedOnArrayLengthAndIndex(8, 6)).toBe(colors.orange);
    expect(getColorBasedOnArrayLengthAndIndex(8, 7)).toBe(colors.pink);

    expect(getColorBasedOnArrayLengthAndIndex(7, 0)).toBe(colors.purple);
    expect(getColorBasedOnArrayLengthAndIndex(7, 1)).toBe(colors.violet);
    expect(getColorBasedOnArrayLengthAndIndex(7, 2)).toBe(colors.blue);
    expect(getColorBasedOnArrayLengthAndIndex(7, 3)).toBe(colors.teal);
    expect(getColorBasedOnArrayLengthAndIndex(7, 4)).toBe(colors.green);
    expect(getColorBasedOnArrayLengthAndIndex(7, 5)).toBe(colors.yellow);
    expect(getColorBasedOnArrayLengthAndIndex(7, 6)).toBe(colors.orange);

    expect(getColorBasedOnArrayLengthAndIndex(6, 0)).toBe(colors.purple);
    expect(getColorBasedOnArrayLengthAndIndex(6, 1)).toBe(colors.violet);
    expect(getColorBasedOnArrayLengthAndIndex(6, 2)).toBe(colors.blue);
    expect(getColorBasedOnArrayLengthAndIndex(6, 3)).toBe(colors.teal);
    expect(getColorBasedOnArrayLengthAndIndex(6, 4)).toBe(colors.green);
    expect(getColorBasedOnArrayLengthAndIndex(6, 5)).toBe(colors.yellow);

    expect(getColorBasedOnArrayLengthAndIndex(5, 0)).toBe(colors.purple);
    expect(getColorBasedOnArrayLengthAndIndex(5, 1)).toBe(colors.violet);
    expect(getColorBasedOnArrayLengthAndIndex(5, 2)).toBe(colors.blue);
    expect(getColorBasedOnArrayLengthAndIndex(5, 3)).toBe(colors.teal);
    expect(getColorBasedOnArrayLengthAndIndex(5, 4)).toBe(colors.green);

    expect(getColorBasedOnArrayLengthAndIndex(4, 0)).toBe(colors.purple);
    expect(getColorBasedOnArrayLengthAndIndex(4, 1)).toBe(colors.blue);
    expect(getColorBasedOnArrayLengthAndIndex(4, 2)).toBe(colors.green);
    expect(getColorBasedOnArrayLengthAndIndex(4, 3)).toBe(colors.orange);

    expect(getColorBasedOnArrayLengthAndIndex(3, 0)).toBe(colors.purple);
    expect(getColorBasedOnArrayLengthAndIndex(3, 1)).toBe(colors.teal);
    expect(getColorBasedOnArrayLengthAndIndex(3, 2)).toBe(colors.orange);

    expect(getColorBasedOnArrayLengthAndIndex(2, 0)).toBe(colors.purple);
    expect(getColorBasedOnArrayLengthAndIndex(2, 1)).toBe(colors.green);

    expect(getColorBasedOnArrayLengthAndIndex(1, 0)).toBe(colors.purple);

    expect(getColorBasedOnArrayLengthAndIndex(10, 9)).toBe(colors.grey);
  });
  it("should throw an error if index is out of range", () => {
    expect(() => {
      getColorBasedOnArrayLengthAndIndex(1, 2);
    }).toThrow();
  });
});

describe("getColorArrayBasedOnLength", () => {
  it("should return an array of the given length", () => {
    for (let index = 0; index < 10; index++) {
      expect(getColorArrayBasedOnLength(index)).toHaveLength(index);
    }
  });
  it("should compensate for any length over 9 to be the color grey", () => {
    const longArray = getColorArrayBasedOnLength(15);
    expect(longArray[9]).toBe(GREY);
    expect(longArray[10]).toBe(GREY);
    expect(longArray[11]).toBe(GREY);
    expect(longArray[12]).toBe(GREY);
    expect(longArray[13]).toBe(GREY);
    expect(longArray[14]).toBe(GREY);
  });
});
