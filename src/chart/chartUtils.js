import { getColorArray } from "./colorPalette";

export const getColor = (lengthOfArray, index) => {
	let colorPalette = getColorArray();
	// Most people only do a few different distances, don't want it to always be the first three colors of the rainbow. This allows spreading through evenly depending on how many different lengths of ride the user has done.
	let skip = Math.max(1, Math.floor(colorPalette.length/lengthOfArray));  
	let arrayValue = index*skip;
	let color = colorPalette[arrayValue];

	return color;
}

export const getAverageEffort = (data) => {
    let sum = 0;
    data.forEach(ride => {
        sum = sum + ride.output
    });
    return Math.round(sum/data.length);
}
