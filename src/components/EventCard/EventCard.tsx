import React from "react";
import { Grid, Link } from "@mui/material";
import dateFormat from "dateformat";

import { LoginCard } from "./LoginCard.tsx";
import { WatchCard } from "./WatchCard.tsx";
import { HopinCard } from "./HopinCard.tsx";
import { ProfileCard } from "./ProfileCard.tsx";

import "./styles.scss";

export const EventCard = (props) => {
  const startDate = new Date(props.start_time);

  const isPrivateEvent = props.permission === 'private';
  const isHidden = (isPrivateEvent && !props.loggedIn);

  const HOUR = 60 * 60 * 1000;
  const duration = (props.end_time - props.start_time) / HOUR;
  const durationString = duration < 1 ? `${60 * duration}m` : `${duration}h`;

  if (!props.eventShownMap[props.event_type]) {
    return (
      <></>
    );
  }

  return (
    <div className="event-wrapper">
      <li
        id={`event-${props.id}`}
        className={`event-card event-${props.event_type}`}
      >
        <Grid container spacing={1} className={isHidden ? 'blur' : ''}>
          <Grid item md={12} xs={12}>
            <p className="header">
              {props.name}
              <nobr>
              <span className="time-str">
                ({dateFormat(startDate, 'h:MM TT')}, {durationString})
              </span>
              </nobr>
            </p>
          </Grid>
          <Grid item md={12} xs={12}>
            <div style={{display: "flex", alignItems: "center"}} >
            <>
            {
              (props.speakers.length > 0) && (
                props.speakers.map(({name, profile_pic}) => (
                  <ProfileCard key={name} name={name} src={profile_pic} />
                ))
              )
            }
            </>
            {props.public_url !== "" && <WatchCard href={props.public_url} />}
            {(isPrivateEvent && !isHidden) && <HopinCard href={props.private_url} />}
            </div>
          </Grid>
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
                    <Link
                      onClick={() => {
                        props.openAll();
                        window.location.href=`#event-${eventId}`;
                      }}
                      color="#0072E5"
                    >
                      {props.eventTitleMap[eventId]}
                    </Link>
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