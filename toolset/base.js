export function transformDate(dateStr, timeStr) {
  let datetime = dateStr + " " + timeStr;
  datetime = new Date(datetime);
  return datetime;
}

export function containsObject(obj, list) {
  let i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }
  return false;
}
