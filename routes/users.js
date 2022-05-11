
// const express = require('express')
// const router = express.Router()
const {Router} = require('express')
const router = new Router()

const { requireAuthAdmin, requireAuthUser,requireAuthAdminWorker} = require('../middleware/auth')
const { getUser,  updateUser, deleteUser } = require('../controllers/userControllers')
const validation = require('../middleware/validator')


router.get('/allUsers', requireAuthAdmin, getUser) //req.query
router.get('/allWorkers', requireAuthAdmin, getUser) //req.quer
router.get('/allClients', requireAuthAdmin, getUser) //req.query
router.patch('/updateUser', requireAuthUser, validation.updateProfile, updateUser)
router.delete('/deletUser', requireAuthAdmin ,deleteUser)


module.exports = router