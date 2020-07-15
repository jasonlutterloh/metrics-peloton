import { writable, readable, derived } from 'svelte/store';
import {
    filterRidesByTitle, 
    organizeRidesByLength, 
    getAverageOutputs, 
    getBestRidesByLength, 
    getUniqueRideTypes, 
    getAverageOutputByRideLength, 
    mapRawData, 
    filterSameDayRides
} from './storeUtils.js';

// Initialize raw data store 
export const rawData = writable();

// Default to Cycling. This just allows for flexibility long term
export const selectedFitnessDiscipline = writable("cycling");

// Controls showing the average line on the chart
export const showAverages = writable(true);

// Initialize filters
export const rideTitleFilters = writable(["Intervals & Arms", "Cool Down", "Warm Up", "Recovery"]);

export const showSameDayRides = writable(false);

export const mappedData = derived([rawData, selectedFitnessDiscipline, showSameDayRides],
    ([$rawData, $selectedFitnessDiscipline, $showSameDayRides]) => {
        if ($rawData) {
            let mappedData = mapRawData($rawData.data, $selectedFitnessDiscipline);
            if (!$showSameDayRides){
                filterSameDayRides(mappedData);
            }
            return mappedData;
        }
        return [];
    });

// Get ride types 
export const rideTypes = derived(mappedData, $mappedData => getUniqueRideTypes($mappedData));

export const filteredData = derived([mappedData, rideTitleFilters], 
    ([$mappedData, $rideTitleFilters]) => filterRidesByTitle($mappedData, $rideTitleFilters));

// Get average outputs
export const averageOutputs = derived(filteredData, $filteredData => getAverageOutputs($filteredData));

// Sort rides by time
export const organizedRidesByLength = derived(filteredData, $filteredData => organizeRidesByLength($filteredData));

// Get personal bests from data
export const bestRides = derived(organizedRidesByLength, $organizedRidesByLength => getBestRidesByLength($organizedRidesByLength));

export const averagesByLength = derived(organizedRidesByLength, $organizedRidesByLength => getAverageOutputByRideLength($organizedRidesByLength));