import { Stack } from '@mui/material';
import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

const AuthLayout = () => {

  return (
    <>
    <Stack>
        <Outlet />
    </Stack>
    </>
  )
}

export default AuthLayout
