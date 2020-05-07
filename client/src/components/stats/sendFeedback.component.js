import React, {useState, useEffect} from 'react';
import {useOktaAuth} from '@okta/okta-react';
import axios from 'axios';
import M from 'materialize-css';
import {getLastUrlParam} from '../../toolset/baseFunctions';

const SendFeedback = (template) => {
  const {authState} = useOktaAuth();
  const {accessToken} = authState;

  const [clarityOfExpression, setClarityOfExpression] = useState('3');
  const [contentQuality, setContentQuality] = useState('3');
  const [teachingMaterials, setTeachingMaterials] = useState('3');
  const [contactWithGroup, setContactWithGroup] = useState('3');
  const [generalRating, setGeneralRating] = useState('3');
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    const feedbackObj = {};
    feedbackObj.clarityOfExpression = clarityOfExpression;
    feedbackObj.contentQuality = contentQuality;
    feedbackObj.teachingMaterials = teachingMaterials;
    feedbackObj.contactWithGroup = contactWithGroup;
    feedbackObj.generalRating = generalRating;
    feedbackObj.text = feedbackText;
    template.feedback.push(feedbackObj);

    const id = getLastUrlParam(window.location.href);
    axios
        .post(`/inviteTemplate/update/${id}`, template, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
    window.location.reload();
  };

  return (
    <div>
      <div className="row">
        <h4>Leave us some feedback!</h4>
        <br></br>
        <form className="white col s12" onSubmit={onSubmit}>

          <div className="input-field col s6">
            <select
              required
              defaultValue="3"
              onChange={(event) => setClarityOfExpression(event.target.value)}
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label>Clarity and precision of expression</label>
          </div>

          <div className="input-field col s6">
            <select
              required
              defaultValue="3"
              onChange={(event) => setContentQuality(event.target.value)}
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label>Content quality</label>
          </div>

          <div className="input-field col s6">
            <select
              required
              defaultValue="3"
              onChange={(event) => setTeachingMaterials(event.target.value)}
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label>Teaching materials</label>
          </div>

          <div className="input-field col s6">
            <select
              required
              defaultValue="3"
              onChange={(event) => setContactWithGroup(event.target.value)}
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label>Contact with the group</label>
          </div>

          <div className="input-field col s12">
            <select
              required
              defaultValue="3"
              onChange={(event) => setGeneralRating(event.target.value)}
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label>General rating</label>
          </div>

          <div className="input-field col s12">
            <textarea
              id="Feedback"
              className="materialize-textarea"
              required
              onChange={(event) => setFeedbackText(event.target.value)}
            >
            </textarea>
            <label htmlFor="Feedback">Feedback</label>
          </div>
          <button className="btn pink lighten-1 z-depth-0">
            <i className="material-icons left">save</i>LEAVE FEEDBACK!
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendFeedback;
