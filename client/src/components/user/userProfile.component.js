import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";

const UserProfile = () => {

    const { authState, authService } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);

      useEffect(() => {
        console.log("SetUserInfo");
        if (!authState.isAuthenticated) {
          // When user isn't authenticated, forget any user info
          setUserInfo(null);
        } else {
          authService.getUser().then(info => {
            console.log(info);
            setUserInfo(info);
          });
        }
      }, [authState, authService]); // Update if authState changes


        useEffect(() => {
          console.log("GetDataBaseData");
          if (userInfo !== null) {
            if (!authState.isAuthenticated) {
              // When user isn't authenticated, forget any user info
              // axios.get("/inviteTemplate/getforuser").then(response => {
              //   setTemplateList(response.data);
              // });
                console.log("NotLogged");
            } else {
              console.log(userInfo);
              const clientName = userInfo.preferred_username;
              console.log(clientName);
            }
          }
          else{
            console.log("NotLogged1");

          }
        }, [userInfo]);



    useEffect(() => {
      if (!authState.isAuthenticated) {
        // When user isn't authenticated, forget any user info
        console.log("cos2")
      } else {
        console.log("cos")
      }
    }, []); // Update if authState changes


    return(
      <div>
            <h5 className="center">There will be some stuff about user profile.</h5>

                  <h5 className="center">There will be some stuff about user profile.</h5>

                        <h5 className="center">There will be some stuff about user profile.</h5>

        </div>
    )
}

export default UserProfile;
