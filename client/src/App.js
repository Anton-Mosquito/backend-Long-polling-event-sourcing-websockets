import React from "react";
import './app.css';
import LongPolling from "./longPolling";
import EventSourcing from "./EventSourcing";
import WebSock from "./WebSock";

function App() {
  return (
    <div>
      <LongPolling/>
      <EventSourcing/>
      <WebSock/>
    </div>
  );
}

export default App;
