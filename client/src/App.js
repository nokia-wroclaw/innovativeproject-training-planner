import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from "./components/layout/navbar.component";
import CreateUser from "./components/user/createUser.component";
import CreateInviteTemplate from "./components/template/createInviteTemplate.component";

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/useres" component={CreateUser} />
          <Route path="/inviteTemplate" component={CreateInviteTemplate} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;