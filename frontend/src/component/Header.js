import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Stack,
  Link,
  Avatar,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Article, SignOut, User } from "phosphor-react";
import { getDataAPI } from "../utils/API";
const Profile_Menu = [
  {
    title: "Profile",
    icon: <User />,
  },
  {
    title: "About Us",
    icon: <Article />,
  },
  {
    title: "Logout",
    icon: <SignOut />,
  },
];
const Header = () => {
  const [user, setUser] = useState("");

  const logout = () => {
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('User signed out.');
    // });
  };

  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    getUser();
  },[])
  async function getUser() {
    getDataAPI("user/refresh_token").then(function (token) {
      if (token.data.access_token) {
        console.log(token.data,"token and data")
        getDataAPI(
          `get_user/${token.data.user._id}`,
          token.data.access_token
        ).then((res) => {
          setUser(res.data);
        });
      }
    });
  }
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.25)",
          height: "100px",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent="space-around"
          alignItems={"center"}
          sx={{ width: "100%", height: "100%" }}
        >
          <Stack
            spacing={2}
            direction={"row"}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Avatar
              sx={{ height: 74, width: 74 }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Black_skull.svg/1024px-Black_skull.svg.png"
            />
            <Link
              component={RouterLink}
              to="/dashboard"
              color={"inherit"}
              variant="h6"
              fontSize={30}
              underline="none"
            >
              Dashboard
            </Link>
          </Stack>
          <Stack>
            <Link
              component={RouterLink}
              to="/home"
              color={"inherit"}
              variant="h6"
              fontSize={30}
              underline="none"
            >
              Skull Meme Generator
            </Link>
          </Stack>
          <Stack justifyContent={"row"} direction="row" spacing={2}>
            <Avatar
              src={user.picture}
              alt={user.firstName}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
            <Stack spacing={0.2} onClick={handleClick}>
              <Typography>{user.firstName + " " + user.lastName}</Typography>
              <Typography variant="caption">Mr. Solo Dolo III</Typography>
            </Stack>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Stack spacing={1} px={1}>
                {Profile_Menu.map((item, index) => (
                  <MenuItem onClick={handleClick} key={index}>
                    <Stack
                      sx={{ width: 100 }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="space-between"
                    >
                      <span>
                        <Link
                          component={RouterLink}
                          to="/aboutUs"
                          color={"inherit"}
                          underline="none"
                        >
                          {item.title}
                        </Link>
                      </span>
                      {item.icon}
                    </Stack>
                  </MenuItem>
                ))}
              </Stack>
            </Menu>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Header;
