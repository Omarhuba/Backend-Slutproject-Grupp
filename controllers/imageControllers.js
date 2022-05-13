const path = require("path");
const fs = require("fs");
const { Task } = require("../models/taskModel");

const allImages = (req, res) => {
  try {
    const files = fs.readdirSync(path.join("assets", "images"));
    images = [];
    files.forEach((file) => {
      images.push(file);
    });

    if (images.length > 0) {
      res.json(images);
    } else {
      throw new Error("Image directory is empty!");
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getImageByTask = async (req, res) => {
  try {
    const files = fs.readdirSync(path.join("assets", "images"));
    const { id } = req.query;
    const task = await Task.findOne({ _id: id });
    const isFound = files.some((file) => file == task.image);
    console.log(isFound);
    if (!task.image) {
      throw new Error("This task has no image!");
    } else if (!isFound) {
      throw new Error("Task's image is missing on images directory!");
    } else {
      res.sendFile(task.image, { root: "assets/images" });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { allImages, getImageByTask };
