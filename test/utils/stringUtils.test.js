import {trimRideTitle, convertStringToID} from "../../src/utils/stringUtils";

describe("trimRideTitle", () => {
  it("should trim \"min\" from the ride title", () => {
    expect(trimRideTitle("30 min Tabata Ride")).toBe("Tabata Ride");
    expect(trimRideTitle("45 min Together We Go Far")).toBe(
        "Together We Go Far"
    );
    expect(trimRideTitle("Tabata Ride")).toBe("Tabata Ride");
  });
});

describe("convertStringToID", () => {
  it("should make a string lowercase and insert dashes for spaces", () => {
    expect(convertStringToID("This is my string")).toBe("this-is-my-string");
    expect(convertStringToID("Oneword")).toBe("oneword");
    expect(convertStringToID("This is my string with 123")).toBe("this-is-my-string-with-123");
    expect(convertStringToID("123456")).toBe("123456");
  });
});
