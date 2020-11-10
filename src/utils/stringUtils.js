export const convertStringToID = (string) => {
  return string.replace(/\s+/g, "-").toLowerCase();
};

export const trimRideTitle = (title) => {
  const indexOfTextToRemove = title.indexOf("min");
  if (indexOfTextToRemove > 0) {
    title = title.substring(indexOfTextToRemove + 3);
  }
  return title.trim();
};
