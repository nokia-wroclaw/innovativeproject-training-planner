import React, {useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useOktaAuth} from '@okta/okta-react';
import moment from 'moment';
import axios from 'axios';
import M from 'materialize-css';
import {transformDate, containsObject} from '../../toolset/baseFunctions';
import ReactEmailHTML from '../invitation/reactEmailHtml.component';
import LoadingCircular from '../addons/loadingCircular.component';

// Set Monday as a first day of the week in calendar
// without this line first day is Sunday
moment.locale('en', {week: {dow: 1}});

const GeneralCalendar = () => {
  const {authService} = useOktaAuth();
  const [username, setUsername] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);

  const localizer = momentLocalizer(moment);
  const [templateList, setTemplateList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [currentEvent, setCurrentEvent] = useState();

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
        .get(`/inviteTemplate/openTraining`)
        .then((res) => setTemplateList(res.data));
  }, []);

  useEffect(() => {
    authService
        .getUser()
        .then((info) => {
          setUsername(info.preferred_username);
        })
        .catch(() => {
          console.log('no user logged in');
        });
  }, [authService]);

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
        backgroundColor = '#da4167';
      }
    }
    const style = {
      backgroundColor: backgroundColor,
    };
    return {
      style: style,
    };
  };

  const showLegend = () => {
    if (username !== '') {
      return (
        <div className="row">
          <div className="col s3 offset-s3">
            <span
              className="badge left"
              style={{backgroundColor: '#da4167', marginLeft: 60}}
            />
            - Events you're invited for.
          </div>
          <div className="col s3">
            - Events organized by you.
            <span
              className="badge left"
              style={{backgroundColor: '#3174ad', marginLeft: 60}}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {!isLoaded ? (
        <LoadingCircular />
      ) : (
        <div className="z-depth-3 calendar">
          {showLegend()}
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
              {''}
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

export default GeneralCalendar;
