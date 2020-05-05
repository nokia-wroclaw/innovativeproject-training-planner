import React from 'react';

const Home = ({authState, authService}) => {
  const login = async () => {
    // Redirects to    ---------v--------- after login
    authService.login('/templateDashboard');
  };

  return (
    <div className="center-align">
      <h1>MiTraining Planner</h1>
      <button
        onClick={login}
        className="btn-large pulse waves-effect waves-light pink lighten-1"
      >
        Login
      </button>
    </div>
  );
};

export default Home;
