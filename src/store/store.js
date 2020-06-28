import { writable, readable, derived } from 'svelte/store';
import {filterByTitle, organizeRidesByLength, getAverageOutputs, getBestRidesByLength, getUniqueRideTypes, filterDataByFitnessDiscipline} from './storeUtils.js';

// Initialize raw data store 
export const rawData = writable();

// Default to Cycling. This just allows for flexibility long term
export const selectedFitnessDiscipline = writable("cycling");

// Controls showing the average line on the chart
export const showAverages = writable(true);

// Initialize filters
export const rideTitleFilters = writable(["Intervals & Arms"]);

// Filter out anything but cycling workouts
export const rawCyclingData = derived([rawData, selectedFitnessDiscipline], 
    ([$rawData, $selectedFitnessDiscipline]) => {
        if ($rawData) {
            return filterDataByFitnessDiscipline($rawData.data, $selectedFitnessDiscipline)
        }
        return []
    });

// Get ride types 
export const rideTypes = derived(rawCyclingData, $rawCyclingData => getUniqueRideTypes($rawCyclingData));

// Filtered cycling data
export const filteredCyclingData = derived([rawCyclingData, rideTitleFilters],
    ([$rawCyclingData, $rideTitleFilters]) => filterByTitle($rawCyclingData, $rideTitleFilters));
    
// Get average outputs
export const averageOutputs = derived(filteredCyclingData, $filteredCyclingData => getAverageOutputs($filteredCyclingData));

// Sort rides by time
export const organizedRidesByLength = derived(filteredCyclingData, $filteredCyclingData => organizeRidesByLength($filteredCyclingData));

// Get personal bests from data
export const bestRides = derived(organizedRidesByLength, $organizedRidesByLength => getBestRidesByLength($organizedRidesByLength));