import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from "react";
import { getDataAPI } from '../utils/API';

const Profile = () => {
  const [user, setUser] = useState("");
  const [memeCount, setMemeCount] = useState(0);
  useEffect(() => {
    getUser();
    getTotalMemeById(user)
  }, [user]);

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
  function getTotalMemeById(user) {
    getDataAPI(`meme/total-meme/${user._id}`).then((res) => setMemeCount(res.data))
  }

  let fullName = user.firstName + " " + user.lastName
  return (
    <Stack justifyContent="center" alignItems={'center'} mt={5}>
      <Box
        sx={{
          height: "80vh",
          width: 520,

        }}>
        <Stack>
          <Stack justifyContent="center" alignItems="center" p={4} spacing={5} >
            <Avatar sx={{ width: 145, height: 145 }} src={user.picture} />
            <Typography variant='h5'>{fullName}</Typography>
          </Stack>
          <Stack p={4} spacing={5} >
            <Stack direction={'row'} justifyContent="space-between">
              <Typography>Email: </Typography>
              <Typography>{user.email}</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent="space-between">
              <Typography>Total Meme: </Typography>
              <Typography>{memeCount}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack justifyContent={'end'} alignItems='center'>
          <Button variant="contained"
            sx={{ backgroundColor: "#333" }}>Edit</Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default Profile
