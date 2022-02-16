// min duration is in milliseconds, so this is 30 minutes
const MIN_EVENT_DURATION = 1000 * 60 * 30;
const MIN_EVENT_HEIGHT = 300;
const EVENT_HEIGHT_UNITS = "px";

const DAY = 24 * 60 * 60 * 1000;

export const getMinDuration = (events) => {
  let minDuration = Infinity;
  events.forEach(({start_time, end_time}) => {
    let duration = end_time - start_time;
    if (duration < minDuration) {
      minDuration = duration;
    }
    console.log(duration);
  });

  return minDuration
}

export const getTimelineConstraints = (events) => {
  // guard against erroring out on empty events
  if (events.length == 0) {
    return [-1, -1];
  }

  let minStart = Infinity;
  let maxEnd = 0;
  events.forEach(({start_time, end_time}) => {
    if (start_time < minStart) {
      minStart = start_time;
    }
    if (end_time > maxEnd) {
      maxEnd = end_time;
    }
  })

  return [minStart, maxEnd];
}

export const hasConflict = (column, event) => {
  let hasConflict = false;
  column.forEach(({start_time, end_time}) => {
    // if the start time or end time intersects the given event, we have a conflict in this column
    if (event.start_time >= start_time && event.start_time <= end_time) {
      hasConflict = true;
    } else if (event.end_time >= start_time && event.end_time <= end_time) {
      hasConflict = true;
    }
  });

  return hasConflict;
}

/**
 * 
 * total height = (min event height) * (total event duration / min event duration)
 * So your x position is: (min event height) * (start_time / min event duration)
 * 
 */

export const generateColumns = (events) => {
  let minDuration = getMinDuration(events);
  let [minStart, maxEnd] = getTimelineConstraints(events);
  let totalDuration = maxEnd - minStart;

  let columns = [[]];
  events.forEach(event => {
    let columnIndex = -1;
    for (let i = 0; i < columns.length; i++) {
      if (!hasConflict(columns[i], event)) {
        columnIndex = i;
        break;
      }
    }

    // could not find a column without conflicts, create a new one
    if (columnIndex == -1) {
      columns.push([])
      columnIndex = columns.length - 1;
    }

    // inject the top position into the event's data
    event.top = MIN_EVENT_HEIGHT * ((event.start_time - minStart) / MIN_EVENT_DURATION);
    //event.top = event.start_time - minStart;
    event.height = MIN_EVENT_HEIGHT * ((event.end_time - event.start_time) / MIN_EVENT_DURATION);
    event.topUnits = EVENT_HEIGHT_UNITS;

    if (event.start_time < 1638264600000) {
      columns[columnIndex].push(event);
    }
  });

  return columns;
}

export const groupByDay = (events) => {
  if (events.length == 0) {
    return [];
  }

  const getDateString = (timestamp) => ((new Date(timestamp)).toDateString());
  // we take a sorted array of events, so the first event that is not of the same day
  // means we will never see the previous day again
  let lastDay = getDateString(events[0].start_time);
  let days = [{
    dayString: lastDay,
    events: [],
  }]
  for (let i = 0; i < events.length; i++) {
    let currentDay = getDateString(events[i].start_time)
    // add a new day if we encounter one
    if (currentDay != lastDay) {
      days.push({
        dayString: currentDay,
        events: [],
      })
      lastDay = currentDay;
    }

    days[days.length - 1].events.push(events[i])
  }

  return days;
}