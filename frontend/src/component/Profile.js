import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from 'react-router-dom';
import Meme from "./Meme"
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { useSelector } from 'react-redux';

const Profile = () => {
  const [memeCount, setMemeCount] = useState(0);
  // const [creatorMemes, setCreatorMemes] = useState([]);
  const {user} = useSelector((state) => state.auth)

  let { id } = useParams();
  useEffect(() => {
    // getCreator()
    // getTotalMemeById()
    // getUser()
    // getCreatorMemes()
  }, [id]);

  // async function getCreator() {
  //   getDataAPI(`get_user/${id}`).then((res) => {
  //     setCreator(res.data);
  //   });
  // }
 
  // function getTotalMemeById() {
  //   getDataAPI(`meme/total-meme/${id}`).then((res) => setMemeCount(res.data))
  // }
  // function getCreatorMemes() {
  //   getDataAPI(`meme/get-meme/${id}`).then((res) => setCreatorMemes(res.data))
  // }
  // let fullName = creator.firstName + " " + creator.lastName

  const downloadImg = useCallback((index) => {
    var node = document.getElementById(`meme-${index}`);
    htmlToImage.toPng(node).then(function (dataUrl) {
      download(dataUrl, `meme-${index + 1}.png`);
    });
  }, []);
  return (
  <>
    <Stack justifyContent="center" alignItems={'center'} mt={5}>
      <Box
        sx={{
          width: 520,
        }}>
        <Stack>
          <Stack justifyContent="center" alignItems="center" p={4} spacing={5} >
            {/* <Avatar sx={{ width: 145, height: 145 }} src={creator.picture} /> */}
            {/* <Typography variant='h5'>{fullName}</Typography> */}
          </Stack>
          <Stack p={4} spacing={5} >
            <Stack direction={'row'} justifyContent="space-between">
              <Typography>Email: </Typography>
              <Typography>
                {/* {creator.email} */}
                </Typography>
            </Stack>
            <Stack direction={'row'} justifyContent="space-between">
              <Typography>Total Meme: </Typography>
              <Typography>
                {/* {memeCount} */}
                </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack justifyContent={'end'} alignItems='center'>
          {/* {
            user._id && creator._id && <>
              <Button variant="contained"
                sx={{ backgroundColor: "#333" }}>Edit</Button>
            </>
          } */}

        </Stack>
      </Box>
    </Stack>
    <Stack p={3}>
    <Typography variant='h4'>Creator Memes: </Typography>
    <Grid container spacing={2} p={3} >
      {/* {creatorMemes && creatorMemes.length > 0
        ? creatorMemes.map((item, index) => (
          <Meme
            item={item}
            downloadImg={downloadImg}
            index={index}
            value={1}
          />
        ))
        : []} */}
    </Grid>
  </Stack>
    </>
  )
}

export default Profile
