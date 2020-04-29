import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import TemplateCard from "../template/templateCard.component";
import M from "materialize-css";
import axios from "axios";

const TemplateDashboard = () => {
  const { authState, authService } = useOktaAuth();
  const [templatelist, setTemplateList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tooltip, setTooltip] = useState("");

  useEffect(() => {
    let elems = document.querySelectorAll(".fixed-action-btn");
    M.FloatingActionButton.init(elems, {
      direction: "left",
      hoverEnabled: false
    });
    elems = document.querySelectorAll(".tooltipped");
    let tooltipTmp = M.Tooltip.init(elems, {
      position: "left",
      html: "Create a new invitation template"
    });
    setTooltip(tooltipTmp[0]);
  }, []);

  useEffect(() => {
    if (authState.isAuthenticated) {
      const { accessToken } = authState;

      authService.getUser().then(info => {
        if (searchQuery !== "") {
          axios
            .get(`/inviteTemplate/get/${searchQuery}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                userName: info.preferred_username
              }
            })
            .then(res => {
              setTemplateList(res.data);
            });
        } else {
          axios
            .get(`/inviteTemplate/all`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                username: info.preferred_username
              }
            })
            .then(res => {
              setTemplateList(res.data);
            });
        }
      });
    }
  }, [searchQuery, authState, authService]);

  const onAddNew = () => {
    tooltip.destroy();
  };

  const onSubmit = event => {
    event.preventDefault();
    setSearchQuery("");
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
                      onChange={event => setSearchQuery(event.target.value)}
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
  );
};

export default TemplateDashboard;
