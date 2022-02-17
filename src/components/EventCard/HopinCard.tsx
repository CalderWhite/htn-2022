import React, { useState } from "react";

import { Button } from "@mui/material";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const HopinCard = (props) => {
  const openLink = () => {
    window.open(props.href, "_");
  }

  return (
    <div className="watch-card">
      <Button variant="outlined" onClick={openLink} endIcon={<ArrowForwardIosIcon />}>
        Hopin 
      </Button>
    </div>
  )
}