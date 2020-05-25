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
import BookingDashboard from './views/bookingDashboard.component';
import CreateInviteTemplate from './template/createInviteTemplate.component';
import StatsDashboard from './views/statsDashboard.component';
import Feedback from './stats/feedback.component';
import LoginLoading from './views/loginLoading.component';

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
      <Route path="/implicit/callback" component={LoginCallback} />
      <Route path="/implicit/callback" component={LoginLoading} />
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
      <Route path="/profile" component={UserProfile} />
      <Route path="/bookingCalendar" component={BookingDashboard} />
      <Route path="/statistics" component={StatsDashboard} />
      <Route path="/feedback" component={Feedback} />
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
