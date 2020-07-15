import {convertRawTotalWork} from '../data/utils.js';
import {getAverageEffort, getColor} from '../chart/chartUtils.js';
import moment from 'moment';

export const filterRidesByTitle = (data, filters) => {
    let filteredData = data.filter(ride => {
        let isFiltered = false;
        if (ride.title){
            filters.forEach(filter => {
                if (ride.title.includes(filter)){
                    isFiltered = true;
                }
            });
        }
        return !isFiltered;
    });
    return filteredData;
}

const filterRidesByLength = (data, length) => {
    return data.filter(ride => ride.title.startsWith(length));
}

export const organizeRidesByLength = (data) => {
    let ridesByLength = {};
    const uniqueRideDurations = [...new Set(data.map(ride => ride.duration))];

    uniqueRideDurations.forEach(duration => {
        ridesByLength[duration.toString()] = filterRidesByLength(data, duration);
    });

    return ridesByLength;
}

export const getUniqueRideTypes = (data) => {
    // Relies on ride titles matching similar to "45 Min Tabata Ride" format
    const uniqueRideTypes = [...new Set(data.map(ride => {
        const MIN = "min";
        let originalTitle = ride.title;
        let startIndex = originalTitle.indexOf(MIN) + MIN.length + 1; //1 for space
        let endIndex = originalTitle.toLowerCase().indexOf("ride") - 1; //1 for space
        // TODO: Add validation
        return originalTitle.substring(startIndex, endIndex);
    }))];

    return uniqueRideTypes;
}

const getBestRide = (cyclingData) => {
    if (cyclingData.length > 0){
        let bestTotalWork = Math.max(...cyclingData.map(ride => ride.output), 0);
        let bestRide = cyclingData.find(function(ride){ return ride.output == bestTotalWork; });

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
    data.forEach(ride => {
        let averageOutputPerMinute = ride.output/ride.duration;
        let output = {};
        output["average"] = averageOutputPerMinute;
        output["createdAt"] = ride.date;
        outputs.push(output);
    })

    return outputs
};

export const mapRawData = (data, discipline = "cycling") => {
    let mappedData = [];
    data.forEach(effort => {
        if (discipline === effort.fitness_discipline) {
            let ride = {};
            ride.date = moment.unix(effort.created_at).format("MM-DD-YYYY");
            ride.output = convertRawTotalWork(effort.total_work);
            ride.title = effort.ride.title;
            ride.duration = effort.ride.duration/60;
            ride.image = effort.ride.image_url;
            mappedData.push(ride);
        }
    });

    return mappedData;
};

export const filterSameDayRides = (data) => {
    let datesWithMultipleRides = [];
    
    // Get all unique dates
    const uniqueDates = [...new Set(data.map(effort => {
        return effort.date;
    }))];

    // Determine which dates have multiple rides
    uniqueDates.forEach(date => {
        let ridesOnSpecificDate = data.filter(effort => {
            return effort.date === date;
        });
        
        if (ridesOnSpecificDate.length > 1){
            datesWithMultipleRides.push(date);
        };
    });

    // Find best ride for days with multiple rides
    datesWithMultipleRides.forEach(date => {
        let ridesOnSpecificDay = data.filter(effort => {
            return date == effort.date;
        });
        let bestRideForDay = getBestRide(ridesOnSpecificDay);

        // Remove best ride from ones to remove
        let bestRideIndex = ridesOnSpecificDay.indexOf(bestRideForDay);
        ridesOnSpecificDay.splice(bestRideIndex, 1);

        // Remove all rides for that day
        ridesOnSpecificDay.forEach(rideToRemove => {
            let index = data.indexOf(rideToRemove);
            data.splice(index, 1);
        });
    });

    return data;
}

export const getAverageOutputByRideLength = (data) => {
    let averages = [];
    const durations = Object.keys(data);
    for (const [i, duration] of durations.entries()) {
        let average = {};
        let rides = data[duration];
        average["value"] =  getAverageEffort(rides);
        average["color"] =  getColor(durations.length, i);
        average["duration"] = duration;
        averages.push(average);
    }
    return averages;
}