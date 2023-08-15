export const setHhMmSs = (time: number | string) => {
  const date = new Date(time);
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  return `${hour}:${minute}:${second}`;
};

export const getDayOfYear = (date: Date) => {
  const now = new Date(date);
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = Number(now) - Number(start);
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
};

export const determineTimeString = (originalValue: Date) =>
  new Date(originalValue).toTimeString().slice(0, 8);

export const getJulianDay = (date: Date) => {
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
};

export function formatReadableTime(timestamp: Date | number) {
  // assumes timestamp is a UTC Epoch
  const time = new Date(timestamp);

  return new Date(time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}
