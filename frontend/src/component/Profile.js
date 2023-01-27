import { Stack } from '@mui/material'
import React, { useEffect, useState } from "react";
import { getDataAPI } from '../utils/API';

const Profile = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    getDataAPI("user/refresh_token").then(function (token) {
      if (token.data.access_token) {
        console.log(token.data, "token and data");
        getDataAPI(
          `get_user/${token.data.user._id}`,
          token.data.access_token
        ).then((res) => {
          setUser(res.data);
        });
      }
    });
  }
  return (
    <Stack alignItems={'center'} justifyContent='center'>
        <img src={user.picture}  /> 
    </Stack>
  )
}

export default Profile
