import {trimTitle} from "./rideUtils";

/**
 * Converts a CSV to JSON
 * @param {string} csv CSV
 * @return {json} Parsed CSV as JSON
 */
export const csvToJson = (csv) => {
  const lines = csv.split("\n");
  const result = [];
  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    // Fixes issue with quoted strings in CSV
    const filteredLine = lines[i].replace(/"[^"]+"/g, function(quotedString) {
      quotedString = quotedString.replace(/,/g, "");
      quotedString = quotedString.replace(/"/g, "");
      return quotedString;
    });
    const currentline = filteredLine.split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
};

/**
 * Determines if file is valid or not.
 * This could be done a lot cleaner and thoroughly.
 * @param {Array} data Array of data
 * @return {Boolean} result result of validation
 */
export const validateCSV = (data = []) => {
  if (data.length > 1) {
    const keys = Object.keys(data[0]);

    if (keys.find((value) => value === "Workout Timestamp") &&
    keys.find((value) => value === "Total Output") &&
    keys.find((value) => value === "Fitness Discipline")) {
      return true;
    }
  }
  throw new Error("CSV is not valid");
};

/**
 * Determines if distance is in miles or km.
 * I'm not thrilled with how this is done but needed a quick fix.
 * @param {Array} data Array of data
 * @return {String} "mi" or "km"
 */
export const getDistanceUnit = (data = []) => {
  let isKm = undefined;
  if (data.length > 1) {
    const keys = Object.keys(data[0]);
    isKm = keys.find((value) => value === "Distance (km)");
  }
  if (isKm) {
    return "km";
  }
  return "mi"; // Defaulting to miles
};

/**
 * Maps the given Peloton Workouts parsed CSV to JSON
 * @param {array} data parsed Peloton CSV Workout Data as JSON
 * @param {string} distanceUnit "mi" or "km"
 * @param {string} discipline Default: Cycling
 * @return {array} Cycling Data
 */
export const mapCSVData = (data, distanceUnit = "mi", discipline = "Cycling") => {
  const mappedData = [];

  data.forEach((effort) => {
    if (discipline === effort["Fitness Discipline"]) {
      const output = parseInt(effort["Total Output"]);
      const averageWatts = parseInt(effort["Avg. Watts"]);
      const duration = parseInt(effort["Length (minutes)"]);
      const distance = parseFloat(effort["Distance ("+ distanceUnit +")"]);
      const title = effort["Title"];

      // NaN/Null check for missing data from Peloton and Just Rides
      if (output && averageWatts && duration && distance && !isJustRide(title)) {
        const ride = {};
        const timestamp = effort["Workout Timestamp"];
        ride.date = timestamp.substr(0, timestamp.indexOf(" "));
        ride.output = output;
        ride.averageOutput = averageWatts;
        ride.title = title;
        ride.duration = duration;
        ride.instructor = effort["Instructor Name"];
        ride.averageCadence = effort["Avg. Cadence (RPM)"];
        ride.averageResistance = effort["Avg. Resistance"].replace("%", "");
        ride.distance = distance;
        ride.calories = parseFloat(effort["Calories Burned"]);
        ride.type = trimTitle(effort["Title"]);
        mappedData.push(ride);
      }
    }
  });

  return mappedData;
};

/**
 * Returns if ride title contains "just ride" or not
 * @param {string} title
 * @return {boolean}
 */
const isJustRide = (title) => {
  return title.toLowerCase().includes("just ride");
};
