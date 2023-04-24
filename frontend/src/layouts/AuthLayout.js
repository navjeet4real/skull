import React from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slices/auth";

const AuthLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(isLoggedIn, "kkkkkkkkkkkkkkk");
  if (isLoggedIn) {
    dispatch(getUser());
    return <Navigate to="/home" />;
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
