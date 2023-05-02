const Meme = require("../Models/MemeModel");
const User = require("../Models/UserModel");
const memeController = {
  getAllMeme: async (req, res) => {
    try {
      const memes = await Meme.find().populate({
        path: "userId",
        model: User,
      });

      if (!memes) {
        return res.json({
          status: 0,
          message: "nothing existed",
        });
      }
      return res.json(memes);
    } catch (error) {
      return res.status(500).json({ message: error.message, trace: error.stack });
    }
  },
  // get meme by user ID
  getMemeById: async (req, res) => {
    try {
      const id = req.params.id;
      const memes = await Meme.find({ userId: id });
      if (!memes) {
        return res.json({
          status: 0,
          message: "nothing existed",
        });
      }
      return res.json(memes);
    } catch (error) {
      return res.status(500).json({ message: error.message, trace: error.stack });
    }
  },
  totalMemeById: async (req, res) => {
    try {
      const id = req.params.id;
      const memeCount = await Meme.find({ userId: id }).count();

      return res.json(memeCount);
    } catch (error) {
      return res.status(500).json({ message: error.message, trace: error.stack });
    }
  },
  // post meme using user ID
  postMeme: async (req, res) => {
    try {
      console.log(req.body, "mmmmmmmmmmmmmmmmmm")
      const url = req.body.randomImg;
      const userId = req.body.id;
      const { topText, bottomText } = req.body.text;

      if (!topText || !bottomText) {
        return res.status(400).json({
          status: "error",
          message: "Write Some text",
        });
      }
      var newMeme = new Meme({
        userId: userId,
        topText: topText,
        bottomText: bottomText,
        url: url,
      });
      await newMeme.save();

      return res.json({
        memeId: newMeme._id,
        status: "success",
        message: "Meme Posted",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, trace: error.stack });
    }
  },
};

module.exports = memeController;
