const {
  filterRidesByTitle,
  getRidesByLength,
  organizeRidesByLength,
  getUniqueRideTypes,
  getBestRide,
  getBestRidesByLength,
  getAverageOutputs,
  sliceArrayByGivenMax
} = require("../../src/store/utils");

const sampleData = [
  { title: "45 min HIIT Ride", output: 400, duration: 45 },
  { title: "45 min Tabata Ride", output: 300, duration: 45 },
  { title: "30 Min Climb Ride", output: 200, duration: 30 },
  { title: "45 min HIIT Ride", output: 350, duration: 45 },
  { title: "30 min Tabata Ride", output: 200, duration: 30 },
  { title: "20 min Climb Ride", output: 100, duration: 20 },
  { title: "45 min Tabata Ride", output: 300, duration: 45 },
  { title: "30 min Ministry of Sound: I Love Ibiza", output: 200, duration: 30 },
  { title: "30 min Tabata Ride: Live From Home", output: 200, duration: 30 },
  { title: "20 min XOXO Cody", output: 110, duration: 20 },
];

describe("filterRidesByTitle", () => {
  it("should remove any rides that have a title matching the list of filters", () => {
    let filteredRideTitle = "Tabata";
    let result = filterRidesByTitle(sampleData, [filteredRideTitle]);
    expect(result).toHaveLength(6);
    result.forEach((element) => {
      expect(element).toEqual(expect.not.stringContaining(filteredRideTitle));
    });
  });
  it("should return an empty array if all items are filtered out", () => {
    let filteredRides = ["Tabata", "Climb", "HIIT", "XOXO Cody", "30 min Ministry of Sound: I Love Ibiza"];
    let result = filterRidesByTitle(sampleData, filteredRides);
    expect(result).toHaveLength(0);
  });
  it("should leave any rides that have a title matching the list of filters if matching is sent as true", () => {
    let filteredRideTitle = "Tabata";
    let result = filterRidesByTitle(sampleData, [filteredRideTitle], true);
    expect(result).toHaveLength(4);
    result.forEach((element) => {
      expect(element.title).toContain(filteredRideTitle);
    });
  });
  it("should return an empty array if all items are filtered out when matching is true", () => {
    let filteredRides = ["FTP"];
    let result = filterRidesByTitle(sampleData, filteredRides, true);
    expect(result).toHaveLength(0);
  });
});

describe("getRidesByLength", () => {
  it("should return all rides that start with the given length", () => {
    let rideLength = 30;
    let result = getRidesByLength(sampleData, rideLength);
    result.forEach((element) => {
      expect(element.title.startsWith(rideLength)).toBe(true);
    });
  });
  it("should return no rides if none match the given length", () => {
    let rideLength = 60;
    let result = getRidesByLength(sampleData, rideLength);
    expect(result).toHaveLength(0);
  });
});

describe("organizeRidesByLength", () => {
  it("should organize ride arrays in an object by length", () => {
    let organizedRides = organizeRidesByLength(sampleData);
    expect(Object.keys(organizedRides).length).toBe(3);
    expect(organizedRides[20].length).toBe(2);
    expect(organizedRides[30].length).toBe(4);
    expect(organizedRides[45].length).toBe(4);

    //Just verifying one
    organizedRides[45].forEach((element) => {
      expect(element.duration).toBe(45);
    });
  });
  it("should handle an empty array gracefully", () => {
    expect(organizeRidesByLength([])).toMatchObject({});
  });
  it("should throw an error if data does not include duration", () => {
    let badData = [...sampleData, { title: "30 Min I dont have a duration" }];
    expect(() => {
      organizeRidesByLength(badData);
    }).toThrowError();
  });
});

describe("getUniqueRideTypes", () => {
  it("should return unique ride types", () => {
    let result = getUniqueRideTypes(sampleData);
    expect(result).toHaveLength(5);
    expect(result).toEqual(
      expect.arrayContaining(["Tabata", "HIIT", "Climb", "XOXO Cody", "Ministry of Sound: I Love Ibiza"])
    );
  });
});

describe("getBestRide", () => {
  it("should return the ride object with the highest output", () => {
    let result = getBestRide(sampleData);
    // Hardcoded the first record has having the highest output
    expect(result).toMatchObject(sampleData[0]);
  });
  it("should return an error if input is empty", () => {
    expect(()=>getBestRide([])).toThrowError();
  })
});

describe("getBestRidesByLength", () => {
  it("should return the best rides by length", () => {
    let result = getBestRidesByLength(organizeRidesByLength(sampleData));
    
    // 45 Minute Ride
    expect(result[2]).toMatchObject(sampleData[0]);
    // 30 Minute Ride (earliest in the list wins in a tie)
    expect(result[1]).toMatchObject(sampleData[2]);
    // 20 Minute Ride
    expect(result[0]).toMatchObject(sampleData[9]);
  })
});

describe("getAverageOutputs", () => {
  it("should average output per minute by ride", () => {
    let result = getAverageOutputs(sampleData);
    expect(result).toHaveLength(sampleData.length);
    expect(result[0].average).toBe(sampleData[0].output/sampleData[0].duration);
    expect(result[1].average).toBe(sampleData[1].output/sampleData[1].duration);
    expect(result[2].average).toBe(sampleData[2].output/sampleData[2].duration);
    expect(result[3].average).toBe(sampleData[3].output/sampleData[3].duration);
    expect(result[4].average).toBe(sampleData[4].output/sampleData[4].duration);
    expect(result[5].average).toBe(sampleData[5].output/sampleData[5].duration);
    expect(result[6].average).toBe(sampleData[6].output/sampleData[6].duration);
    expect(result[7].average).toBe(sampleData[7].output/sampleData[7].duration);
    expect(result[8].average).toBe(sampleData[8].output/sampleData[8].duration);
    expect(result[9].average).toBe(sampleData[9].output/sampleData[9].duration);

    expect(result[0].title).toBe(sampleData[0].title);
    expect(result[1].title).toBe(sampleData[1].title);
    expect(result[2].title).toBe(sampleData[2].title);
    expect(result[3].title).toBe(sampleData[3].title);
    expect(result[4].title).toBe(sampleData[4].title);
    expect(result[5].title).toBe(sampleData[5].title);
    expect(result[6].title).toBe(sampleData[6].title);
    expect(result[7].title).toBe(sampleData[7].title);
    expect(result[8].title).toBe(sampleData[8].title);
    expect(result[9].title).toBe(sampleData[9].title);
  })
});

describe('sliceArrayByGivenMax', () => {
  const array = [1,2,3,4,5];
  it('should shorten array given a max', () => {
    expect(sliceArrayByGivenMax(array,3)).toHaveLength(3);
    expect(sliceArrayByGivenMax(array,2)).toStrictEqual([4,5]);
  });
  it('should just return the given array of the length is less than max', () => {
    expect(sliceArrayByGivenMax(array,8)).toHaveLength(5);
    expect(sliceArrayByGivenMax(array,8)).toStrictEqual([1,2,3,4,5]);
  })
})