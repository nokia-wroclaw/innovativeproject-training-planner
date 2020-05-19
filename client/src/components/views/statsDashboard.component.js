import React, {useEffect, useState} from 'react';
import {useOktaAuth} from '@okta/okta-react';
import StatsCard from '../stats/statsCard.component';
import axios from 'axios';
import LoadingCircular from '../addons/loadingCircular.component';
import Pagination from '../layout/pagination.component';

const StatsDashboard = () => {
  const {authState, authService} = useOktaAuth();
  const {accessToken} = authState;

  const [isLoaded, setIsLoaded] = useState(false);

  const [username, setUsername] = useState('');
  const [templateList, setTemplateList] = useState([]);
  const [activePaginationTab, setActivePaginationTab] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const elemsPerPage = 12;

  useEffect(() => {
    authService.getUser().then((info) => {
      setUsername(info.preferred_username);
    });
  }, [authService]);

  useEffect(() => {
    if (templateList !== []) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }
  }, [isLoaded, templateList]);

  useEffect(() => {
    axios
        .get(`/inviteTemplate/pastTraining`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            username,
          },
        })
        .then((res) => setTemplateList(res.data));
  }, [accessToken, username]);

  const onSubmit = (event) => {
    event.preventDefault();
    setSearchQuery('');
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
        </ul>
        <ul className="right" style={{marginRight: '3%'}}>
          <i className="material-icons left">search</i>
          {/* TODO make this searchbar functional too*/}
          <li className="searchbar">
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
                        <StatsCard item={item} />
                      </div>
                    ))}
              </div>
            )}
          </div>

          <div className="row" style={{marginTop: 50}}>
            <Pagination
              elemsAmount={templateList.length}
              elemsPerPage={elemsPerPage}
              activeTab={activePaginationTab}
              changeTab={setActivePaginationTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
