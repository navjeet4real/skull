import { Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../component/Header";

const isAuthenticated = true;

const DashboardLayout = () => {
//   if (!isAuthenticated) {
//     return <Navigate to="/auth/login" />;
//   }
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
