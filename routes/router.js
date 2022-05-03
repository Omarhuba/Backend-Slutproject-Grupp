
const express = require('express')
const router = express.Router()

const { register } = require('../controllers/auth/resisterControll')
const { login } = require('../controllers/auth/loginControll')
const { createTask } = require('../controllers/taskControllers')
const{createMessage, getMessageByTask} = require('../controllers/messageControll')


// Post requests
router.post('/register', register)
router.post('/login', login)
router.post('/task', createTask)
router.post('/message', createMessage)

// Get requests
router.get('/task/:id/', getMessageByTask)



module.exports = router