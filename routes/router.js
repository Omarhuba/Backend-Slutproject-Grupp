
const express = require('express')
const router = express.Router()

const { register } = require('../controllers/auth/resisterControll')
const { login } = require('../controllers/auth/loginControll')
const { createTask,getAllTasks,getTaskByWorker, deleteTask, updateTask  } = require('../controllers/taskControllers')
const { createMessage, getMessageByTask,getALLmessages, deleteMessage } = require('../controllers/messageControll')
const { getAllUser, getAllWorkers, getAllClients, updateUser, deleteUser } = require('../controllers/userControllers')
const { requireAuthAdmin, requireAuthUser,requireAuthAdminWorker} = require('../middleware/auth')
const {imageUpload} = require('../middleware/images')
const validation = require('../middleware/validator')




// Post requests
router.post('/register',requireAuthAdmin,validation.register,register)
router.post('/login',validation.login, login)
router.post('/task',requireAuthAdminWorker,imageUpload,validation.createTask,createTask)
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
router.patch('/userUpdate', requireAuthUser , validation.updateProfile, updateUser)
router.patch('/taskUpdate', requireAuthAdminWorker,imageUpload ,validation.updateTask, updateTask)


// Delete requests
router.delete('/userDelete', requireAuthAdmin ,deleteUser)
router.delete('/taskDelete', requireAuthAdminWorker, deleteTask)
router.delete('/messageDelete/:id', requireAuthUser, deleteMessage)



module.exports = router