import {getReadableDate} from "../utils/dateUtils";
import {getRoundNumber} from "../utils/numberUtils";

export const createPlotPoint = (x, y) => {
  return {x: x, y: y};
};

/* Functional Threshold Power (FTP) is average output
 over 1h in 20m tests discount by 5%*/
export const calculateFTP = (number) => {
  return Math.floor(number * 0.95);
};

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
