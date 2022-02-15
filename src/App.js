import React, { useState, useEffect } from "react";

import {EventCard} from "./components/EventCard";

import './App.css';

function App() {
  let [eventData, setEventData] = useState([])

  let compareEvents = (event1, event2) => {
    console.log(event1.start_time, event2.start_time, event1.start_time > event2.start_time)
    return (event1.start_time > event2.start_time) ? 1 : -1;
  }
  
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
            key={data.id}
            />
        ))}

      </ul>
    </div>
  );
}

export default App;
