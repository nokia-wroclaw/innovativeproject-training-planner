import React, {useEffect, useState} from 'react';
import {useOktaAuth} from '@okta/okta-react';

const Home = () => {
  const {authState, authService} = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]);

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
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
