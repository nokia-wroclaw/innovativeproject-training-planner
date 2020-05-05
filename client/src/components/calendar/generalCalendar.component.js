import React, {useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import {generateTemplates} from './calendarModelFunctions';

// Set Monday as a first day of the week in calendar
// without this line first day is Sunday
moment.locale('en', {week: {dow: 1}});

const GeneralCalendar = (props) => {
  const localizer = momentLocalizer(moment);
  const [templateList, setTemplateList] = useState([]);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    axios
        .get(`/inviteTemplate/openTraining`)
        .then((res) => setTemplateList(res.data));
  }, []);

  useEffect(() => {
    const tempEvents = [];
    generateTemplates(templateList, tempEvents);
    setEventList(tempEvents);
  }, [templateList]);

  return (
    <Calendar
      style={{height: props.height}}
      events={eventList}
      startAccessor="start"
      endAccessor="end"
      defaultDate={moment().toDate()}
      localizer={localizer}
      timeslots={6}
    />
  );
};

export default GeneralCalendar;
