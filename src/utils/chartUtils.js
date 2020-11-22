import {getReadableDate} from "../utils/dateUtils";
import {getRoundNumber} from "../utils/numberUtils";

/**
 * Returns a plot point for ChartJS graph
 * @param {*} x
 * @param {*} y
 * @return {object}
 */
export const createPlotPoint = (x, y) => {
  return {x: x, y: y};
};

/**
 * Returns Functional Threshold Power (FTP) which is calculated as the average output
 over 1h in 20m tests discounted by 5%
 * @param {number} number
 * @return {number} input multipled by 95%
 */
export const calculateFTP = (number) => {
  return Math.floor(number * 0.95);
};

/**
 * @param {array} data Array of ride data
 * @param {string} yAttribute Attribute name to use for y-axis
 * @param {string} dateAttribute Attribute name to use for the date
 * @return {array} Plot points for ChartJs where x-axis is date and y-axis is some other variable
 */
export const getPlotPointsByDate = (data, yAttribute, dateAttribute) => {
  return data.map((object) => {
    if (object[yAttribute] != null && object[dateAttribute] != null) {
      const date = getReadableDate(object[dateAttribute]);
      const yAxis = getRoundNumber(object[yAttribute]);
      return createPlotPoint(date, yAxis);
    }
    console.error(`One or more of the given attributes '${yAttribute}', '${dateAttribute}' was null or empty for the following object: `, object);
    throw new Error(
        "Data does not match given parameters to generate plot points",
    );
  });
};
