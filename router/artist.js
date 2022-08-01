const router = require('express').Router()
const artistController = require('../controller/artistController')
const verify = require('../middleware/verifyUser')


router.post('/addartist', verify, artistController.AddArtist)

router.get('/getartists', verify, artistController.GetArtists)

router.get('/gettop10', verify, artistController.GetTop10)

module.exports = router