import {
  GREY,
  colors,
  getDefaultColorArray,
  getColorBasedOnArrayLengthAndIndex,
  getColorArrayBasedOnLength,
  getOpacityByIndex,
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


describe("getOpacityByIndex", () => {
  it("should return an opacity value for a given index", () => {
    expect(getOpacityByIndex(0)).toBe(1);
    expect(getOpacityByIndex(1)).toBe(.9);
    expect(getOpacityByIndex(2)).toBe(.8);
    expect(getOpacityByIndex(3)).toBe(.7);
    expect(getOpacityByIndex(4)).toBe(.6);
    expect(getOpacityByIndex(5)).toBe(.5);
    expect(getOpacityByIndex(100)).toBe(.5);
    expect(getOpacityByIndex(-1)).toBe(.5);
  });
});
