import React from 'react';
import {Route} from 'react-router-dom';
import {LoginCallback, useOktaAuth} from '@okta/okta-react';

import Home from './views/home.component';
import Navbar from './layout/navbar.component';
import Footer from './layout/footer.component';
import Feedback from './stats/feedback.component';
import LoginPage from './views/login.component';
import CheckUser from './addons/checkUser.component';
import SendInvite from './invitation/sendInvite.component';
import UserProfile from './user/userProfile.component';
import LoginLoading from './views/loginLoading.component';
import StatsDashboard from './views/statsDashboard.component';
import TemplateDashboard from './views/templateDashboard.component';
import CreateInviteTemplate from './template/createInviteTemplate.component';
import UserCalendarDashboard from './views/userCalendarDashboard.component';

const AppWithAuth = () => {
  const {authState, authService} = useOktaAuth();

  const loggedOutView = () => (
    <div>
      <Route
        exact
        path="/"
        render={(props) => (
          <LoginPage
            {...props}
            authState={authState}
            authService={authService}
          />
        )}
      />
      <Route path="/implicit/callback" component={LoginLoading} />
      <Route path="/implicit/callback" component={LoginCallback} />
      <Footer />
    </div>
  );

  const loggedInView = () => (
    <div>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/checkUser" component={CheckUser} />
      <Route path="/sendInvite" component={SendInvite} />
      <Route path="/statistics" component={StatsDashboard} />
      <Route path="/userCalendar" component={UserCalendarDashboard} />
      <Route path="/inviteTemplate" component={CreateInviteTemplate} />
      <Route path="/templateDashboard" component={TemplateDashboard} />
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
