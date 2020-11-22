const dayjs = require("dayjs");

/**
 * Returns a readable date based on given date string
 * Format: YYYY-MM-DD
 * @param {string} dateString Date string
 * @return {string} Readable Date
 */
export const getReadableDate = (dateString) => {
  return dayjs(dateString).format("YYYY-MM-DD");
};

/**
 * Returns a readable date based on given date
 * Format: MMM DD, YYYY
 * @param {date} date Date
 * @return {string} Friendly Date
 */
export const getFriendlyDate = (date) => {
  const parsedDate = dayjs(date);
  return parsedDate.format("MMM DD, YYYY");
};
