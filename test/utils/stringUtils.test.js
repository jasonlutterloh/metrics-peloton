import {trimRideTitle} from "../../src/utils/stringUtils";

describe("trimRideTitle", () => {
  it("should trim \"min\" from the ride title", () => {
    expect(trimRideTitle("30 min Tabata Ride")).toBe("Tabata Ride");
    expect(trimRideTitle("45 min Together We Go Far")).toBe(
        "Together We Go Far",
    );
    expect(trimRideTitle("Tabata Ride")).toBe("Tabata Ride");
  });
});
