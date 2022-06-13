import React from "react"
import "./App.css"
import { Link } from "react-router-dom";


function Header() {
    return ( 
        <div className = "header container fluid">
            <div className="headerLeft">
                <img alt="skull" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Black_skull.svg/1024px-Black_skull.svg.png" />
            </div>
            <div className="headerMiddle">
               Skull Meme Generator
            </div>
            <div className="headerRight">
               
                {/* <button className="linkBtn"><span>About Us</span></button> */}
                <Link
                    type="button"
                    className="linkBtn"
                    to="/aboutUs"
                  >
                    <span>About Us</span>
                  </Link>
            </div>
        </div>

        )
}

export default Header