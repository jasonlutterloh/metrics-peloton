/**
 * Replaces all spaces with dashes and makes the string lowercase
 * @param {string} string
 * @return {string}
 */
export const convertStringToID = (string) => {
  return string.replace(/\s+/g, "-").toLowerCase();
};

/**
 * Removes duration information and the "Ride" suffix from a string
 * I need to go back and redo this method. It's quick and dirty because I dont have time.
 * @param {string} title Ride Title
 * @param {boolean} removeRideSuffix Should "Ride" be removed or not
 * @return {string} Trimmed ride title
 */
export const trimTitle = (title, removeRideSuffix = false) => {
  let indexOfTextToRemove = title.toLowerCase().indexOf("min");
  if (indexOfTextToRemove > 0) {
    title = title.substring(indexOfTextToRemove + 3).trim();
  } else {
    // Peloton has added rides with titles like "Extra 10: Climb Ride" which this needs to support
    indexOfTextToRemove = title.indexOf(":");
    if (indexOfTextToRemove > 0) {
      title = title.substring(indexOfTextToRemove + 1).trim();
    }
  }
  // Get rid of Live from Home and Live from LA rides (this is a super lazy way to do this but dont have time)
  title = title.replace(": Live From Home", "");
  title = title.replace(": Live From LA", "");
  title = title.replace(": Live from Home", "");
  title = title.replace(": Live from LA", "");

  if (removeRideSuffix) {
    indexOfTextToRemove = title.toLowerCase().indexOf("ride");
    if (indexOfTextToRemove > 0 && title.length - indexOfTextToRemove == 4) {
      title = title.replace("Ride", "");
    }
  }
  return title.trim();
};
