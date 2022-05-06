
const express = require('express')
const router = express.Router()

const { register } = require('../controllers/auth/resisterControll')
const { login } = require('../controllers/auth/loginControll')
const { createTask,getAllTasks,getTaskByWorker } = require('../controllers/taskControllers')
const { createMessage, getMessageByTask,getALLmessages } = require('../controllers/messageControll')
const { getAllUser, getAllWorkers, getAllClients, updateUser } = require('../controllers/userControllers')
const { requireAuthAdmin, requireAuthUser,requireAuthAdminWorker} = require('../middleware/auth')




// Post requests
router.post('/register', register)
router.post('/login', login)
router.post('/task',requireAuthAdminWorker,createTask)
router.post('/message',requireAuthUser, createMessage)


// Get requests
router.get('/users', requireAuthAdmin, getAllUser)
router.get('/getWorkers', requireAuthAdmin, getAllWorkers)
router.get('/getClients', requireAuthAdmin, getAllClients)
router.get('/tasks', requireAuthAdmin, getAllTasks)
router.get('/taskByWorker/:id', requireAuthUser, getTaskByWorker)
router.get('/messages', requireAuthAdmin, getALLmessages)
router.get('/task/:id/', getMessageByTask)



// Update requests
router.patch('/userUpdate', requireAuthUser ,updateUser)



module.exports = router