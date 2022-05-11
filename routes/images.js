// const express = require('express')
// const router = express.Router()
const {Router} = require('express')
const router = new Router()

const {allImages, getImageByTask} = require('../controllers/imageControllers')
const { requireAuthAdmin, requireAuthUser} = require('../middleware/auth')





router.get('/allImages',requireAuthAdmin, allImages)
router.get('?query=627bb816b8fbd527335d7998', requireAuthUser,getImageByTask)


module.exports = router
