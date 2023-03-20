const express = require('express')
const router = express.Router()
const { register, login, updateUser } = require('../controllers/auth')
const authentication = require('../middleware/authentication')
const testUser  = require('../middleware/testUser')

const rateLimiter = require('express-rate-limit')

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 1,
    message: {
        msg: 'Too many requests from this IP, Please try again after 15 minutes'
    }
})

router.post('/register', apiLimiter, register)
router.post('/login', apiLimiter, login)
router.patch('/updateUser', authentication, testUser, updateUser)

module.exports = router
