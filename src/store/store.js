import { writable, readable, derived } from 'svelte/store';
import {
    filterRidesByTitle, 
    organizeRidesByLength, 
    energy,
    getAverageOutputs, 
    getBestRidesByLength, 
    getUniqueRideTypes, 
    getAverageOutputByRideLength, 
    mapCSVData,
    filterSameDayRides,
    getClassesTakenByInstructor,
    getAverageCadence,
    getAverageResistance,
    getOrganizedRidesSortedByOutput, sliceArrayByGivenMax
} from './utils.js';

// Initialize data store 
export const csvData = writable();

// Default to Cycling. This just allows for flexibility long term
export const selectedFitnessDiscipline = writable("Cycling");

export const ridesToShow = writable(100);

// Controls showing the average line on the chart
export const showAverages = writable(true);

// Initialize filters
export const rideTitleFilters = writable(["Intervals & Arms", "Cool Down", "Warm Up", "Recovery"]);

export const ftpTestFilter = writable(["FTP Test Ride"]);

export const showSameDayRides = writable(false);

export const mappedCSVData = derived([csvData, selectedFitnessDiscipline, showSameDayRides, ridesToShow],
    ([$csvData, $selectedFitnessDiscipline, $showSameDayRides, $ridesToShow]) => {
        if ($csvData) {
            let mappedData = mapCSVData($csvData, $selectedFitnessDiscipline);
            mappedData = sliceArrayByGivenMax(mappedData, $ridesToShow);
            if (!$showSameDayRides){
                filterSameDayRides(mappedData);
            }

            return mappedData;
        }
        return [];
    }); 

// Get ride types 
export const rideTypes = derived(mappedCSVData, $mappedCSVData => getUniqueRideTypes($mappedCSVData));

export const filteredData = derived([mappedCSVData, rideTitleFilters], 
    ([$mappedCSVData, $rideTitleFilters]) => filterRidesByTitle($mappedCSVData, $rideTitleFilters));

// get FTP Test Rides
export const ftpTestRides  = derived([mappedCSVData, ftpTestFilter],
    ([$mappedCSVData, $ftpTestFilter]) => filterRidesByTitle($mappedCSVData, $ftpTestFilter, true));

// Get average outputs
export const averageOutputs = derived(filteredData, $filteredData => getAverageOutputs($filteredData));

// need to store ftpRides somewhere
export const ftpAverageOutputs = derived(ftpTestRides, $ftpTestRides => getAverageOutputs($ftpTestRides, energy.WATTS));

export const averageCadence = derived(filteredData, $filteredData => getAverageCadence($filteredData));

export const averageResistance = derived(filteredData, $filteredData => getAverageResistance($filteredData));

export const classesTakenPerInstructor = derived(filteredData, $filteredData => getClassesTakenByInstructor($filteredData));

// Sort rides by time
export const organizedRidesByLength = derived(filteredData, $filteredData => organizeRidesByLength($filteredData));

// Get personal bests from data
export const bestRides = derived(organizedRidesByLength, $organizedRidesByLength => getBestRidesByLength($organizedRidesByLength));

export const averagesByLength = derived(organizedRidesByLength, $organizedRidesByLength => getAverageOutputByRideLength($organizedRidesByLength));

export const organizedRidesSortedByOutput = derived(organizedRidesByLength, $organizedRidesByLength => getOrganizedRidesSortedByOutput($organizedRidesByLength));