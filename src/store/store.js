import {writable, derived} from "svelte/store";
import {
  filterRidesByTitle,
  organizeRidesByLength,
  energy,
  getAverageOutputs,
  getUniqueRideTypes,
  getAverageOutputByRideLength,
  filterSameDayRides,
  getClassesTakenByInstructor,
  getAverageCadence,
  getAverageResistance,
  getOrganizedRidesSortedByOutput,
  getAverageOutputByRideType,
} from "../utils/rideUtils";
import {sliceArrayByGivenMax, getTotalByAttribute} from "../utils/dataUtils";
import {mapCSVData} from "../utils/fileUtils";

export const isError = writable(false);
// Initialize data store
export const csvData = writable();

// Default to Cycling. This just allows for flexibility long term
export const selectedFitnessDiscipline = writable("Cycling");

export const ridesToShow = writable(100);

// Initialize filters
export const rideTitleFilters = writable(["Intervals & Arms", "Cool Down", "Warm Up", "Recovery"]);

export const ftpTestFilter = writable(["FTP Test Ride"]);

export const showSameDayRides = writable(false);

export const mappedCSVData = derived([csvData, selectedFitnessDiscipline, showSameDayRides, ridesToShow],
    ([$csvData, $selectedFitnessDiscipline, $showSameDayRides, $ridesToShow]) => {
      if ($csvData) {
        let mappedData = mapCSVData($csvData, $selectedFitnessDiscipline);
        mappedData = sliceArrayByGivenMax(mappedData, $ridesToShow);
        if (!$showSameDayRides) {
          filterSameDayRides(mappedData);
        }

        return mappedData;
      }
      return [];
    });

// Get ride types
export const rideTypes = derived(mappedCSVData, ($mappedCSVData) => getUniqueRideTypes($mappedCSVData));

export const filteredData = derived([mappedCSVData, rideTitleFilters],
    ([$mappedCSVData, $rideTitleFilters]) => filterRidesByTitle($mappedCSVData, $rideTitleFilters));

// get FTP Test Rides
export const ftpTestRides = derived([mappedCSVData, ftpTestFilter],
    ([$mappedCSVData, $ftpTestFilter]) => filterRidesByTitle($mappedCSVData, $ftpTestFilter, true));

export const totalDistance = derived(filteredData, ($filteredData) => getTotalByAttribute($filteredData, "distance"));

export const totalCalories = derived(filteredData, ($filteredData) => getTotalByAttribute($filteredData, "calories"));

export const totalMinutes = derived(filteredData, ($filteredData) => getTotalByAttribute($filteredData, "duration"));
// Get average outputs
export const averageOutputs = derived(filteredData, ($filteredData) => getAverageOutputs($filteredData));

// need to store ftpRides somewhere
export const ftpAverageOutputs = derived(ftpTestRides, ($ftpTestRides) => getAverageOutputs($ftpTestRides, energy.WATTS));

export const averageCadence = derived(filteredData, ($filteredData) => getAverageCadence($filteredData));

export const averageResistance = derived(filteredData, ($filteredData) => getAverageResistance($filteredData));

export const classesTakenPerInstructor = derived(filteredData, ($filteredData) => getClassesTakenByInstructor($filteredData));

export const averageOutputByRideType = derived(filteredData, ($filteredData) => getAverageOutputByRideType($filteredData));

// Sort rides by time
export const organizedRidesByLength = derived(filteredData, ($filteredData) => {
  try {
    return organizeRidesByLength($filteredData);
  } catch (e) {
    isError.set(true);
    console.error("Could not parse data to organize the rides by length");
    return {};
  }
});

export const averagesByLength = derived(organizedRidesByLength, ($organizedRidesByLength) => getAverageOutputByRideLength($organizedRidesByLength));

export const organizedRidesSortedByOutput = derived(organizedRidesByLength, ($organizedRidesByLength) => {
  try {
    return getOrganizedRidesSortedByOutput($organizedRidesByLength);
  } catch (e) {
    isError.set(true);
    console.error("Could not parse data to organize the rides sorted by output");
    return {};
  }
});
