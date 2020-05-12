import React, {useState, useEffect} from 'react';
import {useOktaAuth} from '@okta/okta-react';
import axios from 'axios';
import {getLastUrlParam} from '../../toolset/baseFunctions';
import SendFeedback from './sendFeedback.component';
import M from 'materialize-css';

const Feedback = () => {
  const {authState} = useOktaAuth();
  const {accessToken} = authState;

  const [template, setTemplate] = useState('');

  useEffect(() => {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }, []);

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

  const renderFeedbacks = () => {
    if (template.feedback) {
      return (
        <div>
          {template.feedback.map((item) => (
            <div className="row" key={item.id}>
              <div className="col s12 m12">
                <div className="card blue-grey">
                  <div className="card-content white-text">
                    <span className="card-title"></span>
                    <h5 style={{color: '#ffccbc'}}>
                      General rating: {item.generalRating}
                    </h5>
                    <h5>{item.text}</h5>
                  </div>
                  <div className="card-action">
                    <div className="row">
                      <div className="col s6">
                        <h6 style={{color: '#ffff00'}}>
                          Clarity and precision of expression:
                          {' ' + item.clarityOfExpression}
                        </h6>
                      </div>
                      <div className="col s6">
                        <h6 style={{color: '#ffff00'}}>
                          Content quality:
                          {' ' + item.contentQuality}
                        </h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s6">
                        <h6 style={{color: '#ffff00'}}>
                          Teaching materials:
                          {' ' + item.teachingMaterials}
                        </h6>
                      </div>
                      <div className="col s6">
                        <h6 style={{color: '#ffff00'}}>
                          Contact with the group:
                          {' ' + item.contactWithGroup}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="background">
      <div className="container center">
        <div className="row">
          <button
            className="modal-trigger pulse btn-large secondary-color"
            href="#modal"
          >
            LEAVE US SOME FEEDBACK
          </button>
        </div>

        <div className="row template-board">{renderFeedbacks()}</div>
      </div>

      <div id="modal" className="modal">
        {SendFeedback(template)}
      </div>
    </div>
  );
};

export default Feedback;
