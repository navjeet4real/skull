import { Grid, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Download } from "phosphor-react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Meme = ({ item, downloadImg, index, value }) => {
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
        <Stack
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <IconButton
            onClick={() => {
              downloadImg(index);
            }}
          >
            <Download />
          </IconButton>
          {value === 1 ? (
            ""
          ) : (
            <>
              <IconButton
                to={`/profile/${item.userId && item.userId._id}`}
                component={RouterLink}
              >
                <Typography variant="caption">
                  {item.userId && `Creator -  ${item.userId.firstName}`}{" "}
                  {item.userId && item.userId.lastName}
                </Typography>
              </IconButton>
            </>
          )}
        </Stack>
      </Grid>
    </>
  );
};

export default Meme;
