const router = require('express').Router()
const songController = require('../controller/songController')
const upload = require('../middleware/uploads')
const verify = require('../middleware/verifyUser')

router.post('/addsong', verify, upload.single('image'), songController.AddSong)

router.get('/getsong', verify, songController.GetSong)

router.put('/addrating', verify, songController.AddRating)

router.get('/gettop10', verify, songController.GetTop10)

module.exports = router