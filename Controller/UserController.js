const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAuthTokens = (id) => {
  const accesstoken = createAccessToken({ id });
  const refresh_token = createRefreshToken({ id });
  return { accesstoken, refresh_token };
};

const userController = {
  // get user details by id
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json("user does not exist");
      }
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Google Login
  googleLogin: async (req, res) => {
    try {
      const {
        access_token,
        email,
        email_verified,
        family_name,
        given_name,
        picture,
      } = req.body;
      const password = email + process.env.GOOGLE_CLIENT_SECRET;
      const passwordHash = await bcrypt.hash(password, 10);
      if (!email_verified) {
        return res.status(400).json({ msg: "Email verification failed." });
      }
      const user = await User.findOne({ email });
      if (user) {
        // const isMatch = await bcrypt.compare(password, user.password);
        const refresh_token = createRefreshToken({ id: user._id });
        const responseBody = {
          token: refresh_token,
          accessToken: access_token,
          status: 1,
        };
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/api/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.json({
          ...responseBody,
          user: { ...user._doc, password: " " },
          msg: "Login success!",
        });
      }
      const newUser = new User({
        firstName: given_name,
        lastName: family_name,
        email,
        password: passwordHash,
        picture: picture,
        verified: email_verified,
      });

      const userDoc = await newUser.save();

      const { accesstoken: accessToken, refresh_token } = getAuthTokens(
        userDoc._id
      );
      const responseBody = {
        token: refresh_token,
        accessToken: access_token,
        status: 1,
      };
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({
        ...responseBody,
        user: { ...userDoc._doc, password: " " },
        msg: "Login success!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //Function to check the refresh token.
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) {
        return res.json({ status: 0, msg: "please login first" });
      }
      //Verifying jwt token
      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) {
            return res.json({
              status: 0,
              msg: "an error occured while verifying referesh token",
            });
          }
          if (!result) {
            return res.json({ status: 0, msg: "user does not exist" });
          }
          const user = await User.findById(result.id);
          let access_token;
          if (user) {
            access_token = createAccessToken({ id: user._id });
          } else {
            return res.json({ status: 0, msg: "error occured" });
          }
          res.json({
            status: 1,
            access_token: access_token,
            user: {
              ...user._doc,
              password: " ",
            },
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // delete refreshtoken for logout
  logout: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOneAndUpdate({ email: email });
      let response;
      if (user) {
        response = await res.clearCookie("refreshtoken", {
          path: "/api/user/refresh_token",
        });
      }

      return res.json({ status: 1, msg: "logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "3d" });
};
module.exports = userController;
