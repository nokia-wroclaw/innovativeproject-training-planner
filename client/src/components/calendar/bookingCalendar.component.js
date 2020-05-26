import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useOktaAuth} from '@okta/okta-react';
import moment from 'moment';
import axios from 'axios';
import M from 'materialize-css';
import {transformDate, getDayMonthYear} from '../../toolset/baseFunctions';
import ReactEmailHTML from '../invitation/reactEmailHtml.component';
import LoadingCircular from '../addons/loadingCircular.component';

// Set Monday as a first day of the week in calendar
// without this line first day is Sunday
moment.locale('en', {week: {dow: 1}});

const BookingCalendar = () => {
  const {authState, authService} = useOktaAuth();
  const {accessToken} = authState;
  const [username, setUsername] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);
  const localizer = momentLocalizer(moment);

  const [templateList, setTemplateList] = useState([]);
  const [bookingList, setBookingList] = useState([]);
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
    if (eventList !== []) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 1200);
    }
  }, [isLoaded, eventList]);

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
    axios
        .get(`/bookingDate/all`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => setBookingList(res.data));
  }, [accessToken]);

  useEffect(() => {
    for (const template of templateList) {
      template['start'] = transformDate(template.date, template.startTime);
      template['end'] = transformDate(template.date, template.endTime);
    }
    for (const bookDate of bookingList) {
      bookDate['start'] = transformDate(bookDate.date, bookDate.startTime);
      bookDate['end'] = transformDate(bookDate.date, bookDate.endTime);
      templateList.push(bookDate);
    }
    setEventList(templateList);
  }, [templateList, bookingList]);

  const handleSelect = ({start, end}) => {
    if (window.confirm('Are you sure you wish to book this date?')) {
      let startTime = new Date(start);
      let endTime = new Date(end);
      const title = 'Reserved date';
      const date = getDayMonthYear(startTime);
      startTime = startTime.toLocaleTimeString('en-US');
      endTime = endTime.toLocaleTimeString('en-US');

      const bookingDate = {
        startTime,
        endTime,
        date,
        title,
      };

      setEventList([
        ...eventList,
        {start, end, title, date, startTime, endTime},
      ]);

      axios.post('/bookingDate/save', bookingDate, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  };

  const deleteBookedTermin = (event) => {
    event.preventDefault();
    axios.post(`/bookingDate/delete/${currentEvent._id}`).then(() => {
      window.location.reload();
    });
  };

  const renderEventDetails = () => {
    if (currentEvent !== undefined) {
      if ( currentEvent.instructor === undefined) {
        return (
          <div>
            <a
              href="/"
              className="modal-close btn-flat"
              onClick={deleteBookedTermin}
            >
              <i className="material-icons red-text text-lighten-1 left">
                  delete
              </i>
                DELETE
            </a>
            <Link
              to={`/inviteTemplate/${currentEvent._id}`}
              className="modal-close btn-flat "
            >
              <i className="material-icons left">edit</i>CREATE TEMPALTE
            </Link>
            {ReactEmailHTML(currentEvent)}
          </div>
        );
      } else {
        return ReactEmailHTML(currentEvent);
      }
    }
  };

  return (
    <div>
      {!isLoaded ? (
        <LoadingCircular style={{width: 200, height: 200}} />
      ) : (
        <div className="z-depth-3 calendar">
          <Calendar
            selectable
            events={eventList}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
            timeslots={6}
            onSelectSlot={(event) => {
              handleSelect(event);
            }}
            onSelectEvent={(event) => {
              setCurrentEvent(event);
              document.getElementById('eventDetails').click();
            }}
          />

          <a className="modal-trigger" href="#modal" id="eventDetails">
            {' '}
          </a>
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

export default BookingCalendar;
