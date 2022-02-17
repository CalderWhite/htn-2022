import React, { useState } from "react";

import { Button } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export const WatchCard = (props) => {
  const openLink = () => {
    window.open(props.href, "_");
  }

  return (
    <div className="watch-card">
      <Button variant="outlined" onClick={openLink} endIcon={<PlayCircleOutlineIcon />}>
        Watch 
      </Button>
    </div>
  )
}