import React from "react";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
//import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import "./styles.scss";

export const EventCard = (props) => {
  let startDate = new Date(props.start_time);
  let endDate = new Date(props.end_time);
  console.log(props.speakers)
  return (
    <li className={`event-card event-${props.event_type}`}>
      <Grid container spacing={1}>
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
                <span> {name} </span>
              ))
            }
            </p>
        </Grid>
        }
        <Grid item md={12} xs={12} spacing={0}>
          <p className="description">
            {props.description}
          </p>
        </Grid>
      </Grid>
    </li>
  );
}