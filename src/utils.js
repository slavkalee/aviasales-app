export function getTimeFromMins(mins) {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  if (minutes < 1) {
    return `${hours}ч`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

export function getHourString(time) {
  const date = new Date(time);
  const hours = date.getHours();
  if (hours < 10) {
    return `0${hours}`;
  } else {
    return hours;
  }
}


export function getMinuteString(time) {
  const date = new Date(time);
  const minutes = date.getMinutes();
  if (minutes < 10) {
    return `0${minutes}`;
  } else {
    return minutes;
  }
}

export function getMinsFromTime(time) {
  const date = new Date(time);
  const hoursPerMinutes = date.getHours() * 60;
  const minutes = date.getMinutes();
  const allMinutes = hoursPerMinutes + minutes;

  return allMinutes;
}


export const desc = (arr) => {
  if(arr.length === 1) {
    return `${arr.length} пересадка`;
  } else if(!arr.length) {
    return 'Без пересадок';
  } else {
    return `${arr.length} пересадки`;
  }
}

export function minutesToTime(data, duration) {
  var date = new Date(data);
  var num = date.getTime() + (duration * 60 * 1000)
  var newDate = new Date(num)

  return `${getHourString(newDate)}:${getMinuteString(newDate)}`
}





  