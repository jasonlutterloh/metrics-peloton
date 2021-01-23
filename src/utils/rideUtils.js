import {getAverageFromArray, sortArrayByAttributeInObject, getUniqueValuesFromDataArrayByAttribute} from "./dataUtils";
import {getColorBasedOnArrayLengthAndIndex} from "./colorUtils";
import {isDateSameOrAfterGivenDate, isDateSameOrBeforeGivenDate} from "./dateUtils";

/**
 * Filters Peloton Workout data by the given filters on ride titles
 * @param {array} rideData Array of Peloton ride data
 * @param {array} filters Array of strings to filter ride titles on
 * @param {boolean} matching Determins if the filter should be inclusive or exclusive. Default is exclusive.
 * @return {array} Filtered Peloton Workout data
 */
export const filterRidesByTitle = (rideData, filters, matching = false) => {
  const filteredRideData = rideData.filter((ride) => {
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

  return filteredRideData;
};

/**
 * Filters Rides By Date
 * @param {array} rideData Peloton ride data
 * @param {object} dateFilters Object containing `startDate` and `endDate`
 * @return {array} filtered data
 */
export const filterRidesByDate = (rideData, dateFilters) => {
  if (dateFilters && dateFilters.hasOwnProperty("startDate") && dateFilters.hasOwnProperty("endDate")) {
    return rideData.filter((ride) => {
      return isDateSameOrAfterGivenDate(ride.date, dateFilters.startDate) && isDateSameOrBeforeGivenDate(ride.date, dateFilters.endDate);
    });
  }
  return rideData;
};

/**
 * Returns an array of ride objects that begin with the given duration
 * @param {array} rideData Peloton ride data
 * @param {string} duration duration of rides to return (ie. 30)
 * @return {array} Array of ride objects that begin with the given duration
 */
export const getRidesByDuration = (rideData, duration) => {
  return rideData.filter((ride) => ride.title.startsWith(duration));
};

/**
 * Returns an object containing ride data mapped by duration keys
 * @param {array} rideData Peloton ride data
 * @return {object} An object with keys that match the unique ride durations
 */
export const organizeRidesByDuration = (rideData) => {
  const rides = {};

  const uniqueRideDurations = [
    ...new Set(
        rideData.map((ride) => {
          if (ride.duration) {
            return ride.duration;
          }
          throw new Error("One or more rides did not include duration.");
        }),
    ),
  ];

  uniqueRideDurations.forEach((duration) => {
    rides[duration.toString()] = getRidesByDuration(rideData, duration);
  });

  return rides;
};

/**
 * Parses ride titles to get an array of ride types
 * @param {array} rideData Peloton ride data
 * @return {array} Unique ride types
 */
export const getUniqueRideTypes = (rideData) => {
  // Relies on ride titles matching similar to "45 Min Tabata Ride" format
  const uniqueRideTypes = [
    ...new Set(
        rideData.map((ride) => {
          return trimTitle(ride.title);
        }),
    ),
  ];

  return uniqueRideTypes;
};

/**
 * Removes duration information and the "Ride" suffix from a string
 * @param {string} title Ride Title
 * @return {string} Trimmed ride title
 */
export const trimTitle = (title) => {
  const MIN = "min";
  const originalTitle = title;
  const startIndex = originalTitle.toLowerCase().indexOf(MIN) + MIN.length + 1; // 1 for space
  let endIndex = originalTitle.toLowerCase().indexOf("ride") - 1; // 1 for space
  if (endIndex < 0) {
    endIndex = originalTitle.toLowerCase().indexOf("home") - 1; // Fixes an issue with Live From Home rides
  }

  if (endIndex < 0) {
    endIndex = originalTitle.length;
  }
  return originalTitle.substring(startIndex, endIndex);
};

/**
 * Returns a best ride by output
 * @param {array} rideData Peloton ride data
 * @return {object} Best ride by output
 */
export const getHighestOutputRide = (rideData) => {
  if (rideData && rideData.length > 0) {
    const bestTotalWork = Math.max(...rideData.map((ride) => ride.output), 0);
    const bestRide = rideData.find(function(ride) {
      return ride.output == bestTotalWork;
    });

    return bestRide;
  }
  throw new Error("Bad input");
};

/**
 * Returns an object of duration keys with a best ride by output for each
 * @param {array} rideData Peloton ride data
 * @return {object}
 */
export const getHighestOutputRidesByDuration = (rideData) => {
  const bestRides = [];
  if (rideData) {
    Object.keys(rideData).forEach((key, index) => {
      const ride = getHighestOutputRide(rideData[key]);
      bestRides.push(ride);
    });
  }
  return bestRides;
};

export const energy = {
  WATTS: "watts",
  KILOJOULES: "kj",
};

/**
 * Get average outputs for all given rides
 * @param {array} rideData Peloton ride data
 * @param {energy} units kj (default) or watts
 * @return {array}  Average Outputs
 */
export const getAverageOutputs = (rideData, units = energy.KILOJOULES) => {
  const outputs = [];
  rideData.forEach((ride) => {
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

/**
 * Gets an array of dates that had multiple rides
 * @param {array} rideData Peloton ride data
 * @return {array} Dates containing multiple rides
 */
export const getDatesWithMultipleRides = (rideData) => {
  const datesWithMultipleRides = [];
  const uniqueDates = getUniqueValuesFromDataArrayByAttribute(rideData, "date");
  // Determine which dates have multiple rides
  uniqueDates.forEach((date) => {
    const ridesOnSpecificDate = rideData.filter((effort) => {
      return effort.date === date;
    });

    if (ridesOnSpecificDate.length > 1) {
      datesWithMultipleRides.push(date);
    }
  });
  return datesWithMultipleRides;
};

/**
 * Filters out all but the highest output ride for rides that occurred on the same day.
 * @param {array} rideData Peloton ride data
 * @return {array} Peloton ride data
 */
export const filterSameDayRides = (rideData) => {
  if (rideData) {
    const datesWithMultipleRides = getDatesWithMultipleRides(rideData);

    // Find best ride for days with multiple rides
    datesWithMultipleRides.forEach((date) => {
      const ridesOnSpecificDay = rideData.filter((effort) => {
        return date == effort.date;
      });
      const bestRideForDay = getHighestOutputRide(ridesOnSpecificDay);

      // Remove best ride from ones to remove
      const bestRideIndex = ridesOnSpecificDay.indexOf(bestRideForDay);
      ridesOnSpecificDay.splice(bestRideIndex, 1);

      // Remove all rides for that day
      ridesOnSpecificDay.forEach((rideToRemove) => {
        const index = rideData.indexOf(rideToRemove);
        rideData.splice(index, 1);
      });
    });
  }

  return rideData;
};

/**
 * Returns average output by duration lengths
 * @param {array} rideData Peloton ride data
 * @return {object} Object with keys (duration) containing information about the average output for each
 */
export const getAverageOutputByRideDuration = (rideData) => {
  const averages = [];
  const durations = Object.keys(rideData);
  for (const [i, duration] of durations.entries()) {
    const average = {};
    const rides = rideData[duration];
    average["value"] = getAverageFromArray(rides, "output");
    average["color"] = getColorBasedOnArrayLengthAndIndex(durations.length, i);
    average["duration"] = duration;
    averages.push(average);
  }
  return averages;
};

/**
 * Gets a sorted array of instructors and the number of classes taken with each
 * @param {array} rideData Peloton ride data
 * @return {array}
 */
export const getClassesTakenByInstructor = (rideData) => {
  let classesTakenByInstructor = [];
  try {
    const uniqueInstructors = getUniqueValuesFromDataArrayByAttribute(
        rideData,
        "instructor",
    );

    uniqueInstructors.forEach((instructor) => {
      if (instructor !== "") {
        const value = {};
        value.instructor = instructor;
        value.count = rideData.filter(
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

/**
 * Gets the average cadence for each ride in the given array of data
 * @param {array} rideData Peloton ride data
 * @return {array} Average cadences alongside date
 */
export const getAverageCadence = (rideData) => {
  const cadences = [];
  rideData.forEach((ride) => {
    const cadence = {};
    cadence["average"] = ride.averageCadence;
    cadence["createdAt"] = ride.date;
    cadence["title"] = ride.title;
    cadences.push(cadence);
  });

  return cadences;
};

/**
 * Gets the average resistance for each ride in the given array of data
 * @param {array} rideData Peloton ride data
 * @return {array} Average resistances alongside date
 */
export const getAverageResistance = (rideData) => {
  const resistances = [];
  rideData.forEach((ride) => {
    const resistance = {};
    resistance["average"] = ride.averageResistance;
    resistance["createdAt"] = ride.date;
    resistance["title"] = ride.title;
    resistances.push(resistance);
  });
  return resistances;
};

/**
 * Returns an object with keys (duration) containing rides sorted by output
 * @param {array} rideData Peloton ride data
 * @return {object}
 */
export const getOrganizedRidesSortedByOutput = (rideData) => {
  const newOrganizedRides = {};
  const durations = Object.keys(rideData);

  // eslint-disable-next-line no-unused-vars
  for (const [i, duration] of durations.entries()) {
    newOrganizedRides[duration] = sortArrayByAttributeInObject(
        rideData[duration],
        "output",
    );
  }
  return newOrganizedRides;
};

/**
 * Returns a sorted array of ride types alongside each's average output
 * @param {array} rideData Peloton ride data
 * @return {array} Sorted array of objects containing ride type and average output
 */
export const getAverageOutputByRideType = (rideData) => {
  const groupedRides = groupBy(rideData, "type");
  const averageOutputs = [];
  Object.keys(groupedRides).forEach((key) => {
    const average = getAverageFromArray(groupedRides[key], "averageOutput");
    const result = {};
    result["type"] = key;
    result["averageOutput"] = average;
    averageOutputs.push(result);
  });
  const sortedAverageOutputs = sortArrayByAttributeInObject(averageOutputs, "averageOutput");
  return sortedAverageOutputs;
};

/**
 * Groups objects in an array by a given attribute
 * Source: https://stackoverflow.com/questions/14696326/break-array-of-objects-into-separate-arrays-based-on-a-property
 * @param {array} arr array of objects
 * @param {string} property attribute within objects to group by
 * @return {object}
 */
const groupBy = (arr, property) => {
  return arr.reduce(function(result, x) {
    if (!result[x[property]]) {
      result[x[property]] = [];
    }
    result[x[property]].push(x);
    return result;
  }, {});
};

