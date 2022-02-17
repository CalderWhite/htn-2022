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
      copy[day] = false;
    } else {
      copy[day] = !copy[day];
    }
    setOpenMap(copy);
  }
  const dayOpen = (day) => {
    return openMap[day] === true || openMap[day] === undefined;
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
      <Grid item className="event-column" md={6} sm={6} xs={12} >
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
    <div className="calendar-grid">
      <List
        sx={{ bgcolor: "background.paper" }}
        subheader={
          <ListSubheader component="div">
            Events
          </ListSubheader>
        }
      >
        {
          groupByDay(eventData).map(({dayString, events}) => (
            <div key={`${dayString}`}>
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
            </div>
          ))
        }
      </List>
    </div>
  );
}