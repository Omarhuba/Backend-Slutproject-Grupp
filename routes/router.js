
const express = require('express')
const router = express.Router()

const { register } = require('../controllers/auth/resisterControll')
const { login } = require('../controllers/auth/loginControll')
const { createTask,getAllTasks } = require('../controllers/taskControllers')
const { createMessage, getMessageByTask } = require('../controllers/messageControll')
const { getAllUser, getAllWorkers, getAllClients } = require('../controllers/userControllers')


// Post requests
router.post('/register', register)
router.post('/login', login)
router.post('/task', createTask)
router.post('/message', createMessage)

// Get requests
router.get('/task/:id/', getMessageByTask)
router.get('/users', getAllUser)
router.get('/getWorkers', getAllWorkers)
router.get('/getClients', getAllClients)
router.get('/tasks',getAllTasks)



module.exports = router