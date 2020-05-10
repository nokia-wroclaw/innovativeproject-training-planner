import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useOktaAuth} from '@okta/okta-react';
import TemplateCard from '../template/templateCard.component';
import LoadingCircular from '../addons/loadingCircular.component';
import Pagination from '../layout/pagination.component';
import M from 'materialize-css';
import axios from 'axios';

const linkStyle = {
  width: '5%',
  minWidth: 100,
};

const searchbarStyle = {
  width: '15%',
  minWidth: 250,
};

const TemplateDashboard = () => {
  const {authState, authService} = useOktaAuth();
  const {accessToken} = authState;

  const [isLoaded, setIsLoaded] = useState(false);

  const [username, setUsername] = useState('');
  const [templateList, setTemplateList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tooltip, setTooltip] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [navbarView, setNavbarView] = useState({
    pending: 'active',
    sent: '',
    all: '',
  });
  const [activePaginationTab, setActivePaginationTab] = useState(1);
  const elemsPerPage = 12;

  useEffect(() => {
    authService.getUser().then((info) => {
      setUsername(info.preferred_username);
    });
  }, [authService]);

  useEffect(() => {
    if (templateList !== [] && searchQuery === '') {
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }
  }, [isLoaded, templateList, searchQuery]);

  useEffect(() => {
    let elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems, {
      direction: 'left',
      hoverEnabled: false,
    });

    elems = document.querySelectorAll('.tooltipped');
    const tooltipTmp = M.Tooltip.init(elems, {
      position: 'left',
      html: 'Create a new invitation template',
    });
    setTooltip(tooltipTmp[0]);

    elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);

    elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }, []);

  useEffect(() => {
    if (searchQuery !== '') {
      axios
          .get(`/inviteTemplate/get/${searchQuery}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              username,
            },
          })
          .then((res) => {
            setTemplateList(res.data);
          });
    } else {
      axios
          .get(`/inviteTemplate/${activeTab}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              username,
            },
          })
          .then((res) => {
            setTemplateList(res.data);
          });
    }
  }, [searchQuery, accessToken, username, activeTab]);

  useEffect(() => {
    switch (activeTab) {
      case 'pending':
        setNavbarView({pending: 'active', sent: '', all: ''});
        break;
      case 'sent':
        setNavbarView({pending: '', sent: 'active', all: ''});
        break;
      case 'all':
        setNavbarView({pending: '', sent: '', all: 'active'});
        break;
      default:
        setNavbarView({pending: '', sent: '', all: ''});
        break;
    }
  }, [activeTab]);

  const onAddNew = () => {
    tooltip.destroy();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSearchQuery('');
  };

  const tabClickHandler = (event) => {
    event.preventDefault();
    const id = event.target.id;
    setTimeout(() => {
      setActivePaginationTab(1);
    }, 1000);
    setActiveTab(id);
  };

  return (
    <div>
      {/* dashboard navbar  */}
      <nav className="nav-wrapper blue darken-3">
        <ul className="left" style={{marginLeft: '1%'}}>
          <li>
            <i className="material-icons white-text right">
              subdirectory_arrow_right
            </i>
          </li>
          <li className={navbarView.pending} style={linkStyle}>
            <Link
              className="center-align"
              id="pending"
              onClick={tabClickHandler}
            >
              Pending
            </Link>
          </li>
          <li className={navbarView.sent} style={linkStyle}>
            <Link className="center-align" id="sent" onClick={tabClickHandler}>
              Sent
            </Link>
          </li>
          <li className={navbarView.all} style={linkStyle}>
            <Link className="center-align" id="all" onClick={tabClickHandler}>
              All
            </Link>
          </li>
        </ul>
        <ul className="right" style={{marginRight: '3%'}}>
          <i className="material-icons left">search</i>
          <li style={searchbarStyle}>
            <form onSubmit={onSubmit}>
              <input
                style={{paddingLeft: 10, paddingRight: 10}}
                className="white"
                id="search"
                placeholder="Search..."
                required
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </form>
          </li>
        </ul>
      </nav>

      <div className="background">
        {/* main content */}
        <div className="container center">
          <div className="row">
            <Pagination
              elemsAmount={templateList.length}
              elemsPerPage={elemsPerPage}
              activeTab={activePaginationTab}
              changeTab={setActivePaginationTab}
            />
          </div>

          <div className="template-board">
            {!isLoaded ? (
              <LoadingCircular />
            ) : (
              <div className="row">
                {templateList
                    .slice(
                        (activePaginationTab - 1) * elemsPerPage,
                        activePaginationTab * elemsPerPage,
                    )
                    .map((item) => (
                      <div className="col s12 m6" key={item._id}>
                        <TemplateCard item={item} />
                      </div>
                    ))}
              </div>
            )}
          </div>

          <div className="row">
            <Pagination
              elemsAmount={templateList.length}
              elemsPerPage={elemsPerPage}
              activeTab={activePaginationTab}
              changeTab={setActivePaginationTab}
            />
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
      </div>
    </div>
  );
};

export default TemplateDashboard;
