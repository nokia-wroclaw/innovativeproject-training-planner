import React from 'react';
import LoadingCircular from '../addons/loadingCircular.component';

const LoginLoading = (props) => {
  return (
    <div
      className="container center"
      style={{marginTop: 200, marginBottom: 200}}
    >
      <h2>Logging you in...</h2>
      <LoadingCircular style={{width: 200, height: 200}} />
    </div>
  );
};

export default LoginLoading;
