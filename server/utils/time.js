export const timeLessThan = (time, compareTime) => {
  if (time.hour() < compareTime.hour()) return true;
  if (time.hour() > compareTime.hour()) return false;
  if (time.minute() <= compareTime.minute()) return true;

  return false;
};
