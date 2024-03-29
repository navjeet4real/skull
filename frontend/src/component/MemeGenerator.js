import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllTemplates, PostMeme } from "../redux/slices/app";

const initialState = { topText: "", bottomText: "" };
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
});

const MemeGenerator = () => {
  const [text, setText] = useState(initialState);
  const [randomImg, setRandomImg] = useState(
    "https://i.imgflip.com/46e43q.png"
  );

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const { topText, bottomText } = text;

  useEffect(() => {
    dispatch(GetAllTemplates());
  }, []);

  const { memeTemplates } = useSelector((state) => state.app);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText((text) => ({ ...text, [name]: value }));
  };
  
  const changeMeme = () => {
    const randNum = Math.floor(Math.random() * memeTemplates.length);
    const randMemeImg = memeTemplates[randNum].url;
    setRandomImg(randMemeImg);
  };

  const handleSubmit = async () => {
    dispatch(
      PostMeme({
        text,
        randomImg,
        id: user._id,
      })
    );
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent="space-evenly"
          alignItems={"center"}
          sx={{ width: "100%", height: "100%", mt: 5, mb: 5 }}
        >
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "70ch" },
            }}
            noValidate
            spacing={3}
            autoComplete="off"
          >
            <CssTextField
              id="outlined-basic"
              label="Top Text"
              variant="outlined"
              name="topText"
              value={topText}
              onChange={handleChange}
            />
            <CssTextField
              id="outlined-basic"
              label="Bottom Text"
              variant="outlined"
              name="bottomText"
              value={bottomText}
              onChange={handleChange}
            />
          </Box>
          <Stack direction={"row"} spacing={3}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#333" }}
              onClick={() => handleSubmit()}
            >
              Post Meme
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#333" }}
              onClick={() => changeMeme()}
            >
              Change Meme
            </Button>
          </Stack>
        </Stack>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#F8FAFF",
            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.25)",
            height: "700px",
          }}
          justifyContent="center"
          alignItems={"center"}
          className="meme"
        >
          <img className="meme-img1" src={randomImg} alt="meme" />
          <Typography variant="h2" className="topText">
            {topText}
          </Typography>
          <Typography variant="h2" className="bottomText">
            {bottomText}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default MemeGenerator;
