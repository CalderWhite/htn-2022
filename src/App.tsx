import React, { useState, useEffect } from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { ThemeProvider, createTheme } from '@mui/material';


import { EventCard } from "./components/EventCard";
import { LoginModal } from "./components/LoginModal";

import './App.css';
import { CalendarGrid } from "./components/CalendarGrid";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  /*
  const [eventData, setEventData] = useState([]);

  const [eventTitleMap, setEventTitleMap] = useState({});

  let compareEvents = (event1, event2) => 
    (event1.start_time > event2.start_time) ? 1 : -1;
  
  useEffect(() => {
    fetch('https://api.hackthenorth.com/v3/events')
      .then(response => response.json())
      .then(data => {
        setEventData(data.sort(compareEvents));
        let newMap = {};
        data.forEach(({id, name}) => {
          newMap[id] = name;
        });
        setEventTitleMap(newMap);
      });
  }, []);
  */

  const theme = createTheme({
    palette: {
      primary: {
        main: '#08415C'
      },
      secondary: {
        main: '#E33E7F'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;


      /*
      <ul className="event-list">
        {eventData.map(data => (
          <EventCard
            {...data}
            openLogin={() => setShowLogin(true)}
            loggedIn={loggedIn}
            eventTitleMap={eventTitleMap}
            key={data.id}
            />
        ))}

      </ul>
      <LoginModal 
        open={showLogin}
        onClose={() => setShowLogin(false)}
        login={() => setLoggedIn(true)}
      />
      */