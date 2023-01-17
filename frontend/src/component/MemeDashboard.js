import { Typography, Stack, Grid } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { getDataAPI } from "../utils/API";
import Header from "./Header";

const MemeDashboard = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    getMeme();
  }, []);

  function getMeme() {
    getDataAPI("meme/get-all-meme").then((res) => setMemes(res.data));
  }
  console.log(memes.length, "memes");
  return (
    <Fragment>
      <Header />
      {/* <div className="mt-5">
        {memes && memes.length > 0
          ? memes.map((data, index) => (
              <div className="meme">
                <img className="meme-img" src={data.url} alt="" />
                <h2 className="topText">{data.topText}</h2>
                <h2 className="bottomText">{data.bottomText}</h2>
              </div>
            ))
          : []}
      </div> */}
      <Stack height={"100%"} width="auto" maxHeight={"100vh"}>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
        >
          <Grid container spacing={2}>
            {memes && memes.length > 0
              ? memes.map((item, index) => (
                  <Grid item xs={4} className="meme-dashboard">
                    <img
                      src={item.url}
                      alt={item.url}
                      style={{ maxHeight: 210, borderRadius: "10px" }}
                      className="meme-img" 
                    />
                    <Typography className="topText">{item.topText}</Typography>
                    <Typography className="bottomText">{item.bottomText}</Typography>
                    
                  </Grid>
                ))
              : []}
          </Grid>
        </Stack>
      </Stack>
    </Fragment>
  );
};

export default MemeDashboard;
