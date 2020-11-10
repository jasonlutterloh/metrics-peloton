const dayjs = require("dayjs");

export const getReadableDate = (dateString) => {
  return dayjs(dateString).format("YYYY-MM-DD");
};

export const getFriendlyDate = (date) => {
  const parsedDate = dayjs(date);
  return parsedDate.format("MMM DD, YYYY");
};
