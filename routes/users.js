
const express = require('express')
const router = express.Router()

const { requireAuthAdmin, requireAuthUser,requireAuthAdminWorker} = require('../middleware/auth')
const { getUser,  updateUser, deleteUser } = require('../controllers/userControllers')
const validation = require('../middleware/validator')


router.get('/allUsers', requireAuthAdmin, getUser)
router.get('/allWorkers?role=worker', requireAuthAdmin, getUser)
router.get('/allClients?role=client', requireAuthAdmin, getUser)
router.patch('/updateUser', requireAuthUser, validation.updateProfile, updateUser)
router.delete('/deletUser', requireAuthAdmin ,deleteUser)


module.exports = router