import React, { useState, useEffect } from "react";

import { EventCard } from "./components/EventCard";
import { LoginModal } from "./components/LoginModal";

import './App.css';

function App() {
  const [eventData, setEventData] = useState([])
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

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

  return (
    <div className="table-wrapper">
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
    </div>
  );
}

export default App;
