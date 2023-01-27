import { Stack } from "@mui/material";
import React, {useEffect} from "react";

import {
  Outlet,
  useNavigate,
} from "react-router-dom";
import { getDataAPI } from "../utils/API";

const AuthLayout = () => {
  let navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    getDataAPI("user/refresh_token").then(function (token) {
      if (token.data.access_token) {
        navigate("/home");
      }
    });
  }
  return (
    <>
      <Stack>
        <Outlet />
      </Stack>
    </>
  );
};

export default AuthLayout;
