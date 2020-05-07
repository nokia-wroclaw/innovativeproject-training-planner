import React, {useEffect, useState} from 'react';
import {useOktaAuth} from '@okta/okta-react';
import StatsCard from '../stats/statsCard.component';
import axios from 'axios';

const StatsDashboard = () => {
  const {authState, authService} = useOktaAuth();
  const {accessToken} = authState;

  const [username, setUsername] = useState('');
  const [templatelist, setTemplateList] = useState([]);

  useEffect(() => {
    authService.getUser().then((info) => {
      setUsername(info.preferred_username);
    });
  }, [authService]);

  useEffect(() => {
    axios.get(`/inviteTemplate/pastTraining`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        username,
      },
    }).then((res) => setTemplateList(res.data));
  }, [accessToken, username]);

  return (
    <div className="container center">
      <br></br>
      <div className="row">
        {templatelist.map((item) => (
          <div className="col s12 m6" key={item._id}>
            <StatsCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsDashboard;
