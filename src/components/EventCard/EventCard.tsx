import React from "react";
import Grid from "@mui/material/Grid";

import { LoginCard } from "./LoginCard.tsx";

import "./styles.scss";

export const EventCard = (props) => {
  const startDate = new Date(props.start_time);
  const endDate = new Date(props.end_time);
  const isPrivateEvent = props.permission == 'private';

  return (
    <li className={`event-card event-${props.event_type}`}>
      <Grid container spacing={1} className={isPrivateEvent ? 'blur' : ''}>
        <Grid item md={12} xs={12}>
          <p>
            {props.name}
            <span className="time-str">
              (Starts: {startDate.toDateString()}, {startDate.toLocaleTimeString()})
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
      </Grid>

      {isPrivateEvent && <LoginCard openLogin={props.openLogin} />}
    </li>
  );
}