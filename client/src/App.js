import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from "./components/layout/navbar.component";
import TemplateDashboard from "./components/template/templateDashboard.component";
import CreateInviteTemplate from "./components/template/createInviteTemplate.component";
import SendInvite from "./components/template/sendInvite.component"
import CreateUser from "./components/user/createUser.component";
import UserProfile from "./components/user/userProfile.component";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' />
          <Route path="/useres" component={CreateUser} />
          <Route path="/templateDashboard" component={TemplateDashboard} />
          <Route path="/inviteTemplate" component={CreateInviteTemplate} />
          <Route path="/sendInvite" component={SendInvite} />
          <Route path="/profile" component={UserProfile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;