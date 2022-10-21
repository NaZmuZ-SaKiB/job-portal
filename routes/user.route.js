const express = require('express')
const controller = require('../controllers/user.controller')
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router()

router.get('/me', verifyToken, controller.getMe)

router.post('/signup', controller.signup)
router.post('/login', controller.login)

module.exports = router
