const {
  getReadableDate,
  getFriendlyDate,
  isDateSameOrBeforeGivenDate,
  isDateSameOrAfterGivenDate,
  subtractNMonthsFromDate
} = require("../../src/lib/utils/dateUtils");

describe("getReadableDate", () => {
  it('should return a date in the following format "YYYY-MM-DD', () => {
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

  it('should return "Invalid Date" on a non-date string or null', () => {
    expect(getFriendlyDate("badData")).toBe("Invalid Date");
    expect(getFriendlyDate(null)).toBe("Invalid Date");
  });
});

describe("isDateSameOrBeforeGivenDate", () => {
  it("should return true if date is same or before a given date", () => {
    expect(isDateSameOrBeforeGivenDate("2020-01-01", "2020-01-10")).toBe(true);
    expect(isDateSameOrBeforeGivenDate("2019-01-01", "2020-01-10")).toBe(true);
    expect(isDateSameOrBeforeGivenDate("2020-01-10", "2020-01-10")).toBe(true);
  });
  it("should return false if date is after a given date", () => {
    expect(isDateSameOrBeforeGivenDate("2020-01-01", "2019-01-10")).toBe(false);
    expect(isDateSameOrBeforeGivenDate("2020-01-02", "2020-01-01")).toBe(false);
  });
});

describe("isDateSameOrAfterGivenDate", () => {
  it("should return false if date is before a given date", () => {
    expect(isDateSameOrAfterGivenDate("2020-01-01", "2020-01-10")).toBe(false);
    expect(isDateSameOrAfterGivenDate("2019-01-01", "2020-01-10")).toBe(false);
  });
  it("should return false if date is same or after a given date", () => {
    expect(isDateSameOrAfterGivenDate("2020-01-10", "2020-01-10")).toBe(true);
    expect(isDateSameOrAfterGivenDate("2020-01-01", "2019-01-10")).toBe(true);
    expect(isDateSameOrAfterGivenDate("2020-01-02", "2020-01-01")).toBe(true);
  });
});

describe("subtractNMonthsFromDate", () => {
  it("should return a date n months from the given date", () => {
    expect(subtractNMonthsFromDate("2021-07-01", 6)).toBe("2021-01-01");
  });
  it("should handle 31st dates well", () => {
    expect(subtractNMonthsFromDate("2021-07-31", 1)).toBe("2021-06-30");
  });
});
