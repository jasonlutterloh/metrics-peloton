import {getReadableDate} from "../utils/dateUtils";
import {getRoundNumber} from "../utils/numberUtils";

/**
 * Returns a plot point for ChartJS graph
 * @param {*} x
 * @param {*} y
 * @param {string} title
 * @return {object}
 */
export const createPlotPoint = (x, y, title) => {
  return {x: x, y: y, title};
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
 * @param {string} titleAttribute Attribute name to use for the title
 * @return {array} Plot points for ChartJs where x-axis is date and y-axis is some other variable
 */
export const getPlotPointsByDate = (data, yAttribute, dateAttribute, titleAttribute = "title") => {
  return data.map((object) => {
    if (object[yAttribute] != null && object[dateAttribute] != null) {
      const date = getReadableDate(object[dateAttribute]);
      const yAxis = getRoundNumber(object[yAttribute]);
      const title = object[titleAttribute];
      const plotPoint = createPlotPoint(date, yAxis, title);
      return plotPoint;
    }
    console.error(
      `One or more of the given attributes '${yAttribute}', '${dateAttribute}' was null or empty for the following object: `,
      object
    );
    throw new Error("Data does not match given parameters to generate plot points");
  });
};
