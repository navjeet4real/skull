import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { GoogleLogo } from "phosphor-react";
import useGoogleOAuth from "../hooks/useGoogleOAuth";
import { dispatchLogin } from "../redux/action/socialAction";
import { useDispatch, useSelector } from "react-redux";



const Login = () => {
  const [user, setUser] = useState();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  console.log(auth, "auth")
  if (auth && auth.data) {
    var response = auth.data;
    console.log(response,"response")
    if (response.errors === undefined) {
      response.errors = 0;
    }
    if (response.status === 1) {
      navigate("/dashboard")
    }
  }
  const googleLogin = useGoogleOAuth({
    onSuccess: async (res) => {
      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      console.log(res.data, "ddddddddddddd",user)
      dispatch(dispatchLogin(res.data));
      navigate("/dashboard");
    },
    onError: () => {
      console.log("google: Login Failed");
    },
  });

  
  return (
    <>
      <div className="login-banner">
        <div id="signIN" className="login-button">
          <IconButton  onClick={googleLogin} sx={{ backgroundColor: "white", boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;' }}>
            <GoogleLogo size={32} color="#DF3E30"  />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Login;
