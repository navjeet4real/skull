const router = require("express").Router();
const memeController = require("../Controller/MemeController")

router.get("/meme/get-all-meme",memeController.getAllMeme)
router.get("/meme/get-meme/:id",memeController.getMemeById)

router.post("/meme/post-meme",memeController.postMeme)


module.exports = router;