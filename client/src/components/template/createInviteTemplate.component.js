import React, { useState, useEffect } from "react";
import axios from "axios";
import M from "materialize-css";

const CreateInviteTemplate = props => {
  const [date, setDate] = useState("null");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [instructor, setInstructor] = useState("");
  const [title, setTitle] = useState("");
  const [agenda, setAgenda] = useState("");
  const [description, setDescription] = useState("");
  const [willLearn, setWillLearn] = useState("");
  const [mustKnow, setMustKnow] = useState("");
  const [materials, setMaterials] = useState("");

  useEffect(() => {
    var elems = document.querySelectorAll(".timepicker");
    M.Timepicker.init(elems, {});

    elems = document.querySelectorAll(".datepicker");
    M.Datepicker.init(elems, {
      format: "dd mmm yyyy",
      onSelect: argDate => {
        const stringDate = argDate.toDateString();
        setDate(stringDate);
      }
    });
  }, []);

  function onSubmit(event) {
    event.preventDefault();
    console.log(date);

    const template = {
      date,
      startTime,
      endTime,
      instructor,
      title,
      agenda,
      description,
      willLearn,
      mustKnow,
      materials
    };

    // console.log(template);

    axios.post("/inviteTemplate/save", template).then(res => {
      console.log(res.data.message);
      props.history.push("/templateDashboard");
    });
  }

  return (
    <div className="container">
      <form className="white col s12" onSubmit={onSubmit}>
        <h5 className="grey-text text-darken-3"> Crete Template </h5>
        <div className="input-field">
          <label htmlFor="date">Date</label>
          <input type="text" id="date" className="datepicker" required />
        </div>
        <div className="row">
          <div className="input-field col s6">
            <label htmlFor="startTime">Start time</label>
            <input
              type="text"
              id="startTime"
              className="timepicker"
              required
              onSelect={event => setStartTime(event.target.value)}
            />
          </div>
          <div className="input-field col s6">
            <label htmlFor="endTime">End time</label>
            <input
              type="text"
              id="endTime"
              className="timepicker"
              required
              onSelect={event => setEndTime(event.target.value)}
            />
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="instructor">Instructor</label>
          <input
            type="text"
            id="instructor"
            required
            onChange={event => setInstructor(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            required
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="agenda">Agneda</label>
          <textarea
            id="agenda"
            className="materialize-textarea"
            required
            onChange={event => setAgenda(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="materialize-textarea"
            onChange={event => setDescription(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="willLearn">What you will learn</label>
          <textarea
            id="willLearn"
            className="materialize-textarea"
            required
            onChange={event => setWillLearn(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="mustKnow">What you must already know</label>
          <textarea
            id="mustKnow"
            className="materialize-textarea"
            onChange={event => setMustKnow(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="materials">Additional materials</label>
          <textarea
            id="materials"
            className="materialize-textarea"
            onChange={event => setMaterials(event.target.value)}
          />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateInviteTemplate;