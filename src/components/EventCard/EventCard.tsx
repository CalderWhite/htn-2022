import React from "react";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
//import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import "./styles.scss";

export const EventCard = (props) => {
  return (
    <li className={`event-card event-${props.event_type}`}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <p> {props.name} </p>
        </Grid>
        <Grid item md={12} xs={12}>
          <p>
            {props.description}
          </p>
        </Grid>
      </Grid>
    </li>
  );
}