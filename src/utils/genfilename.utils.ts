const genUniFilename = (): string => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const time = date.getTime();
  const fullDay = day >= 10 ? day : `0${day}`;
  const fullMonth = month >= 10 ? month : `0${month}`;
  const genDate = `${year}${fullMonth}${fullDay}-${time}.jpg`;

  return genDate;
};

export default genUniFilename;
