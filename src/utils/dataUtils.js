export const getAverageFromArray = (array, key) => {
  let sum = 0;
  if (array.length === 0) {
    return sum;
  }
  array.forEach((data) => {
    const value = data[key];
    if (value != null) {
      sum = sum + value;
    }
  });
  return Math.round(sum / array.length);
};

export const sortArrayByAttributeInObject = (array, attribute) => {
  // Concat so we dont change the original
  return array
      .concat()
      .sort((a, b) => {
        return a[attribute] - b[attribute];
      })
      .reverse();
  // Reverse will return from highest to lowest
};

// Assumes to pull from bottom to top
export const sliceArrayByGivenMax = (array, max) => {
  const arrayLength = array.length;

  if (max < arrayLength) {
    array = array.slice(arrayLength - max, arrayLength);
  }

  return array;
};

export const getUniqueValuesFromDataArrayByAttribute = (data, attribute) => {
  const values = [...new Set(
      data
          .filter((item) => item[attribute] != "") // Needed to filter out scenic rides without an instructor
          .map((item) => {
            if (item[attribute]) {
              return item[attribute];
            }
            console.error("Attribute (" + attribute + ") for the following item returned null or undefined", item);
            throw new Error(
                "Error getting values for '" + attribute + "'",
            );
          }),
  ),
  ];
  return values;
};

export const getTotalByAttribute = (data, key) => {
  let sum = 0;
  data.forEach((element) => {
    const value = element[key];
    if (value) {
      sum = sum + value;
    }
  });
  return Math.round(sum);
};
