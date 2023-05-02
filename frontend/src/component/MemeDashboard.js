import { Stack, Grid, Tabs, Tab } from "@mui/material";
import React, { Fragment, useEffect, useCallback } from "react";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import Meme from "./Meme";
import { useDispatch, useSelector } from "react-redux";
import { GetMemes, GetMemesByUserId } from "../redux/slices/app";

const MemeDashboard = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const { user } = useSelector((state) => state.auth);
  const { memeByUserId, memes } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(GetMemes());
    dispatch(GetMemesByUserId(user))
  }, [user]);

  const downloadImg = useCallback((index) => {
    var node = document.getElementById(`meme-${index}`);
    htmlToImage.toPng(node).then(function (dataUrl) {
      download(dataUrl, `meme-${index + 1}.png`);
    });
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Fragment>
      <Stack height={"100%"} width="auto" maxHeight={"100vh"}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{ px: 2, pt: 2 }}
        >
          <Tab
            label="All Memes"
            onClick={() => {
              dispatch(GetMemes());
            }}
          />
          <Tab
            label="Mine"
            onClick={() => {
              dispatch(GetMemesByUserId(user._id));
            }}
          />
        </Tabs>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
        >
          {(() => {
            switch (value) {
              case 0:
                return (
                  <Grid container spacing={2}>
                    {memes && memes.length > 0
                      ? memes.map((item, index) => (
                          <Meme
                            item={item}
                            downloadImg={downloadImg}
                            index={index}
                          />
                        ))
                      : []}
                  </Grid>
                );
              case 1:
                return (
                  <Grid container spacing={2}>
                    {memeByUserId && memeByUserId.length > 0
                      ? memeByUserId.map((item, index) => (
                          <Meme
                            item={item}
                            downloadImg={downloadImg}
                            index={index}
                            value={value}
                          />
                        ))
                      : []}
                  </Grid>
                );
              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Fragment>
  );
};

export default MemeDashboard;
