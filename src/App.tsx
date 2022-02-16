import React, { useState, useEffect } from "react";

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

  return (
    <>
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