import React, {useState, useEffect} from 'react';
import {useOktaAuth} from '@okta/okta-react';
import axios from 'axios';
import M from 'materialize-css';

const CreateInviteTemplate = (props) => {
<<<<<<< HEAD
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [trainingType, setTrainingType] = useState("General Training");
  const [instructor, setInstructor] = useState("");
  const [title, setTitle] = useState("");
  const [agenda, setAgenda] = useState("");
  const [description, setDescription] = useState("");
  const [willLearn, setWillLearn] = useState("");
  const [mustKnow, setMustKnow] = useState("");
  const [materials, setMaterials] = useState("");
  const [mode, setMode] = useState("non-initialized");
  const [id, setId] = useState("");
  const [openTrainging, setOpenTrainging] = useState(false);
  const { authState, authService } = useOktaAuth();
=======
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [trainingType, setTrainingType] = useState('General Training');
  const [instructor, setInstructor] = useState('');
  const [title, setTitle] = useState('');
  const [agenda, setAgenda] = useState('');
  const [description, setDescription] = useState('');
  const [willLearn, setWillLearn] = useState('');
  const [mustKnow, setMustKnow] = useState('');
  const [materials, setMaterials] = useState('');
  const [mode, setMode] = useState('non-initialized');
  const [id, setId] = useState('');
  const {authState, authService} = useOktaAuth();
>>>>>>> b8fe466... ESlint added to travis + jest dependencies
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]);

  useEffect(() => {
    // runs on load
    let elems = document.querySelectorAll('.timepicker');
    M.Timepicker.init(elems, {});

    elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});

    elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, {
      format: "dd mmm yyyy",
      onSelect: (argDate) => {
        const stringDate = argDate.toDateString();
        setDate(stringDate);
      },
    });

    let idTmp = window.location.href;
    const i = idTmp.lastIndexOf('/');
    idTmp = idTmp.slice(i + 1);
    setMode('create');
    if (idTmp !== 'inviteTemplate' && idTmp.length === 24) {
      setMode('edit');
      setId(idTmp);
    }
  }, []);

  useEffect(() => {
    if (mode === "edit") {
      axios.get(`/sendInvite/get/${id}`).then((res) => {
        setDate(res.data[0].date);
        setStartTime(res.data[0].startTime);
        setEndTime(res.data[0].endTime);
        setTrainingType(res.data[0].trainingType);
        setInstructor(res.data[0].instructor);
        setTitle(res.data[0].title);
        setAgenda(res.data[0].agenda);
        setDescription(res.data[0].description);
        setWillLearn(res.data[0].willLearn);
        setMustKnow(res.data[0].mustKnow);
        setMaterials(res.data[0].materials);
        setOpenTrainging(res.data[0].openTrainging);
        M.updateTextFields();
      });
    }
  }, [mode, id]);

  const header = () => {
    if (mode === 'create') {
      return 'Create Template';
    }
    if (mode === "edit") {
      return "Edit Template";
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const userName = userInfo.preferred_username;

    const template = {
      date,
      startTime,
      endTime,
      trainingType,
      instructor,
      title,
      agenda,
      description,
      willLearn,
      mustKnow,
      materials,
      userName,
      sent: false,
      openTrainging,
    };

    if (mode === "create") {
      axios.post(`/inviteTemplate/save`, template).then(() => {
        props.history.push("/templateDashboard");
      });
    }
    if (mode === "edit") {
      axios.post(`/inviteTemplate/update/${id}`, template).then(() => {
        props.history.push("/templateDashboard");
      });
    }
  };

  return (
    <div className="container">
      <form className="white col s12" onSubmit={onSubmit}>
        <h5 className="grey-text text-darken-3"> {header()} </h5>
        <div className="input-field">
          <label htmlFor="date">Date</label>
          <input
            type="text"
            id="date"
            className="datepicker"
            required
            value={date}
          />
        </div>
        <div className="row">
          <div className="input-field col s6">
            <label htmlFor="startTime">Start time</label>
            <input
              type="text"
              id="startTime"
              className="timepicker"
              required
              value={startTime}
              onSelect={(event) => setStartTime(event.target.value)}
            />
          </div>
          <div className="input-field col s6">
            <label htmlFor="endTime">End time</label>
            <input
              type="text"
              id="endTime"
              className="timepicker"
              required
              value={endTime}
              onSelect={(event) => setEndTime(event.target.value)}
            />
          </div>
        </div>
        <div className="input-field">
          <select
            value={trainingType}
            onChange={(event) => setTrainingType(event.target.value)}
            required
          >
            <option value="General Training">General Training</option>
            <option value="Software Training">Software Training</option>
            <option value="Hardware Training">Hardware Training</option>
            <option value="Soft Skills Training">Soft Skills Training</option>
          </select>
          <label>Training type </label>
        </div>
        <div className="input-field">
          <label htmlFor="instructor">Instructor</label>
          <input
            type="text"
            id="instructor"
            required
            value={instructor}
            onChange={(event) => setInstructor(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="materialize-textarea"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="agenda">Agenda</label>
          <textarea
            id="agenda"
            className="materialize-textarea"
            value={agenda}
            onChange={(event) => setAgenda(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="willLearn">What you will learn</label>
          <textarea
            id="willLearn"
            className="materialize-textarea"
            required
            value={willLearn}
            onChange={(event) => setWillLearn(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="mustKnow">What you must already know</label>
          <textarea
            id="mustKnow"
            className="materialize-textarea"
            value={mustKnow}
            onChange={(event) => setMustKnow(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="materials">Additional materials</label>
          <textarea
            id="materials"
            className="materialize-textarea"
            value={materials}
            onChange={(event) => setMaterials(event.target.value)}
          />
        </div>
        <form action="#">
          <p>
            <label>
              <input
                id="openTrainging"
                type="checkbox"
                value={openTrainging}
                onChange={(event) => setOpenTrainging(event.target.checked)}
              />
              <span>Public training - all interested persons can come to the meeting</span>
            </label>
          </p>
        </form>
        <div className="row">
          <div className="col s2 offset-s4">
            <a className="btn pink lighten-1" href="/templateDashboard">
              <i className="material-icons left">cancel</i>CANCEL
            </a>
          </div>
          <div className="col s2">
            <button className="btn pink lighten-1 z-depth-0">
              <i className="material-icons left">save</i>SAVE
            </button>
          </div>
        </div>
        <div className="input-field"></div>
      </form>
    </div>
  );
};

export default CreateInviteTemplate;
