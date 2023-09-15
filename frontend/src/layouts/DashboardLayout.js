import { Stack } from "@mui/material";
import React, {useEffect} from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../component/Header";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slices/auth";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
  }, []);

  if (!isLoggedIn) {
    dispatch(getUser());
    return <Navigate to="/auth/login" />;
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
