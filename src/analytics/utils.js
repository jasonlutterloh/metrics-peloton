export const trimRideTitle = (title) => {
  let indexOfTextToRemove = title.indexOf("min");
  if (indexOfTextToRemove > 0) {
    title = title.substring(indexOfTextToRemove + 3);
  }
  return title.trim();
};
