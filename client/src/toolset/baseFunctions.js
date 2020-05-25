export function containsObject(obj, list) {
  let i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }
  return false;
}

export function transformDate(dateStr, timeStr) {
  let datetime = dateStr + ' ' + timeStr;
  datetime = new Date(datetime);
  return datetime;
}

export function getDayMonthYear(date) {
  const dateArray = date.toString().split(' ');
  return dateArray[0] + ' ' + dateArray[1] + ' ' +
         dateArray[2] + ' ' + dateArray[3];
}

export function getLastUrlParam(url) {
  const i = url.lastIndexOf('/');
  return url.slice(i + 1);
}
