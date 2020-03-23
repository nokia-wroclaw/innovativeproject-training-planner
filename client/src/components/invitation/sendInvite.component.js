import React, { useEffect, useState } from "react";
import M from "materialize-css";
import axios from "axios";

const SendInvite = props => {
  const textareaRef = React.createRef();
  const [recipents, setRecipents] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [eventTemp, setEventTemp] = useState(null);

  const initInv = template => {
    return `
    date: ${template.date},
    startTime: ${template.startTime},
    endTime: ${template.endTime},
    instructor: ${template.instructor},
    title: ${template.instructor},
    agenda: ${template.agenda},
    description: ${template.description},
    willLearn: ${template.description},
    mustKnow: ${template.mustKnow},
    materials: ${template.materials}`;
  };

  useEffect(() => {
    axios.get(window.location.href).then(res => {
      const newTemplate = initInv(res.data[0]);
      setMessage(newTemplate);
      setEventTemp(res.data[0]);
    });
  }, []);

  useEffect(() => {
    M.textareaAutoResize(textareaRef.current);
  }, [message]);

  const onSend = event => {
    event.preventDefault();
    const mail = {
      recipents,
      subject,
      message,
      eventTemp
    };
    // console.log(mail);
    axios.post("/sendInvite/send", mail).then(res => {
      console.log(res.data);
      props.history.push("/templateDashboard");
    });
  };

  return (
    <div className="container">
      <form className="white col s12" style={{ padding: "0 20px" }}>
        <div className="row center">
          <div className="input-field col s6 offset-s3">
            <label htmlFor="recipents">Recipents</label>
            <input
              type="email"
              id="recipents"
              required
              value={recipents}
              onChange={e => setRecipents(e.target.value)}
            />
          </div>
          <div className="input-field col s6 offset-s3">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              required
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </div>
          <div
            className="input-field col s6 offset-s3"
            style={{ border: true }}
          >
            <label htmlFor="textarea1">Message</label>
            <textarea
              ref={textareaRef}
              id="textarea1"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="materialize-textarea"
            ></textarea>
          </div>
          <div className="input-field col s6 offset-s3">
            <button className="btn pink lighten-1 z-depth-0" onClick={onSend}>
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SendInvite;
