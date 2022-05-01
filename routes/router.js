
const express = require('express')
const router = express.Router()

const { register } = require('../controllers/auth/resisterControll')
const { login } = require('../controllers/auth/loginControll')


// Post requests
router.post('/register', register)
router.post('/login', login)




module.exports = router