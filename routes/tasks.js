
const express = require('express')
const router = express.Router()


const { requireAuthAdmin, requireAuthUser,requireAuthAdminWorker} = require('../middleware/auth')
const { createTask, getAllTasks, getTaskByUser, deleteTask, updateTask } = require('../controllers/taskControllers')
const validation = require('../middleware/validator')
const {imageUpload} = require('../middleware/images')


router.post('/createTask',requireAuthAdminWorker,imageUpload,validation.createTask,createTask)
router.get('/allTasks', requireAuthAdmin, getAllTasks)
router.get('/:id', requireAuthUser, getTaskByUser)
router.patch('/taskUpdate', requireAuthAdminWorker, imageUpload, validation.updateTask, updateTask)
router.delete('/taskDelete', requireAuthAdminWorker, deleteTask)





module.exports = router