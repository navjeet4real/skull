import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postDataAPI } from "../utils/API";
import { IconButton } from "@mui/material";
import { GoogleLogo } from "phosphor-react";
const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};
const Login = () => {
  const [user, setUser] = useState(initialState);
  let navigate = useNavigate();

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
        <div id="signIN" className="login-button">
          <IconButton sx={{ backgroundColor: "white" }}>
            <GoogleLogo size={32} color="#DF3E30" />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Login;
