import { Typography, Stack, Grid, IconButton } from "@mui/material";
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
import { toPng } from "html-to-image";
import { Download } from "phosphor-react";
const MemeDashboard = () => {
  const [memes, setMemes] = useState([]);
  const ref = useRef();
  useEffect(() => {
    getMeme();
  }, []);

  function getMeme() {
    getDataAPI("meme/get-all-meme").then((res) => setMemes(res.data));
  }
  // console.log(memes.length, "memes");
  const download = (index) => { 
    if (ref.current === null) {
      return;
    }

    console.log(ref.current, "reffffffff", index);
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Fragment>
      <Header />
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
                  <>
                    <Grid item xs={4} >
                      <Stack ref={ref} id={index} className="meme-dashboard">
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
                      <IconButton onClick={download(index)}>
                        <Download />
                      </IconButton>
                    </Grid>
                  </>
                ))
              : []}
          </Grid>
        </Stack>
      </Stack>
    </Fragment>
  );
};

export default MemeDashboard;
