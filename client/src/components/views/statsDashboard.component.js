import React, {useEffect, useState} from 'react';
import {useOktaAuth} from '@okta/okta-react';
import StatsCard from '../stats/statsCard.component';
import axios from 'axios';
import LoadingCircular from '../addons/loadingCircular.component';
import FadeIn from 'react-fade-in';

const StatsDashboard = () => {
  const {authState, authService} = useOktaAuth();
  const {accessToken} = authState;

  const [isLoaded, setIsLoaded] = useState(false);

  const [username, setUsername] = useState('');
  const [templateList, setTemplateList] = useState([]);

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
    <div className="container center" style={{height: 1050, marginTop: 50}}>
      {!isLoaded ? (
        <LoadingCircular style={{width: 200, height: 200, margin: 50}} />
      ) : (
        <div className="row">
          {templateList.map((item) => (
            <div className="col s12 m6" key={item._id}>
              <FadeIn>
                <StatsCard item={item} />
              </FadeIn>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatsDashboard;
