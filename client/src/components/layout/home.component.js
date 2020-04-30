import React, {useEffect, useState} from 'react';
import {useOktaAuth} from '@okta/okta-react';

const Home = () => {
  const {authState, authService} = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  // This useEffect is used to get info about user
  // It probably can be put as local value only after loggin
  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
        console.log('You are logging as ' + info.preferred_username);
      });
    }
  }, [authState, authService]); // Update if authState changes

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <br />
      <br />
      <br />
      {userInfo && (
        <div>
          <p>Welcome back, {userInfo.preferred_username}!</p>
        </div>
      )}
      {!userInfo && (
        <div>
          <p>You are not logged!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
