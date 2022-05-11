
// const express = require('express')
// const router = express.Router()
const {Router} = require('express')
const router = new Router()


const { register } = require('../controllers/auth/resisterControll')
const { login } = require('../controllers/auth/loginControll')
const { requireAuthAdmin } = require('../middleware/auth')
const validation = require('../middleware/validator')



router.post('/register',requireAuthAdmin,validation.register,register)
router.post('/login',validation.login, login)


module.exports = router