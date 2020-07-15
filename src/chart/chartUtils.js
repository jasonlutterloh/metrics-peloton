export const getColor = (lengthOfArray, index) => {
	// Vaguely the colors of the rainbow. Idea is to gradually move up to red for the hardest rides.
	const colorPalette = ["#e60000", "#ff4d88", "#e65c00", "#ffcc00", "#00cc00","#00cccc", "#008ae6", "#6666ff", "#7300e6"].reverse();
	// Most people only do a few different distances, don't want it to always be the first three colors of the rainbow. This allows spreading through evenly depending on how many different lengths of ride the user has done.
	let skip = Math.floor(colorPalette.length/lengthOfArray);  
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
