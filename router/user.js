const router = require('express').Router()
const userController = require('../controller/usercontroller')
const verify = require('../middleware/verifyUser')

router.post('/signup', userController.SignUp)
router.post('/signin', userController.SignIn)
router.get('/getuser', verify, userController.GetUser)

module.exports = router