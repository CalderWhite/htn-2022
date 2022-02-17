import React from "react";

import { CardHeader, Avatar } from "@mui/material";

export const ProfileCard = (props) => (
  <div className="profile-card">
    <CardHeader
      avatar={
        <Avatar alt={props.name} src={props.src} />
      }
      title={props.name}
    />
  </div>
);