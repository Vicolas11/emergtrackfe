export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
};

export const dateFormat = (str: string) => {
  const date = new Date(str);

  const options: any = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

export const timeFormat = (str: string) => {
  const date = new Date(str);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${hours % 12 || 12}:${minutes
    .toString()
    .padStart(2, "0")}${hours < 12 ? "AM" : "PM"}`;

  return formattedTime;
};

export const fullDateFormat = (inputDate: string): string => {
  const date = new Date(inputDate);
  const options: any = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
};
