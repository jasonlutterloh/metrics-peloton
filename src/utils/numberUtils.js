export const getRoundNumber = (number) => {
  return Math.round(number * 10) / 10;
};

// This is not safe for long decimal numbers
export const formatNumberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
