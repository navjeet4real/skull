import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getDataAPI } from '../utils/API';

const Profile = () => {
  const [user, setUser] = useState("");
  const [creator, setCreator] = useState("");
  const [memeCount, setMemeCount] = useState(0);
  let { id } = useParams();
  useEffect(() => {
    getCreator(id);
    getTotalMemeById()
    getUser();
  }, [id]);

  async function getCreator(id) {
    getDataAPI(`get_user/${id}`).then((res) => {
      setCreator(res.data);
    });
  }
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
  function getTotalMemeById() {
    getDataAPI(`meme/total-meme/${id}`).then((res) => setMemeCount(res.data))
  }

  let fullName = creator.firstName + " " + creator.lastName
  return (
    <Stack justifyContent="center" alignItems={'center'} mt={5}>
      <Box
        sx={{
          height: "80vh",
          width: 520,

        }}>
        <Stack>
          <Stack justifyContent="center" alignItems="center" p={4} spacing={5} >
            <Avatar sx={{ width: 145, height: 145 }} src={creator.picture} />
            <Typography variant='h5'>{fullName}</Typography>
          </Stack>
          <Stack p={4} spacing={5} >
            <Stack direction={'row'} justifyContent="space-between">
              <Typography>Email: </Typography>
              <Typography>{creator.email}</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent="space-between">
              <Typography>Total Meme: </Typography>
              <Typography>{memeCount}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack justifyContent={'end'} alignItems='center'>
          {
            user._id && creator._id && <>
              <Button variant="contained"
                sx={{ backgroundColor: "#333" }}>Edit</Button>
            </>
          }

        </Stack>
      </Box>
    </Stack>
  )
}

export default Profile
