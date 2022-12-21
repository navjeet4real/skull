const User = require("../Models/UserModel");

const userController = {

    createUser: async (req, res) => {
        try {
            console.log("APi runing")
              console.log(req.body,"reqqqqqqqqqqqqqqqqqqqqqqqqqq")
            // const url = req.body.randomImg;
            const { given_name, family_name, picture, email, email_verified } = req.body;
            const preUser = await User.find({email : email})
            console.log(preUser,"preUSer")
            let preEmail = preUser.email
            if(preEmail === email){
                return res.json({ status: 2, msg: "User already exist" });
            }else{
                var newUser = new User({
                    firstName: given_name,
                    lastName: family_name,
                    picture: picture,
                    email: email,
                    verified: email_verified,
                });
                await newUser.save();
            }
            // if (!url) {
            //     return res.json({ status: 0, errors });
            // }
            //   console.log(topText, bottomText, "kkkkkkkkkkkkkkkkkkkkkkkkkkk", url);
            
            
            return res.json({
                // memeId: newMeme._id,
                status: 1,
                msg: "User Created",
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message, trace: error.stack });
    }
  },
  //   getAllMeme: async (req, res) => {
  //     try {
  //       const memes = await Meme.find();
  
  //       if(!memes){
  //         return res.json({
  //             status: 0,
  //             msg: "nothing existed"
  //         })
  //       }
  //       console.log(memes,"memes")
  //       return res.json(memes)
  //     } catch (error) {
  //       return res.status(500).json({ msg: error.message, trace: error.stack });
  //     }
  //   },
};

module.exports = userController;
