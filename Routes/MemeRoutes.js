const router = require("express").Router();
const memeController = require("../Controller/MemeController")

router.get("/get-all-meme",memeController.getAllMeme)
router.get("/get-meme/:id",memeController.getMemeById)
router.get("/total-meme/:id",memeController.totalMemeById)

router.post("/post-meme",memeController.postMeme)


module.exports = router;