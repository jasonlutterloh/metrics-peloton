const fs = require("fs");
const path = require("path");
const {csvToJson, mapCSVData} = require("../../src/utils/fileUtils");

let csv = "";

beforeEach(() => {
  try {
    csv = fs.readFileSync(path.resolve(__dirname, "./testData.csv"), "utf8");
  } catch (err) {
    console.error(err);
  }
});

describe("csvToJson", () => {
  it("should convert csv data to a json object", () => {
    const result = csvToJson(csv);
    expect(result).toHaveLength(167);
    const expectedKeys = ["Workout Timestamp", "Live/On-Demand", "Instructor Name", "Length (minutes)", "Fitness Discipline", "Type", "Title", "Class Timestamp", "Total Output", "Avg. Watts", "Avg. Resistance", "Avg. Cadence (RPM)", "Avg. Speed (mph)", "Distance (mi)", "Calories Burned", "Avg. Heartrate", "Avg. Incline", "Avg. Pace (min/mi)"];
    result.forEach((element) => {
      const keys = Object.keys(element);
      expect(keys).toEqual(expect.arrayContaining(expectedKeys));
    });
  });
});

describe("mapCSVData", () => {
  it("should map values from the CSVtoJSON object to a new JSON object", () => {
    const result = mapCSVData(csvToJson(csv));
    expect(result).toHaveLength(159); // A few less than the CSV to JSON because it excludes non Cycling rides
    const expectedKeys = ["date", "output", "averageOutput", "title", "duration", "instructor", "averageCadence", "averageResistance", "distance", "calories"];
    result.forEach((element) => {
      const keys = Object.keys(element);
      expect(keys).toEqual(expect.arrayContaining(expectedKeys));
    });
  });
});
