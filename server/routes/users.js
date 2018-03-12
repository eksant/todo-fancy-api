const { loginFacebook } = require('../controllers/users')
const express = require('express')
const router  = express.Router()

router.get('/login-fb', loginFacebook)

module.exports = router
