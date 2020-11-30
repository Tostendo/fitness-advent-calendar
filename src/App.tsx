import React from 'react';
import './App.scss';

import { CALENDAR_DATA } from "./data/entries";

import Calendar from "./components/calendar";

function App() {
  return (
    <div className="App">
      <h1 className="headline">GET fit for Christmas!</h1>
      <p>Why not use the time before Christimas to get in shape? </p>
      <p>Every day there is a challenge in here. You can "open" the door earliest on the particular day by clicking on it. </p>
      <p>It will not take you longer than a few minutes for most days. No equipment needed. Everything can be done at home. <br/> Most important: Never stop but progress. If you cannot do the exercise anymore, rest for a few seconds and continue.</p>
      <p>There is always a "Show exercise" button that leads you to a link how exercise(s) are done. <br/>Once you did it, click on "You did it" so we can find out how many people succeeded the challenge!</p>
      <div className="content">
        <Calendar entries={CALENDAR_DATA}/>
      </div>
    </div>
  );
}

export default App;
