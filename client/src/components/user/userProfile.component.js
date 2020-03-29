import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import M from "materialize-css";


const UserProfile = () => {
  function responseGoogleSuccess(response) {
    console.log(response);
    M.toast({ html: "DING DONG - Welcome in Google" });
  }

  function responseGoogleFailure(response) {
    console.log(response);
    M.toast({ html:"Your are Not logged!!" });
  }

  useEffect(() => {
    console.log(process.env.GOOGLE_KEY);
  });

  return (
    <GoogleLogin
      clientId="629147303109-b417pdhfab177nnf8jen6ta3qi59pf8k.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogleSuccess}
      onFailure={responseGoogleFailure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
};

export default UserProfile;
