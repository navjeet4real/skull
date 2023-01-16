import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { postDataAPI } from "../utils/API";
const Login = () => {
  const [user, setUser] = useState();
  let navigate = useNavigate();
  function handleCredentialResponse(response) {
    console.log("JWT token" + response.credential);
    var userDetails = jwt_decode(response.credential);
    console.log(userDetails);
    setUser(userDetails);
    document.getElementById("signIN").hidden = true;
    createUser();
    // navigate("/home");

  }
  // function onSignIn(googleUser) {
  //   var id_token = googleUser.getAuthResponse().id_token;
  //  console.log(id_token,"tokeeeeennnnnnn")
  // }
  //   if(user ){
  //     createUser(user);

  //   }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "183947174251-v0876c90evn4mddbt5m3uo1qq9movr7l.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signIN"), {
      theme: "outline",
      size: "large",
      type: "icon"
    });

    google.accounts.id.prompt();
  }, []);

  async function createUser() {
    const res = await postDataAPI("user/create-user", user);
    // onSignIn(user)
    if (res.data.status === 1) {
      navigate("/home");
    }
    if (res.data.status === 2) {
      navigate("/home");
    }
  }
  return (
    <>
      <div className="login-banner">
        <div id="signIN" className="login-button"></div>
      </div>
      {/* {user && (
        <div>
          <img alt="profile-picture" src={user.picture} />
          <h3>{user.name}</h3>
        </div>
      )} */}
    </>
  );
};

export default Login;
