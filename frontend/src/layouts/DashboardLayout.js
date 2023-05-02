import { Stack } from "@mui/material";
import React, {useEffect} from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Header from "../component/Header";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/slices/auth";

const isAuthenticated = true;

const DashboardLayout = () => {
  
  const dispatch = useDispatch()
  // let navigate = useNavigate();
  useEffect(() => {
    dispatch(getUser())
  }, []);

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
