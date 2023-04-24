const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// jwt token
const signToken = (userId) => jwt.sign({ userId }, process.env.SECRET_KEY);
// jwt token end

const userController = {
  // get user details by id
  // getUser: async (req, res) => {
  //   try {
  //     const user = await User.findById(req.params.id);

  //     if (!user) {
  //       return res.status(400).json("user does not exist");
  //     }
  //     res.json(user);
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },
  // get user details by id
  getUser: async (req, res) => {
    try {
      const { user } = req;
      let userId = user._id;
      const userDoc = await User.findById(userId);
      if (!userDoc) {
        return res.status(400).json("user does not exist");
      }
      res.json(userDoc);
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
      const userDoc = await User.findOne({ email });
      if (userDoc) {
        // const isMatch = await bcrypt.compare(password, user.password);
        const token = signToken(userDoc._id);

        return res.json({
          status: "Success",
          message: "Logged In.",
          token,
          email,
          user_id: userDoc._id,
        });
      }
      const newUser = await new User.create({
        firstName: given_name,
        lastName: family_name,
        email: email,
        password: passwordHash,
        picture: picture,
        verified: email_verified,
      });

      newUser.save();
      console.log(newUser, "newUser")
      const token = signToken(newUser._id);
      console.log(token, "kkkkkkkk");
      return res.json({
        status: "Success",
        message: "Logged In.",
        token,
        email,
        user_id: newUser._id,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //protect middleware
  protect: async (req, res, next) => {
    try {
      // 1)  getting token (jwt) and check if it's available
      // console.log("enter ----protect---------");
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }

      if (!token) {
        return res.status(401).json({
          status: "error",
          message: "You are not logged In! Please log in to get access.",
        });
      }
      // console.log(token, "token -------------");

      // 2) verification of token

      const decoded = await promisify(jwt.verify)(
        token,
        process.env.SECRET_KEY
      );
      // console.log(decoded, "decoded --------------");
      // 3) check if user still exist

      const this_user = await User.findById(decoded.userId);

      if (!this_user) {
        return res.status(400).json({
          status: "error",
          message: "The user belonging to this token does not exist.",
        });
      }

      // 4) check if user cahnged their password after token is issued

      // if (this_user.chanedPasswordAfter(decoded.iat)) {
      //  return res.status(400).json({
      //     status: "error",
      //     message: "user recently updated password. Please log in again.",
      //   });
      // }
      // console.log(this_user, "this_user -------------");

      req.user = this_user;
      next();
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

        return res.json({ status: 1, msg: "logged out" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userController;
