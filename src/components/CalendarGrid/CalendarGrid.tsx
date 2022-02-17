import React, { useState, useEffect } from "react";
import { Button, FormControlLabel, Card, Checkbox, Grid } from "@mui/material";

import { EventCard } from "../EventCard";

import { groupByDay, groupByStart } from "./utils.tsx";

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


  const [eventShownMap, setEventShownMap] = React.useState({});

  useEffect(() => {
    fetch('https://api.hackthenorth.com/v3/events')
      .then(response => response.json())
      .then(data => {
        setEventData(data.sort(compareEvents));
        let newMap = {};
        let newEventShownMap = {};
        data.forEach(({id, name, event_type}) => {
          newMap[id] = name;
          newEventShownMap[event_type] = true;
        });
        setEventTitleMap(newMap);
        setEventShownMap(newEventShownMap);
      });
  }, []);

  const generateCards = (data) => (
    groupByStart(data).map(events => (
      <Grid container key={events[0].start_time}>
        {
          events.map(event => (
            <Grid item className="event-column" md={6} sm={6} xs={12} key={event.id}>
              <EventCard 
                {...event}
                openLogin={props.openLogin}
                loggedIn={props.loggedIn}
                eventTitleMap={eventTitleMap}
                eventShownMap={eventShownMap}
                openAll={openAllDays}
              />
            </Grid>
          ))
        }
      </Grid>
    ))
  );

  const eventTypeLabels = {
    "tech_talk": "Tech Talk",
    "workshop": "Workshop",
    "activity": "Activity"
  }

  const openAllDays = () => {
    let obj = {}
    groupByDay(eventData).forEach(({dayString}) => {
      obj[dayString] = true;
    });
    setOpenMap(obj);
  }
  const closeAllDays = () => {
    let obj = {}
    groupByDay(eventData).forEach(({dayString}) => {
      obj[dayString] = false;
    });
    setOpenMap(obj);
  }

  return (
    <div className="calendar-grid">
      <Card
        style={{
          borderRadius: 0,
          border: "none",
          boxShadow: "none"
        }}
        sx={{
          p: 2.5
        }}
      >
        {
          Object.keys(eventShownMap).map(event_type => (
            <FormControlLabel
              key={event_type}
              control={
                <Checkbox
                  onChange={() => {
                    let copy = {};
                    Object.assign(copy, eventShownMap);
                    copy[event_type] = !copy[event_type];
                    setEventShownMap(copy);
                  }}
                  defaultChecked
              />}
              label={eventTypeLabels[event_type]}
              sx={{
                p: 1.5
              }}
              style={{
                borderRadius: "10px",
                paddingLeft: "5px"
              }}
              className={`event-${event_type}`}
            />
          ))
        }
        <nobr>
          <Button variant="contained" sx={{m: 2}} onClick={openAllDays}>Open All Days</Button>
          <Button variant="contained" sx={{m: 2}} onClick={closeAllDays}>Close All Days</Button>
        </nobr>
      </Card>
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