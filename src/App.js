import React, { useState, useEffect } from "react";

import {EventCard} from "./components/EventCard";

import './App.css';

function App() {
  let [eventData, setEventData] = useState([])
  useEffect(() => {
    fetch('https://api.hackthenorth.com/v3/events')
      .then(response => response.json())
      .then(data => setEventData(data));
  }, []);
  return (
    <div className="table-wrapper">
      <ul className="event-list">
        {eventData.map(data => (
          <EventCard
            {...data}
            key={data.id}
            />
        ))}

      </ul>
    </div>
  );
}

export default App;
