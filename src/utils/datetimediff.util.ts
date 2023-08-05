export const dateTimeDiff = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();

  // Convert the time difference to different units
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diffInMilliseconds < minute) {
    return "just now";
  } else if (diffInMilliseconds < hour) {
    const diffInMinutes = Math.round(diffInMilliseconds / minute);
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (diffInMilliseconds < day) {
    const diffInHours = Math.round(diffInMilliseconds / hour);
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMilliseconds < week) {
    const diffInDays = Math.round(diffInMilliseconds / day);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInMilliseconds < month) {
    const diffInWeeks = Math.round(diffInMilliseconds / week);
    return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
  } else if (diffInMilliseconds < year) {
    const diffInMonths = Math.round(diffInMilliseconds / month);
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  } else {
    const diffInYears = Math.round(diffInMilliseconds / year);
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  }
};
