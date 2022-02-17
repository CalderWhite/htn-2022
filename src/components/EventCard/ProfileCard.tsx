import React, { useState } from "react";

import { CardHeader, Avatar, Button } from "@mui/material";

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