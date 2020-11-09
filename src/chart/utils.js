import moment from "moment";
import {getReadableDate} from '../utils/dateUtils';

export const getAverageFromArray = (array, key) => {
  let sum = 0;
  if (array.length === 0) {
    return sum;
  }
  array.forEach((data) => {
    let value = data[key];
    if (value) {
      sum = sum + value;
    } else {
      throw new Error("Bad data. Object did not contain the given key.");
    }
  });
  return Math.round(sum / array.length);
};

export const createPlotPoint = (x, y) => {
  return { x: x, y: y };
};

export const getRoundNumber = (number) => {
  return Math.round(number * 10) / 10;
};

// Functional Threshold Power (FTP) is average output over 1h in 20m tests discount by 5%
export const calculateFTP = (number) => {
  return Math.floor(number * 0.95);
};

export const getPlotPointsByDate = (data, yAttribute, dateAttribute) => {
  return data.map((object) => {
    if (object[yAttribute] && object[dateAttribute]) {
      let date = getReadableDate(moment(object[dateAttribute])); // TODO: Remove moment in favor of dayjs
      let yAxis = getRoundNumber(object[yAttribute]);
      return createPlotPoint(date, yAxis);
    }
    console.error("One or more of the given attributes '"+yAttribute+"', '" +dateAttribute+"' was null or empty for the following object: ", object)
    throw new Error(
      "Data does not match given parameters to generate plot points"
    );
  });
};

export const getLineChartByDateConfig = (data) => {
  return {
    type: "line",
    data: data,
    options: {
      borderJoinStyle: "round",
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [
          {
            type: "time",
            distribution: "series",
            bounds: "data",
            time: {
              unit: "day",
              tooltipFormat: "MMM DD YYYY",
            },
          },
        ],
      },
    },
  };
};

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

