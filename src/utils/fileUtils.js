import {trimTitle} from "./rideUtils";

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

export const mapCSVData = (data, discipline = "Cycling") => {
  const mappedData = [];

  data.forEach((effort) => {
    if (discipline === effort["Fitness Discipline"]) {
      const output = parseInt(effort["Total Output"]);
      const averageWatts = parseInt(effort["Avg. Watts"]);
      const duration = parseInt(effort["Length (minutes)"]);
      const distance = parseFloat(effort["Distance (mi)"]);
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

const isJustRide = (title) => {
  return title.toLowerCase().includes("just ride");
};
