import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const logout = () => {};
  return (
    <div className="header container fluid">
      <div className="headerLeft">
          <img
            alt="skull"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Black_skull.svg/1024px-Black_skull.svg.png"
          />
        <Link to="/dashboard">
          <button className="button-54">Dashboard</button>
        </Link>
      </div>
      <div className="headerMiddle"><Link to="/home">Skull Meme Generator</Link></div>
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
    </div>
  );
};

export default Header;
