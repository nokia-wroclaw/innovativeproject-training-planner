import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useOktaAuth} from '@okta/okta-react';
import TemplateCard from './templateCard.component';
import M from 'materialize-css';
import axios from 'axios';

const TemplateDashboard = () => {
  const {authState, authService} = useOktaAuth();
  const [templatelist, setTemplateList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tooltip, setTooltip] = useState('');

  // This useEffect is used to get info about user
  // It probably can be put as local value only after loggin
  useEffect(() => {
    // init materialize css components
    let elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems, {
      direction: 'left',
      hoverEnabled: false,
    });
    // init tooltip for add a new template button
    elems = document.querySelectorAll('.tooltipped');
    const tooltipTmp = M.Tooltip.init(elems, {
      position: 'left',
      html: 'Create a new invitation template',
    });
    setTooltip(tooltipTmp[0]);
  }, []);

  useEffect(() => {
    // if searchQuery changes its value
    if (authState.isAuthenticated) {
      const {accessToken} = authState;

      authService.getUser().then((info) => {
      // console.log(info, info.preferred_username);
        if (searchQuery !== '') {
          // and it's not an empty string
          // send GET request to find matching template
          axios
              .get(`/inviteTemplate/get/${searchQuery}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  userName: info.preferred_username,
                },
              })
              .then((res) => {
                setTemplateList(res.data);
              });
        } else {
          // if it's an empty string then show all templates
          axios
              .get(`/inviteTemplate/all`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  username: info.preferred_username,
                },
              })
              .then((res) => {
                setTemplateList(res.data);
              });
        }
      });
    }
  }, [searchQuery, authState, authService]);

  const onAddNew = () => {
    // close tooltip after clicking on the button
    tooltip.destroy(); // change to .close() if AddNew will be modal
  };

  const onSubmit = (event) => {
    // on submit just clear search bar
    event.preventDefault();
    setSearchQuery('');
  };

  return (
    <div className="container center">
      <br />
      <h5>
        <div className="row">
          <div className="col s6 offset-s3">
            <nav>
              <div className="nav-wrapper blue darken-1">
                <form onSubmit={onSubmit}>
                  <div className="input-field">
                    <input
                      id="search"
                      type="search"
                      required
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <label className="label-icon" htmlFor="search">
                      <i className="material-icons">search</i>
                    </label>
                    <i className="material-icons">close</i>
                  </div>
                </form>
              </div>
            </nav>
          </div>
        </div>
      </h5>
      <div className="row">
        {templatelist.map((item) => (
          <div className="col s12 m6" key={item._id}>
            <TemplateCard item={item} />
          </div>
        ))}
      </div>
      <div className="fixed-action-btn left tooltipped" onClick={onAddNew}>
        <Link
          to="/inviteTemplate"
          className={
            'btn-floating pulse btn-large waves-effect' +
            'waves-light pink lighten-1'
          }
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default TemplateDashboard;
