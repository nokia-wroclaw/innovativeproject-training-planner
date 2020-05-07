import React, {useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useOktaAuth} from '@okta/okta-react';
import moment from 'moment';
import axios from 'axios';
import M from 'materialize-css';
import {transformDate} from '../../toolset/baseFunctions';
import ReactEmailHTML from '../invitation/reactEmailHtml.component';

// Set Monday as a first day of the week in calendar
// without this line first day is Sunday
moment.locale('en', {week: {dow: 1}});

const UserCalendar = () => {
  const {authState, authService} = useOktaAuth();
  const {accessToken} = authState;
  const [username, setUsername] = useState('');

  const localizer = momentLocalizer(moment);
  const [templateList, setTemplateList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [currentEvent, setCurrentEvent] = useState();

  useEffect(() => {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }, []);

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
    for (const template of templateList) {
      template["start"] =  transformDate(template.date, template.startTime);
      template["end"] = transformDate(template.date, template.endTime);
    }
    setEventList(templateList);
  }, [templateList, currentEvent])

  const renderEventDetails = () =>
  {
    if(currentEvent !== undefined)
    {
      return(ReactEmailHTML(currentEvent))
    }
  }

  return (
    <div style={{height: '550pt'}}>
      <Calendar
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        localizer={localizer}
        timeslots={6}
        onSelectEvent={event => {
          setCurrentEvent(event)
          document.getElementById("eventDetails").click()
        }} 
      />

      <a class="modal-trigger" href="#modal" id="eventDetails"> </a>

      <div id="modal" class="modal">
        {renderEventDetails()}
      </div>
    </div>
  );
};

export default UserCalendar;
