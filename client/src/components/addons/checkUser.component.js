import React from 'react';
import axios from 'axios';
import {useEffect} from 'react';
import {useOktaAuth} from '@okta/okta-react';
import {useHistory} from 'react-router';

const CheckUser = () => {
  // const [username, setUsername] = useState('');
  const {authState, authService} = useOktaAuth();
  const history = useHistory();

  useEffect(() => {
    authService.getUser().then((info) => {
      const username = info.preferred_username;
      axios
          .get(`/users/isUser`, {
            headers: {
              username,
            },
          })
          .then((res) => {
            console.log(res);
          });
    });
    history.push('/');
  }, [authState, authService, history]);

  return (
    <div className="center-align">
      <h1>Loading</h1>
    </div>
  );
};

export default CheckUser;
