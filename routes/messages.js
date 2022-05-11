const express = require('express')
const router = express.Router()

const { createMessage, getMessageByTask,getALLmessages, deleteMessage } = require('../controllers/messageControll')
const { requireAuthAdmin, requireAuthUser,requireAuthAdminWorker} = require('../middleware/auth')




router.post('/sendMessage',requireAuthUser, createMessage)
router.get('/allMessages', requireAuthAdmin, getALLmessages)
router.get('/getByTask/:id', getMessageByTask)
router.delete('/deleteById/:id', requireAuthUser, deleteMessage)





module.exports = router