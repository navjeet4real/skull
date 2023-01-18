const router = require("express").Router();
const userController = require("../Controller/UserController")
const auth = require("../Middleware/auth");
// router.get("/meme/get-all-meme",memeController.getAllMeme)
// router.post("/user/create-user",userController.createUser)
router.post('/google_login', userController.googleLogin);
router.get("/user/refresh_token", userController.refreshToken);
router.get("/get_user/:id", userController.getUser);

module.exports = router;