import React, {useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useOktaAuth} from '@okta/okta-react';
import moment from 'moment';
import axios from 'axios';
import M from 'materialize-css';
import {transformDate} from '../../toolset/baseFunctions';
import ReactEmailHTML from '../invitation/reactEmailHtml.component';
import LoadingCircular from '../addons/loadingCircular.component';

// Set Monday as a first day of the week in calendar
// without this line first day is Sunday
moment.locale('en', {week: {dow: 1}});

const UserCalendar = () => {
  const {authState, authService} = useOktaAuth();
  const {accessToken} = authState;
  const [username, setUsername] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);

  const localizer = momentLocalizer(moment);
  const [templateList, setTemplateList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [currentEvent, setCurrentEvent] = useState();

  useEffect(() => {
    authService.getUser().then((info) => {
      setUsername(info.preferred_username);
    });
  }, [authService]);

  useEffect(() => {
    if (eventList !== []) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 1200);
    }
  }, [isLoaded, eventList]);

  useEffect(() => {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }, []);

  useEffect(() => {
    axios
        .get(`/inviteTemplate/sent`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            username,
          },
        })
        .then((res) => setTemplateList(res.data));
  }, [accessToken, username]);

  useEffect(() => {
    for (const template of templateList) {
      template['start'] = transformDate(template.date, template.startTime);
      template['end'] = transformDate(template.date, template.endTime);
    }
    setEventList(templateList);
  }, [templateList, currentEvent]);

  const renderEventDetails = () => {
    if (currentEvent !== undefined) {
      return ReactEmailHTML(currentEvent);
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = '#' + event.hexColor;
    if (event.userName !== undefined) {
      if (!containsObject(username, event.userName)) {
        backgroundColor = '#35677d';
      }
    }
    const style = {
      backgroundColor: backgroundColor,
    };
    return {
      style: style,
    };
  };

  return (
    <div>
      {!isLoaded ? (
        <LoadingCircular style={{width: 200, height: 200}} />
      ) : (
        <div className="z-depth-3 calendar">
          <div className="row" style={{height: '500pt'}}>
            <Calendar
              events={eventList}
              startAccessor="start"
              endAccessor="end"
              defaultDate={moment().toDate()}
              localizer={localizer}
              timeslots={6}
              onSelectEvent={(event) => {
                setCurrentEvent(event);
                document.getElementById('eventDetails').click();
              }}
              eventPropGetter={eventStyleGetter}
            />

            <a className="modal-trigger" href="#modal" id="eventDetails">
              {' '}
            </a>
          </div>
        </div>
      )}
      <div id="modal" className="modal">
        <div className="modal-content details">
          <div className="center">{renderEventDetails()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserCalendar;
