const dayjs = require('dayjs');

export const trimRideTitle = (title) => {
  let indexOfTextToRemove = title.indexOf("min");
  if (indexOfTextToRemove > 0) {
    title = title.substring(indexOfTextToRemove + 3);
  }
  return title.trim();
};

export const getFriendlyDate = (date) => {
  let parsedDate = dayjs(date);
  return parsedDate.format('MMM DD, YYYY');
}

// This is not safe for long decimal numbers
export const formatNumberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}