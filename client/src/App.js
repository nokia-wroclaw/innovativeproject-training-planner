import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Security} from '@okta/okta-react';

import AppWithAuth from './components/appWithAuth.component';

const config = {
  issuer: 'https://dev-820510.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '0oa53fc7pgZWm2jyj4x6',
  pkce: true,
};

const App = () => {
  return (
    <BrowserRouter>
      <Security {...config}>
        <AppWithAuth />
      </Security>
    </BrowserRouter>
  );
};

export default App;
