import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Security, LoginCallback } from "@okta/okta-react";
import Navbar from "./components/layout/navbar.component";
import TemplateDashboard from "./components/views/templateDashboard.component";
import CreateInviteTemplate from "./components/template/createInviteTemplate.component";
import SendInvite from "./components/invitation/sendInvite.component";
import UserProfile from "./components/user/userProfile.component";
import Home from "./components/views/home.component";

// TODO make it a local variable
const config = {
  issuer: "https://dev-820510.okta.com/oauth2/default",
  redirectUri: window.location.origin + "/implicit/callback",
  clientId: "0oa53fc7pgZWm2jyj4x6",
  pkce: true
};

function App() {
  return (
    <BrowserRouter>
      <Security {...config}>
        <Navbar />
        <Route exact path="/" />
        <Route path="/" exact={true} component={Home} />
        <Route path="/sendInvite" component={SendInvite} />
        <Route path="/inviteTemplate" component={CreateInviteTemplate} />
        <Route path="/templateDashboard" component={TemplateDashboard} />
        <Route path="/implicit/callback" component={LoginCallback} />
        <Route path="/profile" component={UserProfile} />
      </Security>
    </BrowserRouter>
  );
}

export default App;
