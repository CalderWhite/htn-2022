import React from "react";
import { Grid, Link } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';

import { LoginCard } from "./LoginCard.tsx";

import "./styles.scss";

export const EventCard = (props) => {
  const startDate = new Date(props.start_time);
  const endDate = new Date(props.end_time);

  const isPrivateEvent = props.permission == 'private';
  const isHidden = (isPrivateEvent && !props.loggedIn);
  console.log(props.name)

  return (
    <div className="event-wrapper">
      <li
        id={`event-${props.id}`}
        className={`event-card event-${props.event_type}`}
      >
        <Grid container spacing={1} className={isHidden ? 'blur' : ''}>
          <Grid item md={12} xs={12}>
            <p>
              {props.name}
              <Link href={props.public_url} target="_"><LinkIcon /></Link>
              <span className="time-str">
                ({startDate.toLocaleTimeString()})
              </span>
            </p>
          </Grid>
          {
            (props.speakers.length > 0) && 
            <Grid 
              item md={12} xs={12} 
              className="speakers-list"
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <p>Speakers:
              {
                props.speakers.map(({name}) => (
                  <span key={name}> {name} </span>
                ))
              }
              </p>
          </Grid>
          }
          <Grid item md={12} xs={12}>
            <p className="description">
              {props.description}
            </p>
          </Grid>
          <Grid item md={12} xs={12} className="related-events">
            <p>
              Related Events:
            </p>
            <ul>
              {
                props.related_events.map(eventId => (
                  <li key={eventId}>
                    <Link href={`#event-${eventId}`} color="#E33E7F" >{props.eventTitleMap[eventId]}</Link>
                  </li>
                ))
              }
            </ul>
          </Grid>
        </Grid>

        { isHidden && <LoginCard openLogin={props.openLogin} />}
      </li>
    </div>
  );
}

/*
    <div
      className="absolute-wrapper"
      style={{
        top: `${props.top}${props.topUnits}`,
        height: `${props.height}${props.topUnits}`
      }}
    >

    </div>
*/