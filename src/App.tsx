import React, { useState, useEffect } from "react";

import { EventCard } from "./components/EventCard";
import { LoginModal } from "./components/LoginModal";

import './App.css';

function App() {
  const [eventData, setEventData] = useState([])
  const [loginOpen, setLoginOpen] = useState(false);

  let compareEvents = (event1, event2) => 
    (event1.start_time > event2.start_time) ? 1 : -1;
  
  useEffect(() => {
    fetch('https://api.hackthenorth.com/v3/events')
      .then(response => response.json())
      .then(data => setEventData(data.sort(compareEvents)));
  }, []);

  return (
    <div className="table-wrapper">
      <ul className="event-list">
        {eventData.map(data => (
          <EventCard
            {...data}
            openLogin={() => setLoginOpen(true)}
            key={data.id}
            />
        ))}

      </ul>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}

export default App;
