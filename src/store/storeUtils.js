import {convertRawTotalWork} from '../data/utils.js';

export const filterDataByFitnessDiscipline = (data, discipline = "cycling") => {
    if (data) {
        let filteredData = data.filter(effort => {
            if (discipline === effort.fitness_discipline) {
                return true;
            } 
            
            return false;
        });

        return filteredData;
    }
}

export const filterByTitle = (data, filters) => {
    let filteredData = data.filter(effort => {
        let isFiltered = false;
        if (effort.ride){
            if (effort.ride.title){
                filters.forEach(filter => {
                    if (effort.ride.title.includes(filter)){
                        isFiltered = true;
                    }
                });
            }
        }
        return !isFiltered;
    });

    return filteredData;
}

const filterExerciseByLength = (data, length) => {
    return data.filter(effort => effort.ride.title.startsWith(length));
}

export const organizeRidesByLength = (data) => {
    let ridesByLength = {};
    const uniqueRideDurations = [...new Set(data.map(effort => effort.ride.duration))];
    const uniqueRideDurationsInMinutes = uniqueRideDurations.map(duration => duration/60);
    
    uniqueRideDurationsInMinutes.forEach(duration => {
        ridesByLength[duration.toString()] = filterExerciseByLength(data, duration);
    });

    return ridesByLength;
}

export const getUniqueRideTypes = (data) => {
    // Relies on ride titles matching similar to "45 Min Tabata Ride" format
    const uniqueRideTypes = [...new Set(data.map(effort => {
        const MIN = "min";
        let originalTitle = effort.ride.title;
        let startIndex = originalTitle.indexOf(MIN) + MIN.length + 1; //1 for space
        let endIndex = originalTitle.toLowerCase().indexOf("ride") - 1; //1 for space
        // TODO: Add validation
        return originalTitle.substring(startIndex, endIndex);
    }))];

    return uniqueRideTypes;
}



export const getBestRide = (cyclingData) => {
    if (cyclingData.length > 0){
        let bestTotalWork = Math.max(...cyclingData.map(ride => ride.total_work), 0);
        let bestRide = cyclingData.find(function(ride){ return ride.total_work == bestTotalWork; });

        return bestRide;
    }
    return;
}

export const getBestRidesByLength = (data) => {
    let bestRides = [];
    if (data){
        Object.keys(data).forEach((key, index) => {
            let ride = getBestRide(data[key]);
            bestRides.push(ride);
        })
    }
    return bestRides;
}

export const getAverageOutputs = (data) => {
    let outputs = [];
    data.forEach(effort => {
        let totalWork = convertRawTotalWork(effort.total_work);
        let minutesInRide = effort.ride.duration/60;
        let averageOutputPerMinute = totalWork/minutesInRide;
        let output = {};
        output["average"] = averageOutputPerMinute;
        output["createdAt"] = effort.created_at;
        outputs.push(output);
    })

    return outputs
};