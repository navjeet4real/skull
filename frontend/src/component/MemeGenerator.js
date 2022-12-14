import React, { Fragment, useState,useEffect } from "react";
import { getDataAPI, postDataAPI } from "../utils/API";
const  initialState = { topText : "", bottomText: "" } 

const MemeGeneratorMain = () => {
  const [allMeme, setAllMeme] = useState([]);
  const [text, setText] = useState(initialState);
  const [randomImg, setRandomImg] = useState("https://i.imgflip.com/46e43q.png");

  const {topText, bottomText} = text
    // useEffect(() => {
    // })
    function getAllMeme () {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            setAllMeme(response.data.memes)
        })
    }
    getAllMeme()

  const handleChange = (e) => {
    const {name, value} = e.target
    setText((text) => ({ ...text, [name]: value }))
  }
  const changeMeme = (e) => {
    e.preventDefault();
    const randNum = Math.floor(Math.random() * allMeme.length)
    const randMemeImg = allMeme[randNum].url
    setRandomImg(randMemeImg)
  }
  const handleSubmit = () => {
    postDataAPI("meme/post-meme",text).then((res) => console.log(res.data))
  }
  return (
    <Fragment>
      <div>
        <form className="form col sm={12}" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Top text"
            name="topText"
            value={topText}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Bottom text"
            name="bottomText"
            value={bottomText}
            onChange={handleChange}
          />
          <button type="submit" className="button-54 col sm={6}">Post Meme</button>

        </form>
        <button onClick={changeMeme} className="button-54 col sm={6}">Change Meme</button>

        <div className="meme">
          <img src={randomImg} alt="" />
          <h2 className="topText">{topText}</h2>
          <h2 className="bottomText">{bottomText}</h2>
        </div>
      </div>
    </Fragment>
  );
};

export default MemeGeneratorMain;
