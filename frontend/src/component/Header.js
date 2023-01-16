import React from "react";
import { Link as RouterLink} from "react-router-dom";
import { Stack, Link } from "@mui/material";
const Header = () => {
  const logout = () => {
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('User signed out.');
    // });
  };
  return (
    <>
      {/* <div className="header container fluid">
        <div className="headerLeft">
          <img
            alt="skull"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Black_skull.svg/1024px-Black_skull.svg.png"
          />
          <Link to="/dashboard">
            <button className="button-54">Dashboard</button>
          </Link>
        </div>
        <div className="headerMiddle">
          <Link to="/home">Skull Meme Generator</Link>
        </div>
        <div className="headerRight">
          <Link type="button" to="/aboutUs">
            <button className="button-54">
              <span>About Us</span>
            </button>
          </Link>
          <button className="button-54" onClick={() => logout()}>
            <span>LogOut</span>
          </button>
        </div>
      </div> */}
      <Stack
        spacing={3}
        direction={"row"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Stack
          spacing={2}
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <img
            alt="skull"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Black_skull.svg/1024px-Black_skull.svg.png"
            sx={{width:64, height:64}}
          />
          <Link component={RouterLink} to='/dashboard'>
          
          </Link>
        </Stack>
      </Stack>
    </>
  );
};

export default Header;
