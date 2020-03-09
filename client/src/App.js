import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import CreateInviteTemplate from "./components/createInviteTemplate.component";

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
