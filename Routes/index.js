const router = require('express').Router();
const authRoute = require('./UserRoutes');
const memeRoute = require('./MemeRoutes');

router.use('/auth', authRoute)
router.use('/meme', memeRoute)

