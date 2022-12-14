const Meme = require("../Model");

const memeController = {

    getAllMeme: async (req,res) => {
        try {
            
        } catch (error) {
            return res.status(500).json({ msg: error.message, trace: error.stack }); 
        }
    },

    postMeme: (req,res) => {
        try {
            const {topText, bottomText} = req.body.text
            console.log(topText, bottomText)
            res.json({
                status: 1,
                msg: "Meme Posted"
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message, trace: error.stack }); 
        }
    }
}

module.exports = memeController;