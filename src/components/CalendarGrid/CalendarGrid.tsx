import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";

import { EventCard } from "../EventCard";

import { generateColumns } from "./utils.tsx";

import "./styles.scss";


/**
 * We take MAX(end_time) - MIN(start_time) = hackathon duration
 * There is an "event hours" to "pixel location" mapping achieved by
 * taking the minimum event height (px) and setting it equal to the smallest event duration (event milliseconds)
 * 
 * This way the total height of the page relies on making every event visible, and not cramming them
 * into a predefined height. (The user can scroll, but they cannot change the height of divs)
 * 
 * Actual Math used to do mappings:
 * 
 * total height = (min event height) * (min event duration / total event duration)
 * So your x position is: (total height) * (start_time / event duration)
 * 
 * 
 * To Avoid overlaps, given that the event count is < ~100, I am assuming time complexity
 * isn't a huge issue. So I just search to see if there are conflict severy time I add an event
 * O(n^2).
 * 
 * 
 * TODO: Use something other than pixels to do vertical positioning so 4k devices don't have messed up positioning.
 * (Potentially use rem or em)
 */


export const CalendarGrid = (props) => {
  const [eventData, setEventData] = useState([]);
  const [eventTitleMap, setEventTitleMap] = useState({});
  let compareEvents = (event1, event2) => 
    (event1.start_time > event2.start_time) ? 1 : -1;

  useEffect(() => {
    fetch('https://api.hackthenorth.com/v3/events')
      .then(response => response.json())
      .then(data => {
        setEventData(data.sort(compareEvents));
        let newMap = {};
        data.forEach(({id, name}) => {
          newMap[id] = name;
        });
        setEventTitleMap(newMap);
      });
  }, []);

  // TODO: Pass the y position to the event. (It doesn't need to know about an x)
  const generateCards = (data) => {
    let columns = generateColumns(data);
    let columnCards = columns.map(events => (
      <Grid item className="event-column" md={6} xs={6} >
        {
          events.map(event => (
            <EventCard 
              {...event}
              openLogin={props.openLogin}
              loggedIn={props.loggedIn}
              eventTitleMap={eventTitleMap}

              key={event.id}
            />
          ))
        }
      </Grid>
    ));

    return columnCards;
  }

  return (
    <Grid container className="calendar-grid-container">
      {
        generateCards(eventData)
      }
    </Grid>
  );
}