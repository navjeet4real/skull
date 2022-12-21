import React from 'react'
import { Link } from 'react-router-dom'
import noUs from "../images/no-us.png"

const AboutUs = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100vh", alignItems: "center", color: "wheat", backgroundColor: "#333333" }}>
            <img alt="" src={noUs} />
            <Link type='button' to="/">
                <button className='button-54' style={{margin : "0 0 0 70px"}}>
                    Go back to your miserable life
                </button>
            </Link>
        </div>
  )
}

export default AboutUs
