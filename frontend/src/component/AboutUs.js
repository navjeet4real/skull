import {
  Box,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import { ArrowSquareLeft } from "phosphor-react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import noUs from "../images/no-us.png";

const AboutUs = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.25)",
          height: "100vh",
        }}
      >
        <Stack
          height={"100%"}
          width="auto"
          maxHeight={"100vh"}
          justifyContent="center"
          alignItems="center"
          spacing={5}
        >
          <img alt="" src={noUs} style={{ height: 600, width: 600 }} />
          <IconButton component={RouterLink} to="/home">
            <ArrowSquareLeft size={32} />
            <Typography sx={{ color: "#fff", backgroundColor: "#333" }}>
              Go create some Memes
            </Typography>
          </IconButton>
        </Stack>
      </Box>
    </>
  );
};

export default AboutUs;
