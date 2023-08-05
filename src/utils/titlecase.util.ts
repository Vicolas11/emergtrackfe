export const titleCase = (str: string): string => {
  let result = "";
  if (str) {
    result = str
      .toLowerCase()
      .replace(/(^|\s)\w/g, (match) => match.toUpperCase());
  } else {
    result = "None";
  }

  return result;
};
