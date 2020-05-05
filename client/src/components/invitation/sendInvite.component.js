import React, {useEffect, useState} from 'react';
import {renderEmail} from 'react-html-email';
import ReactEmailHTML from './reactEmailHtml.component';
import BetterChips from '../addons/betterChips.componenet';
import {getLastUrlParam} from '../../toolset/baseFunctions';
import {useOktaAuth} from '@okta/okta-react';
import M from 'materialize-css';
import axios from 'axios';

const SendInvite = (props) => {
  const {authState} = useOktaAuth();
  const {accessToken} = authState;

  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState('');

  useEffect(() => {
    const id = getLastUrlParam(window.location.href);
    axios
        .get(`/sendInvite/get/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setTemplate(res.data[0]);
        });
  }, [accessToken]);

  useEffect(() => {
    setMessage(renderEmail(ReactEmailHTML(template)));
  }, [template]);

  const markAsSent = () => {
    const markedTemplate = template;
    markedTemplate.sent = true;
    const id = getLastUrlParam(window.location.href);
    axios
        .post(`/inviteTemplate/update/${id}`, markedTemplate, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          props.history.push('/templateDashboard');
        });
  };

  const onSend = (event) => {
    event.preventDefault();
    const mail = {
      recipients: recipients.join(','),
      subject,
      message,
      template,
    };

    axios
        .post('/sendInvite/send', mail, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          if (res.data.sent) {
            M.toast({html: 'E-MAIL SENT!', classes: 'rounded pink lighten-1'});
            markAsSent();
            props.history.push('/templateDashboard');
          } else {
            M.toast({
              html: 'SOMETHING WENT WRONG :(',
              classes: 'rounded pink lighten-1',
            });
          }
        });
  };

  return (
    <div className="container">
      <form className="white col s12" onSubmit={onSend}>
        <div className="row center">
          <div className="col s6 offset-s3">
            <BetterChips
              required
              label="Recipients"
              inputType="email"
              value={recipients}
              onEnter={setRecipients}
            />
          </div>
          <div className="input-field col s6 offset-s3">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="card-panel col s6 m8 offset-m2">
            {ReactEmailHTML(template)}
          </div>
        </div>
        <div className="input-field col s6 offset-s3">
          <div className="row center">
            <div className="col s2 offset-s4">
              <a className="btn pink lighten-1" href="/templateDashboard">
                <i className="material-icons left">cancel</i>CANCEL
              </a>
            </div>
            <div className="col s2">
              <button className="btn pink lighten-1">
                <i className="material-icons left">mail</i>SEND
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SendInvite;
