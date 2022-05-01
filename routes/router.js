
const express = require('express')
const router = express.Router()

const { register } = require('../controllers/auth/resisterControll')
const { login } = require('../controllers/auth/loginControll')
const { createTask } = require('../controllers/taskControllers')


// Post requests
router.post('/register', register)
router.post('/login', login)
router.post('/task', createTask)





module.exports = router