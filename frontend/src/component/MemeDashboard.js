import { Typography, Stack, Grid, IconButton, Tabs, Tab } from "@mui/material";
import React, {
  Fragment,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { getDataAPI } from "../utils/API";
import Header from "./Header";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import Meme from "./Meme";

const MemeDashboard = () => {
  const [memes, setMemes] = useState([]);
  const [memeByUserId, setMemeByUserId] = useState([]);
  const [user, setUser] = useState("");
  const [value, setValue] = React.useState(0);


  useEffect(() => {
    getMeme();
    getMemeById(user)
    getUser();
  }, [getUser]);
  async function getUser() {
    getDataAPI("user/refresh_token").then(function (token) {
      if (token.data.access_token) {
        console.log(token.data, "token and data")
        getDataAPI(
          `get_user/${token.data.user._id}`,
          token.data.access_token
        ).then((res) => {
          setUser(res.data);
        });
      }
    });
  }
  function getMeme() {
    getDataAPI("meme/get-all-meme").then((res) => setMemes(res.data));
  }
  function getMemeById(user) {
    getDataAPI(`meme/get-meme/${user._id}`).then((res) => setMemeByUserId(res.data))
  }
  console.log(memes,"memes")
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
      <Header />
      <Stack height={"100%"} width="auto" maxHeight={"100vh"}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{ px: 2, pt: 2 }}
        >
          <Tab label="All Memes" />
          <Tab label="Mine" />
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

          {/* <Grid container spacing={2}>
            {memes && memes.length > 0
              ? memes.map((item, index) => (
                  <>
                    <Meme item={item} downloadImg={downloadImg} index={index} />
                    <Grid item xs={4}  key={index} >
                      <Stack  id={`meme-${index}`} className="meme-dashboard">
                        <img
                          src={item.url}
                          alt={item.url}
                          style={{ maxHeight: 210, borderRadius: "10px" }}
                          className="meme-img"
                        />
                        <Typography className="topText">
                          {item.topText}
                        </Typography>
                        <Typography className="bottomText">
                          {item.bottomText}
                        </Typography>
                      </Stack>
                      <IconButton onClick={() => {
                        downloadImg(index)
                      }}>
                        <Download />
                      </IconButton>
                    </Grid>
                  </>
                ))
              : []}
          </Grid> */}
        </Stack>
      </Stack>
    </Fragment>
  );
};

export default MemeDashboard;
