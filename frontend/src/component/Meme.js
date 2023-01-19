import { Grid, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Download } from "phosphor-react";
import React from "react";

const Meme = ({ item, downloadImg, index }) => {
  return (
    <>
      <Grid item xs={4} key={index}>
        <Stack id={`meme-${index}`} className="meme-dashboard">
          <img
            src={item.url}
            alt={item.url}
            style={{ maxHeight: 210, borderRadius: "10px" }}
            className="meme-img"
          />
          <Typography className="topText">{item.topText}</Typography>
          <Typography className="bottomText">{item.bottomText}</Typography>
        </Stack>
        <IconButton
          onClick={() => {
            downloadImg(index);
          }}
        >
          <Download />
        </IconButton>
      </Grid>
    </>
  );
};

export default Meme;
