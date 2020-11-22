/**
 * Replaces all spaces with dashes and makes the string lowercase
 * @param {string} string
 * @return {string}
 */
export const convertStringToID = (string) => {
  return string.replace(/\s+/g, "-").toLowerCase();
};

/**
 * Trims string by removing duration information
 * @param {string} title Ride title
 * @return {string}
 */
export const trimRideTitle = (title) => {
  const indexOfTextToRemove = title.indexOf("min");
  if (indexOfTextToRemove > 0) {
    title = title.substring(indexOfTextToRemove + 3);
  }
  return title.trim();
};
