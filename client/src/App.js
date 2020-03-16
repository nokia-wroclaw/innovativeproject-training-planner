import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from "./components/layout/navbar.component";
import CreateUser from "./components/user/createUser.component";
import CreateInviteTemplate from "./components/template/createInviteTemplate.component";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' />
          <Route path="/useres" component={CreateUser} />
          <Route path="/inviteTemplate" component={CreateInviteTemplate} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;