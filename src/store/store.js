import { writable, readable, derived } from 'svelte/store';
import {
    filterRidesByTitle, 
    organizeRidesByLength, 
    getAverageOutputs, 
    getBestRidesByLength, 
    getUniqueRideTypes, 
    getAverageOutputByRideLength, 
    mapCSVData,
    filterSameDayRides
} from './storeUtils.js';

// Initialize data store 
export const csvData = writable();

// Default to Cycling. This just allows for flexibility long term
export const selectedFitnessDiscipline = writable("Cycling");

export const ridesToShow = writable(100);

// Controls showing the average line on the chart
export const showAverages = writable(true);

// Initialize filters
export const rideTitleFilters = writable(["Intervals & Arms", "Cool Down", "Warm Up", "Recovery"]);

export const showSameDayRides = writable(false);

export const mappedCSVData = derived([csvData, selectedFitnessDiscipline, showSameDayRides, ridesToShow],
    ([$csvData, $selectedFitnessDiscipline, $showSameDayRides, $ridesToShow]) => {
        if ($csvData) {
            let mappedData = mapCSVData($csvData, $selectedFitnessDiscipline, $ridesToShow);

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

// Get average outputs
export const averageOutputs = derived(filteredData, $filteredData => getAverageOutputs($filteredData));

// Sort rides by time
export const organizedRidesByLength = derived(filteredData, $filteredData => organizeRidesByLength($filteredData));

// Get personal bests from data
export const bestRides = derived(organizedRidesByLength, $organizedRidesByLength => getBestRidesByLength($organizedRidesByLength));

export const averagesByLength = derived(organizedRidesByLength, $organizedRidesByLength => getAverageOutputByRideLength($organizedRidesByLength));