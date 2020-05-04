import React from 'react';
import {Route} from 'react-router-dom';
import {LoginCallback, useOktaAuth} from '@okta/okta-react';

import Home from './views/home.component';
import Navbar from './layout/navbar.component';
import SendInvite from './invitation/sendInvite.component';
import UserProfile from './user/userProfile.component';
import TemplateDashboard from './views/templateDashboard.component';
import CreateInviteTemplate from './template/createInviteTemplate.component';
import UserCalendarDashboard from './views/userCalendarDashboard.component';

// TODO find and remove unnecessary checks for user auth

const AppWithAuth = () => {
  const {authState, authService} = useOktaAuth();

  const loggedOutView = () => (
    <div>
      <Route
        path="/"
        render={(props) => (
          <Home {...props} authState={authState} authService={authService} />
        )}
      />
      <Route path="/implicit/callback" component={LoginCallback} />
    </div>
  );

  const loggedInView = () => (
    <div>
      <Navbar />
      <Route exact path="/" />
      <Route path="/sendInvite" component={SendInvite} />
      <Route path="/inviteTemplate" component={CreateInviteTemplate} />
      <Route path="/templateDashboard" component={TemplateDashboard} />
      <Route path="/implicit/callback" component={LoginCallback} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/userCalendar" component={UserCalendarDashboard} />
    </div>
  );

  const showAppContent = () => {
    if (!authState.isAuthenticated) {
      return loggedOutView();
    } else {
      console.log('zalogowany');
      return loggedInView();
    }
  };

  return <div>{showAppContent()}</div>;
};

export default AppWithAuth;
