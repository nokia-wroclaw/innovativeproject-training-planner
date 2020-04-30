import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useOktaAuth} from '@okta/okta-react';
import TemplateCard from './templateCard.component';
import M from 'materialize-css';
import axios from 'axios';

const linkStyle = {
  width: "5%",
  minWidth: 100,
};

const searchbarStyle = {
  width: "15%",
  minWidth: 250,
};

const TemplateDashboard = () => {
  const {authState, authService} = useOktaAuth();
  const [templatelist, setTemplateList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tooltip, setTooltip] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [navbarView, setNavbarView] = useState({
    pending: "active",
    sent: "",
    all: "",
  });

  useEffect(() => {
    let elems = document.querySelectorAll(".fixed-action-btn");
    M.FloatingActionButton.init(elems, {
      direction: "left",
      hoverEnabled: false,
    });

    elems = document.querySelectorAll(".tooltipped");
    let tooltipTmp = M.Tooltip.init(elems, {
      position: "left",
      html: "Create a new invitation template",
    });
    setTooltip(tooltipTmp[0]);

    elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems);

    elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }, []);

  useEffect(() => {
    if (authState.isAuthenticated) {
      const {accessToken} = authState;

      authService.getUser().then((info) => {
        if (searchQuery !== "") {
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
          axios
            .get(`/inviteTemplate/${activeTab}`, {
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
  }, [searchQuery, authState, authService, activeTab]);

  useEffect(() => {
    switch (activeTab) {
      case "pending":
        setNavbarView({ pending: "active", sent: "", all: "" });
        break;
      case "sent":
        setNavbarView({ pending: "", sent: "active", all: "" });
        break;
      case "all":
        setNavbarView({ pending: "", sent: "", all: "active" });
        break;
      default:
        setNavbarView({ pending: "", sent: "", all: "" });
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
    setActiveTab(event.target.id);
  };

  return (
    <div>
      {/* dashboard navbar  */}
      <nav className="nav-wrapper blue darken-3" style={{ marginBottom: 50 }}>
        <ul className="left" style={{ marginLeft: "1%" }}>
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
        <ul className="right" style={{ marginRight: "3%" }}>
          <i className="material-icons left">search</i>
          <li style={searchbarStyle}>
            <form onSubmit={onSubmit}>
              <input
                style={{ paddingLeft: 10, paddingRight: 10 }}
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

      {/* main content */}
      <div className="container center">
        <div className="row">
          {templatelist.map((item, i) => (
            <div className="col s12 m6">
              <TemplateCard item={item} />
            </div>
          ))}
        </div>
        <div className="fixed-action-btn left tooltipped" onClick={onAddNew}>
          <Link
            to="/inviteTemplate"
            className="btn-floating pulse btn-large waves-effect waves-light pink lighten-1"
          >
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TemplateDashboard;
