const express = require('express')
const router = express.Router()

const {allImages, getImageByTask} = require('../controllers/imageControllers')
const { requireAuthAdmin, requireAuthUser} = require('../middleware/auth')





router.get('/allImages',requireAuthAdmin, allImages)
router.get('/imageFile?query=', requireAuthUser,getImageByTask)


module.exports = router
