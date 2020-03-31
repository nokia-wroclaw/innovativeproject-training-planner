import React, { useEffect, useState } from "react";
import { renderEmail } from "react-html-email";
import ReactEmailHTML from "./reactEmailHtml.component";
import M from "materialize-css";
import axios from "axios";

const SendInvite = props => {
  const [recipents, setRecipents] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState("");

  useEffect(() => {
    // Send GET request to the current URL (that stores template's ID).
    //  Response is an array of one template stored as JSON .
    axios.get(window.location.href).then(res => {
      setTemplate(res.data[0]);
    });
  }, []);

  useEffect(() => {
    setMessage(renderEmail(ReactEmailHTML(template)));
  }, [template]);

  const onSend = event => {
    event.preventDefault();
    const mail = {
      recipents,
      subject,
      message,
      template
    };
    // Send POST request that will trigger nodemailer, which is responsible
    // for sending mails. Then redirect URL to template dashboard.
    axios.post("/sendInvite/send", mail).then(res => {
      console.log(res.data);
      props.history.push("/templateDashboard");
    });
    M.toast({ html: "E-MAIL SENT!", classes: "rounded pink lighten-1" });
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
          <div className="card-panel col s6 m8 offset-m2">
            {ReactEmailHTML(template)}
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
