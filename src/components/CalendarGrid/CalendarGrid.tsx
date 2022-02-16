import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";

import { EventCard } from "../EventCard";

import { groupByDay, generateColumns } from "./utils.tsx";

import "./styles.scss";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";


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

const DAY = 24 * 60 * 60 * 1000;


export const CalendarGrid = (props) => {
  const [eventData, setEventData] = useState([]);
  const [eventTitleMap, setEventTitleMap] = useState({});
  let compareEvents = (event1, event2) => 
    (event1.start_time > event2.start_time) ? 1 : -1;

  const [openMap, setOpenMap] = React.useState({});
  const toggleDay = (day) => {
    let copy = {};
    Object.assign(copy, openMap)
    if (copy[day] == undefined) {
      copy[day] = true;
    } else {
      copy[day] = !copy[day];
    }
    setOpenMap(copy);
  }
  const dayOpen = (day) => {
    return openMap[day] === true;
  }

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

  const generateCards = (data) => (
    generateColumns(data).map(events => (
      <Grid item className="event-column" md={4} xs={4} >
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
    ))
  );

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Events
        </ListSubheader>
      }
    >
      {
        groupByDay(eventData).map(({dayString, events}) => (
          <>
            <ListItemButton onClick={() => toggleDay(dayString)}>
              <ListItemText primary={dayString} />
              {dayOpen(dayString) ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={dayOpen(dayString)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Grid container className="calendar-grid-container">
                  {generateCards(events)}
                </Grid>
              </List>
            </Collapse>
          </>
        ))
      }
    </List>
  );
}

/*
    <Grid container className="calendar-grid-container">
      {
        generateCards(eventData)
      }
    </Grid>

*/