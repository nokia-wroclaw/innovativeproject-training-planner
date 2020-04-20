import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";

const Home = () => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then(info => {
        console.log(info);
        setUserInfo(info);
      });

      authService.getIdToken().then(info => {
        console.log(info);
        setUserInfo(info);
      });
    }
  }, [authState, authService]); // Update if authState changes

  const login = async () => {
    // Redirect to '/' after login
    authService.login("/");
  };

  const logout = async () => {
    // Redirect to '/' after logout
    console.log("----------------------");
    authService.logout("/");
  };

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>It cannon</h1>
      <h1>It cannon</h1>
      <h1>It cannon</h1>
      {(function() {
        if (authState.isAuthenticated) {
          return <button onClick={logout}>Logout</button>;
        } else {
          return <button onClick={login}>Login</button>;
        }
      })()}
      {userInfo && (
        <div>
          <p>Welcome back, {userInfo.preferred_username}!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
