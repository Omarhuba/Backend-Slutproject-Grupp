
const express = require('express')
const router = express.Router()

const { register } = require('../controllers/auth/resisterControll')
const { login } = require('../controllers/auth/loginControll')
const { createTask,getAllTasks,getTaskByWorker } = require('../controllers/taskControllers')
const { createMessage, getMessageByTask,getALLmessages } = require('../controllers/messageControll')
const { getAllUser, getAllWorkers, getAllClients, updateUser } = require('../controllers/userControllers')



// Post requests
router.post('/register', register)
router.post('/login', login)
router.post('/task',createTask)
router.post('/message', createMessage)

// Get requests
router.get('/users', getAllUser)
router.get('/getWorkers', getAllWorkers)
router.get('/getClients', getAllClients)
router.get('/tasks', getAllTasks)
router.get('/taskByWorker/:id', getTaskByWorker)
router.get('/messages', getALLmessages)
router.get('/task/:id/', getMessageByTask)

// Update requests
router.patch('/userUpdate', updateUser)



module.exports = router