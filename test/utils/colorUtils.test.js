import {
  GREY,
  colors,
  getDefaultColorArray,
  getColorBasedOnArrayLengthAndIndex,
  getColorArrayBasedOnLength,
} from "../../src/utils/colorUtils";

describe("getDefaultColorArray", () => {
  it("should return the colors", () => {
    const colorsOfTheRainbow = getDefaultColorArray();
    expect(colorsOfTheRainbow).toHaveLength(Object.keys(colors).length);
  });
});

describe("getColorBasedOnArrayLengthAndIndex", () => {
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
    expect(longArray[10]).toBe(GREY);
    expect(longArray[11]).toBe(GREY);
    expect(longArray[12]).toBe(GREY);
    expect(longArray[13]).toBe(GREY);
    expect(longArray[14]).toBe(GREY);
  });
});
