import React from 'react';
import {Route} from 'react-router-dom';
import {LoginCallback, useOktaAuth} from '@okta/okta-react';

import Home from './views/home.component';
import LoginPage from './views/login.component';
import Navbar from './layout/navbar.component';
import Footer from './layout/footer.component';
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
          <LoginPage
            {...props}
            authState={authState}
            authService={authService}
          />
        )}
      />
      <Route path="/implicit/callback" component={LoginCallback} />
      <Footer />
    </div>
  );

  const loggedInView = () => (
    <div>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/sendInvite" component={SendInvite} />
      <Route path="/inviteTemplate" component={CreateInviteTemplate} />
      <Route path="/templateDashboard" component={TemplateDashboard} />
      <Route path="/implicit/callback" component={LoginCallback} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/userCalendar" component={UserCalendarDashboard} />
      <Footer />
    </div>
  );

  const showAppContent = () => {
    if (!authState.isAuthenticated) {
      return loggedOutView();
    } else {
      return loggedInView();
    }
  };

  return <div>{showAppContent()}</div>;
};

export default AppWithAuth;
