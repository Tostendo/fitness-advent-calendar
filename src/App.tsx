import React from 'react';
import './App.scss';

import { CALENDAR_DATA } from "./data/entries";

import Calendar from "./components/calendar";

function App() {
  return (
    <div className="App">
      <h1 className="headline">GET fit for Christmas!</h1>
      <p>Why not use the time before Christimas to get in shape? </p>
      <p>Every day there is a challenge in here. It will not take you longer than a few minutes for most days. No equipment needed. Everything can be done at home.</p>
      <div className="content">
        <Calendar entries={CALENDAR_DATA}/>
      </div>
    </div>
  );
}

export default App;
