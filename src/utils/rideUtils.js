import {getAverageFromArray, sortArrayByAttributeInObject, getUniqueValuesFromDataArrayByAttribute} from "./dataUtils";
import {getColorBasedOnArrayLengthAndIndex} from "./colorUtils";

// This needs cleanup but had to fix a defect fast. Unit tests coming to help out with this.
export const filterRidesByTitle = (data, filters, matching = false) => {
  const filteredData = data.filter((ride) => {
    let isFiltered = false;
    if (ride.title) {
      if (!matching) {
        filters.forEach((filter) => {
          if (ride.title.includes(filter)) {
            // default is to filter out matching
            isFiltered = true;
          }
        });
        return !isFiltered;
      } else {
        let shouldBeKept = false;
        filters.forEach((filter) => {
          if (ride.title.includes(filter)) {
            shouldBeKept = true;
          }
        });
        return shouldBeKept;
      }
    }
  });

  return filteredData;
};

export const getRidesByLength = (data, length) => {
  return data.filter((ride) => ride.title.startsWith(length));
};

export const organizeRidesByLength = (data) => {
  const ridesByLength = {};

  const uniqueRideDurations = [
    ...new Set(
        data.map((ride) => {
          if (ride.duration) {
            return ride.duration;
          }
          throw new Error("One or more rides did not include duration.");
        }),
    ),
  ];

  uniqueRideDurations.forEach((duration) => {
    ridesByLength[duration.toString()] = getRidesByLength(data, duration);
  });

  return ridesByLength;
};

export const getUniqueRideTypes = (data) => {
  // Relies on ride titles matching similar to "45 Min Tabata Ride" format
  const uniqueRideTypes = [
    ...new Set(
        data.map((ride) => {
          const MIN = "min";
          const originalTitle = ride.title;
          const startIndex =
          originalTitle.toLowerCase().indexOf(MIN) + MIN.length + 1; // 1 for space
          let endIndex = originalTitle.toLowerCase().indexOf("ride") - 1; // 1 for space
          if (endIndex < 0) {
            endIndex = originalTitle.toLowerCase().indexOf("home") - 1; // Fixes an issue with Live From Home rides
          }

          if (endIndex < 0) {
            endIndex = originalTitle.length;
          }
          return originalTitle.substring(startIndex, endIndex);
        }),
    ),
  ];

  return uniqueRideTypes;
};

export const getBestRide = (cyclingData) => {
  if (cyclingData && cyclingData.length > 0) {
    const bestTotalWork = Math.max(...cyclingData.map((ride) => ride.output), 0);
    const bestRide = cyclingData.find(function(ride) {
      return ride.output == bestTotalWork;
    });

    return bestRide;
  }
  throw new Error("Bad input");
};

export const getBestRidesByLength = (data) => {
  const bestRides = [];
  if (data) {
    Object.keys(data).forEach((key, index) => {
      const ride = getBestRide(data[key]);
      bestRides.push(ride);
    });
  }
  return bestRides;
};

export const energy = {
  WATTS: "watts",
  KILOJOULES: "kj",
};

export const getAverageOutputs = (data, units = energy.KILOJOULES) => {
  const outputs = [];
  data.forEach((ride) => {
    const averageOutputPerMinute = ride.output / ride.duration;
    const output = {};
    output["average"] =
      units == energy.KILOJOULES ? averageOutputPerMinute : ride.averageOutput;
    output["title"] = ride.title;
    output["createdAt"] = ride.date;
    outputs.push(output);
  });

  return outputs;
};


export const getDatesWithMultipleRides = (data) => {
  const datesWithMultipleRides = [];
  const uniqueDates = getUniqueValuesFromDataArrayByAttribute(data, "date");
  // Determine which dates have multiple rides
  uniqueDates.forEach((date) => {
    const ridesOnSpecificDate = data.filter((effort) => {
      return effort.date === date;
    });

    if (ridesOnSpecificDate.length > 1) {
      datesWithMultipleRides.push(date);
    }
  });
  return datesWithMultipleRides;
};

export const filterSameDayRides = (data) => {
  if (data) {
    const datesWithMultipleRides = getDatesWithMultipleRides(data);

    // Find best ride for days with multiple rides
    datesWithMultipleRides.forEach((date) => {
      const ridesOnSpecificDay = data.filter((effort) => {
        return date == effort.date;
      });
      const bestRideForDay = getBestRide(ridesOnSpecificDay);

      // Remove best ride from ones to remove
      const bestRideIndex = ridesOnSpecificDay.indexOf(bestRideForDay);
      ridesOnSpecificDay.splice(bestRideIndex, 1);

      // Remove all rides for that day
      ridesOnSpecificDay.forEach((rideToRemove) => {
        const index = data.indexOf(rideToRemove);
        data.splice(index, 1);
      });
    });
  }

  return data;
};

export const getAverageOutputByRideLength = (data) => {
  const averages = [];
  const durations = Object.keys(data);
  for (const [i, duration] of durations.entries()) {
    const average = {};
    const rides = data[duration];
    average["value"] = getAverageFromArray(rides, "output");
    average["color"] = getColorBasedOnArrayLengthAndIndex(durations.length, i);
    average["duration"] = duration;
    averages.push(average);
  }
  return averages;
};


export const getClassesTakenByInstructor = (data) => {
  let classesTakenByInstructor = [];
  try {
    const uniqueInstructors = getUniqueValuesFromDataArrayByAttribute(
        data,
        "instructor",
    );

    uniqueInstructors.forEach((instructor) => {
      if (instructor !== "") {
        const value = {};
        value.instructor = instructor;
        value.count = data.filter(
            (ride) => ride.instructor === instructor,
        ).length;
        classesTakenByInstructor.push(value);
      }
    });

    // Sort by count
    classesTakenByInstructor = sortArrayByAttributeInObject(
        classesTakenByInstructor,
        "count",
    );
  } catch (e) {
    console.error("Error creating the instructor chart");
  }

  // Reverse so highest number is first
  return classesTakenByInstructor;
};

export const getAverageCadence = (data) => {
  const cadences = [];
  data.forEach((ride) => {
    const cadence = {};
    cadence["average"] = ride.averageCadence;
    cadence["createdAt"] = ride.date;
    cadences.push(cadence);
  });

  return cadences;
};

export const getAverageResistance = (data) => {
  const resistances = [];
  data.forEach((ride) => {
    const resistance = {};
    resistance["average"] = ride.averageResistance;
    resistance["createdAt"] = ride.date;
    resistances.push(resistance);
  });
  return resistances;
};

export const getOrganizedRidesSortedByOutput = (data) => {
  const newOrganizedRides = {};
  const durations = Object.keys(data);

  // eslint-disable-next-line no-unused-vars
  for (const [i, duration] of durations.entries()) {
    newOrganizedRides[duration] = sortArrayByAttributeInObject(
        data[duration],
        "output",
    );
  }
  return newOrganizedRides;
};


