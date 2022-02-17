import React, { useState } from "react";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { ThemeProvider, createTheme } from '@mui/material';

import { LoginModal } from "./components/LoginModal";
import './App.css';
import { CalendarGrid } from "./components/CalendarGrid";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const myTheme = createTheme({
    palette: {
      primary: {
        main: "#79599c"
      }
    }
  })

  return (
    <ThemeProvider theme={myTheme}>
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