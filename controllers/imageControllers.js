const path = require('path');
const fs = require('fs');



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

module.exports = { allImages }
