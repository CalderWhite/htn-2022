import React from "react";

import { Button } from "@mui/material";

export const LoginCard = (props) => {
  return (
    <div className="login-wrapper">
      <div className="card">
        <p> 🔒 </p>
        <p> Private Event</p>
        <Button variant="contained" onClick={props.openLogin}>
          Login
        </Button>
      </div>
    </div>
  )
}