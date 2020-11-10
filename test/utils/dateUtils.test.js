const {getReadableDate, getFriendlyDate} = require("../../src/utils/dateUtils");

describe("getReadableDate", () => {
  it("should return a date in the following format \"YYYY-MM-DD", () => {
    const date = getReadableDate("2020-02-05 09:22 (CDT)");
    expect(date).toContain("2020-02-05");
  });
});

describe("getFriendlyDate", () => {
  it("should return the date in a friendly format", () => {
    expect(getFriendlyDate("2020-01-01")).toBe("Jan 01, 2020");
    expect(getFriendlyDate("2020-02-29")).toBe("Feb 29, 2020");
    expect(getFriendlyDate("2020-12-31")).toBe("Dec 31, 2020");
  });

  it("should return \"Invalid Date\" on a non-date string or null", () => {
    expect(getFriendlyDate("badData")).toBe("Invalid Date");
    expect(getFriendlyDate(null)).toBe("Invalid Date");
  });
});
