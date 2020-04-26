import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Security, LoginCallback, useOktaAuth } from "@okta/okta-react";

import Navbar from "./components/layout/navbar.component";
import TemplateDashboard from "./components/template/templateDashboard.component";
import CreateInviteTemplate from "./components/template/createInviteTemplate.component";
import SendInvite from "./components/invitation/sendInvite.component";
import CreateUser from "./components/user/createUser.component";
import UserProfile from "./components/user/userProfile.component";
import Home from "./components/layout/home.component";

const config = {
  issuer: "https://dev-820510.okta.com/oauth2/default",
  redirectUri: window.location.origin + "/implicit/callback",
  clientId: "0oa53fc7pgZWm2jyj4x6",
  pkce: true
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/useres" component={CreateUser} />
          <Route path="/sendInvite" component={SendInvite} />
        </Switch>
      </div>

      <Security {...config}>
        <Navbar />
        <Route exact path="/" />
        <Route path="/" exact={true} component={Home} />
        <Route path="/inviteTemplate" component={CreateInviteTemplate} />
        <Route path="/templateDashboard" component={TemplateDashboard} />
        <Route path="/implicit/callback" component={LoginCallback} />
        <Route path="/profile" component={UserProfile} />
      </Security>
    </BrowserRouter>
  );
}

export default App;
