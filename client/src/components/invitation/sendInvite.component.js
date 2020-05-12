import React, {useEffect, useState} from 'react';
import BetterChips from '../addons/betterChips.componenet';
import {getLastUrlParam} from '../../toolset/baseFunctions';
import {useOktaAuth} from '@okta/okta-react';
import {Editor} from '@tinymce/tinymce-react';
import EmailTemplate from './cleanHTMLemail.component';
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
    setMessage(EmailTemplate(template));
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
            M.toast({html: 'E-MAIL SENT!', classes: 'rounded secondary-color'});
            markAsSent();
            props.history.push('/templateDashboard');
          } else {
            M.toast({
              html: 'SOMETHING WENT WRONG :(',
              classes: 'rounded secondary-color',
            });
          }
        });
  };

  return (
    <div className="background">
      <div className="container z-depth-3 form center">
        <form onSubmit={onSend}>
          <div className="input-field">
            <BetterChips
              required
              label="Recipients"
              inputType="email"
              value={recipients}
              onEnter={setRecipients}
            />
          </div>
          <div className="input-field">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <div className="input-field">
              <Editor
                // TODO ENV VAR INSTEAD OF KEY HERE
                apiKey="tg532ukh2wgn19u9hivt7lnpwf3b8eiberjzp7vgimuw2gtb"
                value={message}
                outputFormat="html"
                id="TinyEditor"
                init={{
                  selector: 'textarea',
                  max_height: 800,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image' +
                      'charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'legacyoutput',
                    'autoresize',
                    'link',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent |' +
                    ' removeformat | link | help',
                }}
                onEditorChange={setMessage}
              />
            </div>
          </div>

          <div className="input-field col s6 offset-s3">
            <div className="row center">
              <div className="col s2 offset-s4">
                <a className="btn secondary-color" href="/templateDashboard">
                  <i className="material-icons left">cancel</i>CANCEL
                </a>
              </div>
              <div className="col s2">
                <button className="btn secondary-color">
                  <i className="material-icons left">mail</i>SEND
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendInvite;
