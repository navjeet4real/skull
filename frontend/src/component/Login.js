import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { GoogleLogo } from "phosphor-react";
import useGoogleOAuth from "../hooks/useGoogleOAuth";
import { useDispatch, useSelector } from "react-redux";



const Login = () => {
  const [user, setUser] = useState();
  const { auth } = useSelector((state) => state);
  console.log(auth, "auth")

  const googleLogin = useGoogleOAuth({
    onSuccess: async (res) => {
      setUser({ ...user, error: "" });
      localStorage.setItem("firstLogin", true);
    },
    onError: () => {
      console.log("google: Login Failed");
    },
  });

  
  return (
    <>
      <div className="login-banner">
        <div id="signIN" className="login-button">
          <IconButton  onClick={() => {
            googleLogin()
          }} sx={{ backgroundColor: "white", boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;' }}>
            <GoogleLogo size={32} color="#DF3E30"  />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Login;
