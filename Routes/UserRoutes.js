const router = require("express").Router();
const userController = require("../Controller/UserController")

// router.get("/meme/get-all-meme",memeController.getAllMeme)
router.post("/user/create-user",userController.createUser)


module.exports = router;