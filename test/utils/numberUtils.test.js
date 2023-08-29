import { getRoundNumber, formatNumberWithCommas } from "../../src/routes/utils/numberUtils";

describe("getRoundNumber", () => {
  it("should round a number and only have one decimal places", () => {
    expect(getRoundNumber(1.1)).toBe(1.1);
    expect(getRoundNumber(0.1)).toBe(0.1);
    expect(getRoundNumber(100.11)).toBe(100.1);
    expect(getRoundNumber(0)).toBe(0);
    expect(getRoundNumber(200)).toBe(200);
    expect(getRoundNumber(100.1243546574327)).toBe(100.1);
    expect(getRoundNumber(100.9783596886)).toBe(101);
  });
});

// This method is not safe for numbers with more than three decimal places
describe("formatNumberWithCommas", () => {
  it("should add commas in the proper places", () => {
    expect(formatNumberWithCommas(100)).toBe("100");
    expect(formatNumberWithCommas(1000)).toBe("1,000");
    expect(formatNumberWithCommas(10000)).toBe("10,000");
    expect(formatNumberWithCommas(100000)).toBe("100,000");
    expect(formatNumberWithCommas(1000000)).toBe("1,000,000");
  });
  it("should do nothing with strings or other input", () => {
    expect(formatNumberWithCommas("string")).toBe("string");
  });
});
