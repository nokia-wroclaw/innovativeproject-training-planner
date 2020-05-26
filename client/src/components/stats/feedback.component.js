import React, {useState, useEffect} from 'react';
import {useOktaAuth} from '@okta/okta-react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {getLastUrlParam} from '../../toolset/baseFunctions';
import SendFeedback from './sendFeedback.component';
import M from 'materialize-css';
import StatsCharts from './statsCharts.component';
import Pagination from '../layout/pagination.component';

const Feedback = () => {
  const {authState} = useOktaAuth();
  const {accessToken} = authState;

  const [template, setTemplate] = useState('');
  const [activeTab, setActiveTab] = useState('comments');
  const [navbarView, setNavbarView] = useState({
    comments: 'active',
    charts: '',
  });
  const [activePaginationTab, setActivePaginationTab] = useState(1);
  const elemsPerPage = 4;

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

  const tabClickHandler = (event) => {
    event.preventDefault();
    const id = event.target.id;
    setActiveTab(id);
  };

  useEffect(() => {
    switch (activeTab) {
      case 'comments':
        setNavbarView({comments: 'active', charts: ''});
        break;
      case 'charts':
        setNavbarView({comments: '', charts: 'active'});
        break;
      default:
        setNavbarView({comments: '', charts: ''});
        break;
    }
  }, [activeTab]);

  const renderFeedbacks = () => {
    if (template.feedback !== undefined) {
      if (template.feedback.length > 0) {
        return (
          <div>
            <div style={{marginTop: 50, marginBottom: 30}}>
              <Pagination
                elemsAmount={template.feedback.length}
                elemsPerPage={elemsPerPage}
                activeTab={activePaginationTab}
                changeTab={setActivePaginationTab}
              />
            </div>
            {template.feedback
                .slice(
                    (activePaginationTab - 1) * elemsPerPage,
                    activePaginationTab * elemsPerPage,
                )
                .map((item) => (
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
            <div style={{marginTop: 50, marginBottom: 50}}>
              <Pagination
                elemsAmount={template.feedback.length}
                elemsPerPage={elemsPerPage}
                activeTab={activePaginationTab}
                changeTab={setActivePaginationTab}
              />
            </div>
          </div>
        );
      } else {
        return <h4>No one has rated this training yet.</h4>;
      }
    }
  };

  const renderTabConent = () => {
    // TODO prevent doubling the value
    const charts = StatsCharts(template.feedback);
    const comments = renderFeedbacks();

    switch (activeTab) {
      case 'comments':
        return comments;
      case 'charts':
        return charts;
      default:
        return comments;
    }
  };

  return (
    <div>
      <nav className="nav-wrapper primary-color">
        <ul className="left" style={{marginLeft: 120}}>
          <li>
            <i className="material-icons white-text right">
              subdirectory_arrow_right
            </i>
          </li>
          <li className={`${navbarView.comments} tab-link`}>
            <Link
              className="center-align"
              id="comments"
              onClick={tabClickHandler}
            >
              Comments
            </Link>
          </li>
          <li className={`${navbarView.charts} tab-link`}>
            <Link
              className="center-align"
              id="charts"
              onClick={tabClickHandler}
            >
              Charts
            </Link>
          </li>
        </ul>
      </nav>
      <div className="background">
        <div className="container center template-board">
          <button
            className="modal-trigger pulse btn-large secondary-color"
            href="#modal"
          >
            LEAVE US SOME FEEDBACK
          </button>

          {renderTabConent()}
        </div>

        <div id="modal" className="modal">
          {SendFeedback(template)}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
