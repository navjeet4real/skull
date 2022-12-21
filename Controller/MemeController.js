const Meme = require("../Models/MemeModel");

const memeController = {
  getAllMeme: async (req, res) => {
    try {
      const memes = await Meme.find();

      if(!memes){
        return res.json({
            status: 0,
            msg: "nothing existed"
        })
      }
      console.log(memes,"memes")
      return res.json(memes)
    } catch (error) {
      return res.status(500).json({ msg: error.message, trace: error.stack });
    }
  },
  postMeme: async (req, res) => {
    try {
      // console.log("APi runing")
      //   console.log(req.body,"reqqqqqqqqqqqqqqqqqqqqqqqqqq")
      const url = req.body.randomImg;
      const { topText, bottomText } = req.body.text;
      if (!url) {
        return res.json({ status: 0, errors });
      }
      //   console.log(topText, bottomText, "kkkkkkkkkkkkkkkkkkkkkkkkkkk", url);

      var newMeme = new Meme({
        topText: topText,
        bottomText: bottomText,
        url: url,
      });
      await newMeme.save();

      return res.json({
        memeId: newMeme._id,
        status: 1,
        msg: "Meme Posted",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message, trace: error.stack });
    }
  },
};

module.exports = memeController;
