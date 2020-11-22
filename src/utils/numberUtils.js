/**
 * Rounds a number to the nearest integer
 * @param {number} number Number
 * @return {number} Rounds a number to the nearest integer.
 */
export const getRoundNumber = (number) => {
  return Math.round(number * 10) / 10;
};

/**
 * Formats a number to show commas.
 * Note: This is not safe for long decimal numbers
 * @param {number} number Number to format
 * @return {string} Formatted number with commas
 */
export const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
