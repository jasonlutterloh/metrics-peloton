import {writable, derived} from "svelte/store";
import {
  filterRidesByTitle,
  organizeRidesByDuration,
  energy,
  getAverageOutputs,
  getUniqueRideTypes,
  getAverageOutputByRideDuration,
  filterSameDayRides,
  filterRidesByDate,
  getClassesTakenByInstructor,
  getAverageCadence,
  getAverageResistance,
  getOrganizedRidesSortedByOutput,
  getAverageOutputByRideType,
  getAverageOutputByInstructor,
  getAverageTotalOutputByDurationAndInstructor,
} from "../utils/rideUtils";
import {getTotalByAttribute} from "../utils/dataUtils";
import {subtractNMonthsFromDate} from "../utils/dateUtils";
import {mapCSVData} from "../utils/fileUtils";

/**
 * Store boolean for whether or not an error has occurred.
 */
export const isError = writable(false);

/**
 * Store for uploaded CSV data
 */
export const csvData = writable();

/**
 * Store for the strings from which to filter ride types based on ride title.
 * Initialized with ride types that would adversely effect calculating averages
 */
export const rideTitleFilters = writable(["Intervals & Arms", "Cool Down", "Warm Up", "Recovery", "Low Impact", "Bike Bootcamp: Upper Body"]);

/**
 * Store for the FTP test filter. Used as an inverse filter.
 */
export const ftpTestFilter = writable(["FTP Test Ride"]);

/**
 * Store for option of whether or not to show same day rides.
 */
export const showSameDayRides = writable(false);

export const dateFilter = writable({});

/**
 * Distance unit. Defaults to miles.
 */
export const distanceUnit = writable("mi");

/**
 * Store containing the parsed CSV data and without same day rides (based on `showSameDayRides`)
 */
export const mappedCSVData = derived([csvData, showSameDayRides, distanceUnit],
    ([$csvData, $showSameDayRides, $distanceUnit]) => {
      if ($csvData) {
        let mappedData = mapCSVData($csvData, $distanceUnit);
        if (!$showSameDayRides) {
          mappedData = filterSameDayRides(mappedData);
        }
        // Set date filters
        if (mappedData.length >= 2) {
          const endDate = mappedData[mappedData.length - 1].date;
          const startDate = subtractNMonthsFromDate(endDate, 9);
          dateFilter.set({startDate, endDate});
        }
        return mappedData;
      }
      return [];
    });

/**
 * Store with the unique ride types contained within the data set
 */
export const rideTypes = derived(mappedCSVData, ($mappedCSVData) => getUniqueRideTypes($mappedCSVData));

/**
 * Store of filtered ride data (`mappedCSVData` fitlered by `rideTitleFilters`)
 */
export const filteredData = derived([mappedCSVData, rideTitleFilters, dateFilter],
    ([$mappedCSVData, $rideTitleFilters, $dateFilter]) => {
      let data = filterRidesByTitle($mappedCSVData, $rideTitleFilters);
      data = filterRidesByDate(data, $dateFilter);
      return data;
    });

/**
 * Store of filtered FTP ride data (`mappedCSVData` inversely fitlered by `ftpTestFilter`)
 */
export const ftpTestRides = derived([mappedCSVData, ftpTestFilter],
    ([$mappedCSVData, $ftpTestFilter]) => filterRidesByTitle($mappedCSVData, $ftpTestFilter, true));

/**
 * Store of total distance of all filtered rides
 */
export const totalDistance = derived(filteredData, ($filteredData) => getTotalByAttribute($filteredData, "distance"));

/**
 * Store of total calories burned in all filtered rides
 */
export const totalCalories = derived(filteredData, ($filteredData) => getTotalByAttribute($filteredData, "calories"));

/**
 * Store of total minutes spent of all filtered rides
 */
export const totalMinutes = derived(filteredData, ($filteredData) => getTotalByAttribute($filteredData, "duration"));

/**
 * Store of average outputs of all rides
 */
export const averageOutputs = derived(filteredData, ($filteredData) => getAverageOutputs($filteredData));

/**
 * Store of all FTP test ride average outputs
 */
export const ftpAverageOutputs = derived(ftpTestRides, ($ftpTestRides) => getAverageOutputs($ftpTestRides, energy.WATTS));

/**
 * Store of the average cadences for all filtered rides
 */
export const averageCadence = derived(filteredData, ($filteredData) => getAverageCadence($filteredData));

/**
 * Store of the average resistances for all filtered rides
 */
export const averageResistance = derived(filteredData, ($filteredData) => getAverageResistance($filteredData));

/**
 * Store of the count of classes taken by each instructor
 */
export const classesTakenPerInstructor = derived(filteredData, ($filteredData) => getClassesTakenByInstructor($filteredData));

/**
 * Store of the average outputs organized by ride type
 */
export const averageOutputByRideType = derived(filteredData, ($filteredData) => getAverageOutputByRideType($filteredData));

/**
 * Store of the average outputs by instructor
 */
export const averageOutputByInstructor = derived(filteredData, ($filteredData) => getAverageOutputByInstructor($filteredData));

/**
 * Store of all filtered rides organized by ride duration
 */
export const organizedRidesByDuration = derived(filteredData, ($filteredData) => {
  try {
    return organizeRidesByDuration($filteredData);
  } catch (e) {
    isError.set(true);
    console.error("Could not parse data to organize the rides by length");
    return {};
  }
});

/**
 * Store of average outputs by duration
 */
export const averageOutputsByDuration = derived(organizedRidesByDuration, ($organizedRidesByDuration) => getAverageOutputByRideDuration($organizedRidesByDuration));

/**
 * Store of the rides sorted by output within keys of duration
 */
export const organizedRidesSortedByOutput = derived(organizedRidesByDuration, ($organizedRidesByDuration) => {
  try {
    return getOrganizedRidesSortedByOutput($organizedRidesByDuration);
  } catch (e) {
    isError.set(true);
    console.error("Could not parse data to organize the rides sorted by output");
    return {};
  }
});

export const averageTotalOutputByDurationAndInstructor = derived(organizedRidesByDuration, ($organizedRidesByDuration) => {
  try {
    return getAverageTotalOutputByDurationAndInstructor($organizedRidesByDuration);
  } catch (e) {
    console.error("Could not parse data");
    return {};
  }
});
// TODO: hide this graph if no rides
