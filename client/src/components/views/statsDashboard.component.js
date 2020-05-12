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

  return (
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
              {templateList.map((item) => (
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
  );
};

export default StatsDashboard;
