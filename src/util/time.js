export function formatMinute(minute) {
  if (minute < 10) return `0${minute}`;
  return `${minute}`;
}

export function formatTime(time, includeAmPm = true) {
  if (time.hour === 0) return `12:${formatMinute(time.minute)}${includeAmPm ? ' AM' : ''}`;
  if (time.hour < 12) return `${time.hour}:${formatMinute(time.minute)}${includeAmPm ? ' AM' : ''}`;
  if (time.hour === 12) return `12:${formatMinute(time.minute)}${includeAmPm ? ' PM' : ''}`;
  return `${time.hour - 12}:${formatMinute(time.minute)}${includeAmPm ? ' PM' : ''}`;
}

export function getFormattedEventTime(event) {
  if (event.dow === 'TBA' || event.start === 'TBA' || event.end === 'TBA') {
    return 'TBA';
  }
  return `${formatTime(event.start, false)} - ${formatTime(event.end, false)}`;
}

export function getFormattedClassSchedule(schedule) {
  if (schedule.dow === 'TBA' || schedule.start === 'TBA' || schedule.end === 'TBA') {
    return 'TBA';
  }
  const dowStr = schedule.dow.join('');
  return `${dowStr} ${formatTime(schedule.start, true)} - ${formatTime(schedule.end, true)}`;
}

export function getDurationInHours(event) {
  const hoursDiff = event.end.hour - event.start.hour;
  const minutesDiff = event.end.minute - event.start.minute;
  return hoursDiff + minutesDiff / 60;
}

export function isBefore(time1, time2, orEqual = false) {
  if (time1.hour < time2.hour) {
    return true;
  }
  if (time1.hour === time2.hour) {
    if (orEqual) return time1.minute <= time2.minute;
    return time1.minute < time2.minute;
  }
  return false;
}

export function overlaps(event1, event2) {
  if (event1.dow !== event2.dow) {
    return false;
  }
  return !(isBefore(event1.end, event2.start) || isBefore(event2.end, event1.start));
}

export function isUnscheduled(event) {
  return event.dow === 'TBA' || event.start === 'TBA' || event.end === 'TBA';
}

export function meetsDuringDow(eventObj, dow) {
  return eventObj.dow.includes(dow);
}

export function meetsDuringHour(eventObj, hour) {
  return hour === eventObj.start.hour;
}
