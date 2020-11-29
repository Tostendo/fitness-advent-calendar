import React from 'react';
import './calendar.scss';

import CalendarTile from './calendar-tile';

type CalendarProps = {
    entries: any[]
};


const Calendar = (props: CalendarProps) => (
    <div className="calendar">
        {props.entries.map((entry) => (<CalendarTile item={entry} key={entry.id}/>))}
    </div>
)

export default Calendar;