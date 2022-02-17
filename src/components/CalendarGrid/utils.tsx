export const getMinDuration = (events) => {
  let minDuration = Infinity;
  events.forEach(({start_time, end_time}) => {
    let duration = end_time - start_time;
    if (duration < minDuration) {
      minDuration = duration;
    }
  });

  return minDuration
}

export const getTimelineConstraints = (events) => {
  // guard against erroring out on empty events
  if (events.length === 0) {
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

export const groupByStart = (events) => {
  let groups = {};
  events.forEach(event => {
    if (groups[event.start_time] === undefined) {
      groups[event.start_time] = [];
    }
    groups[event.start_time].push(event);
  })

  let sortedGroups = []
  let keys = Object.keys(groups).sort();
  for (let i = 0; i < keys.length; i++) {
    sortedGroups.push(groups[keys[i]]);
  }

  return sortedGroups;
}

export const groupByDay = (events) => {
  if (events.length === 0) {
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
    if (currentDay !== lastDay) {
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