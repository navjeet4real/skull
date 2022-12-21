import React, { Fragment, useState, useEffect } from "react";
import { getDataAPI, postDataAPI } from "../utils/API";
const initialState = { topText: "", bottomText: "" };

const MemeGenerator = () => {
  const [allMeme, setAllMeme] = useState([]);
  const [text, setText] = useState(initialState);
  const [randomImg, setRandomImg] = useState(
    "https://i.imgflip.com/46e43q.png"
  );

  const { topText, bottomText } = text;
  useEffect(() => {
    getAllMeme();
  }, []);
  function getAllMeme() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        setAllMeme(response.data.memes);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText((text) => ({ ...text, [name]: value }));
  };

  const changeMeme = () => {
    const randNum = Math.floor(Math.random() * allMeme.length);
    // console.log(randNum, "randNum");
    const randMemeImg = allMeme[randNum].url;
    setRandomImg(randMemeImg);
  };
  const handleSubmit = async () => {
    const res = await postDataAPI("meme/post-meme", { text, randomImg });
    console.log(res, "response");
  };
  return (
    <div>
      <form className="form col sm={12}">
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
        <button
          type="submit"
          onClick={() => handleSubmit()}
          className="button-54 col sm={6}"
        >
          Post Meme
        </button>
      </form>
      <button onClick={() => changeMeme()} className="button-54 col sm={6}">
        Change Meme
      </button>

      <div className="meme">
        <img className="meme-img" src={randomImg} alt="meme"  />
        <h2 className="topText">{topText}</h2>
        <h2 className="bottomText">{bottomText}</h2>
      </div>
    </div>
  );
};

export default MemeGenerator;
