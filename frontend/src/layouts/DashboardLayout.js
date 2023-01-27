import { Stack } from "@mui/material";
import React, {useEffect} from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Header from "../component/Header";
import { getDataAPI } from "../utils/API";

const isAuthenticated = true;

const DashboardLayout = () => {
  //   if (!isAuthenticated) {
  //     return <Navigate to="/auth/login" />;
  //   }
  let navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    getDataAPI("user/refresh_token").then(function (token) {
      if (!token.data.access_token) {
        navigate("/auth/login");
      }
    });
  }
  return (
    <>
      <Stack>
        <Header />
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;
