import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { getDataAPI } from "../utils/API";

const MemeDashboard = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    getMeme();
  }, []);

  function getMeme() {
    getDataAPI("meme/get-all-meme").then((res) => setMemes(res.data));
  }
  console.log(memes.length, "memes");
  return (
    <Fragment>
      <div className="mt-5">
        {memes && memes.length > 0
          ? memes.map((data, index) => (
              <div className="meme">
                <img src={data.url} alt="" />
                <h2 className="topText">{data.topText}</h2>
                <h2 className="bottomText">{data.bottomText}</h2>
              </div>
            ))
          : []}
      </div>
    </Fragment>
  );
};

export default MemeDashboard;
