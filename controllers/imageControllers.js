const path = require('path');
const fs = require('fs');
const { Task } = require('../models/taskModel')


const allImages = (req, res) => {
    try {
        const files = fs.readdirSync(path.join('assets', 'images'))
        images = []
        files.forEach((file) => {
            images.push(file)

        });
        res.json(images)
    } catch (error) {
        res.status(404).json(error.message)
    }

}


const getImageByTask = async (req, res) => {
    const { id } = req.query
    console.log(req.query);
    const task = await Task.findOne({_id: id })
    res.sendFile(task.image, { root: 'assets/images' })

}

module.exports = { allImages, getImageByTask }
