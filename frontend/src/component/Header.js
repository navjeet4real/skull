import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
import { getDataAPI, postDataAPI } from "../utils/API";
import { useDispatch, useSelector } from "react-redux";
import { dispatchGetUser } from "../redux/action/socialAction";
const Header = () => {
 
  const [user, setUser] = useState("");
  let navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  // const dispatch = useDispatch();
  // dispatch(dispatchGetUser())

  console.log(auth, "user")
  useEffect(() => {
    setUser(auth.user)
    // getUser();
  },[])
  // async function getUser() {
  //   getDataAPI("user/refresh_token").then(function (token) {
  //     if (token.data.access_token) {
  //       console.log(token.data,"token and data")
  //       getDataAPI(
  //         `get_user/${token.data.user._id}`,
  //         token.data.access_token
  //       ).then((res) => {
  //         setUser(res.data);
  //       });
  //     }
  //   });
  // }
  const logout = (user) => {
    console.log("jjjjjjjjjjjjjjj",user)
    postDataAPI("user/logout",{email:user.email}).then(function (res) {
      if (res.data.status === 1) {
        window.location.href = "/";
      }
    });
  };

  const Profile_Menu = [
    {
      key: 0,
      title: "Profile",
      icon: <User />,
      onclick: () => {},
    },
    {
      key: 1,
      title: "About Us",
      icon: <Article />,
      onclick: () => {
        navigate("/aboutUs")
      },

    },
    {
      key: 2,
      title: "Logout",
      icon: <SignOut />,
      onclick: () => {
        logout(user)
      },

    },
  ];
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
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
              src={user && user.picture ? user.picture : ""}
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
                {Profile_Menu.map(({ key, icon, title, onclick }) => (
                  <MenuItem 
                   key={key}
                   onClick={onclick}
                   
                   >
                    <Stack
                      sx={{ width: 100 }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="space-between"
                    >
                      <span>
                        {/* <Link
                          component={RouterLink}
                          to="/aboutUs"
                          color={"inherit"}
                          underline="none"
                        > */}
                          {title}
                        {/* </Link> */}
                      </span>
                      {icon}
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
