import React, {useEffect, useState} from 'react';
import {useOktaAuth} from '@okta/okta-react';
import axios from 'axios';
import LoadingCircular from '../addons/loadingCircular.component';

import ReminderCard from './reminderCard.component';

const MeetingReminder = () => {
  const {authState, authService} = useOktaAuth();
  const {accessToken} = authState;

  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState('');
  const [templateList, setTemplateList] = useState([]);
  // const [searchQuery, setSearchQuery] = useState('');

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
    const getUrl = `/inviteTemplate/upcoming/all`;
    axios
        .get(getUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            username,
          },
        })
        .then((res) => (
          setTemplateList(res.data)));
  }, [accessToken, username]);

  return (
    <div className="container center">
      <div >
        {!isLoaded ? (
<LoadingCircular />
) : (
<div className="row">
  {templateList.reverse()
      .slice(0, 3)
      .map((item) => (
        <div className="col s12" key={item._ixd}>
          <ReminderCard item={item} />
        </div>
      ))}
</div>
)}
      </div>
    </div>
  );
};

export default MeetingReminder;
