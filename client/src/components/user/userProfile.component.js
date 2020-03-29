import React, { useState, useEffect } from "react";
import { GoogleLogin } from 'react-google-login';

const UserProfile = () => {

function responseGoogle(response){

  console.log(response);
}

  function googleSDK(){

    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: 'YOUR_CLIENT_ID',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }

    // (function(d, s, id){
    //   var js, fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) {return;}
    //   js = d.createElement(s); js.id = id;
    //   js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
    //   fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'google-jssdk'));
  }

  function prepareLoginButton () {

  console.log(this.refs.googleLoginBtn);

  this.auth2.attachClickHandler(this.refs.googleLoginBtn, {},
      (googleUser) => {

      let profile = googleUser.getBasicProfile();
      console.log('Token || ' + googleUser.getAuthResponse().id_token);
      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
      //YOUR CODE HERE


      }, (error) => {
      alert(JSON.stringify(error, undefined, 2));
      });

  }

  useEffect(() => {

    googleSDK();
  })


          return (
            <GoogleLogin
              clientId="629147303109-b417pdhfab177nnf8jen6ta3qi59pf8k.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          );
}

export default UserProfile;
