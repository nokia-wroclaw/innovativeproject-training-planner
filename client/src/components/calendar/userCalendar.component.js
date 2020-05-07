import React, {useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import {useOktaAuth} from '@okta/okta-react';
import {generateTemplates} from './calendarModelFunctions';

// Set Monday as a first day of the week in calendar
// without this line first day is Sunday
moment.locale('en', {week: {dow: 1}});

const UserCalendar = (props) => {
  const {authState, authService} = useOktaAuth();
  const {accessToken} = authState;
  const [username, setUsername] = useState('');

  const localizer = momentLocalizer(moment);
  const [templateList, setTemplateList] = useState([]);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    authService.getUser().then((info) => {
      setUsername(info.preferred_username);
    });
  }, [authService]);

  useEffect(() => {
    axios
        .get(`/inviteTemplate/all`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            username,
          },
        })
        .then((res) => setTemplateList(res.data));
  }, [accessToken, username]);

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

export default UserCalendar;
