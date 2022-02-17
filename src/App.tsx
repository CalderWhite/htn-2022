import React, { useState, useEffect } from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { Card, Checkbox, ThemeProvider, createTheme } from '@mui/material';


import { EventCard } from "./components/EventCard";
import { LoginModal } from "./components/LoginModal";

import './App.css';
import { CalendarGrid } from "./components/CalendarGrid";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hackathon Global Inc.
          </Typography>
          <Button color="inherit" onClick={() => setShowLogin(true)}>Login</Button>
        </Toolbar>
      </AppBar>

      <CalendarGrid
        loggedIn={loggedIn}
        openLogin={() => setShowLogin(true)}
      />
      <LoginModal 
        open={showLogin}
        onClose={() => setShowLogin(false)}
        login={() => setLoggedIn(true)}
      />
    </>
  );
}

export default App;