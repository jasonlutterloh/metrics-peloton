export const convertStringToID = (string) => {
    return string.replace(/\s+/g, '-').toLowerCase();
  }