const { Task } = require("../models/taskModel");
const { User } = require("../models/userModel");
const { TaskNotFound } = require("../error");

const createTask = async (req, res) => {
  try {
    const { title, desc, clientEmail, finishedAt } = req.body;

    const { id } = req.user;

    let filename = "";

    if (req.file && !req.fileError) {
      filename = req.file.filename;
    }

    if (req.fileError) {
      throw new Error(req.fileError);
    }

    const user = await User.findById({ _id: id }).select("-password");

    const client = await User.findOne({ email: clientEmail });
    const task = await new Task({
      title,
      desc,
      image: filename,
      creator_id: user._id,
      client_id: client._id,
      finishedAt,
    });

    await task.save();
    res.json({ task, message: "A new task created!" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({}).exec();
    res.json(allTasks);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getTaskByUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (user.role == "worker" || user.role == "admin") {
      const tasks = await Task.find({ creator_id: user._id }).exec();
      if (tasks.length < 1) {
        throw new TaskNotFound(id);
      }
      res.json(tasks);
    } else {
      const tasks = await Task.find({ client_id: user._id }).exec();
      if (tasks.length < 1) {
        throw new TaskNotFound(id);
      }
      res.json(tasks);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getTaskByClient = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (user.role == "client") {
      const tasks = await Task.find({ client_id: user._id });
      if (tasks.length < 1) {
        throw new TaskNotFound(id);
      }
      res.json(tasks);
    } else {
      throw new Error("Only clients info is provided here, pls use client id!");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateTask = async (req, res) => {
  try {
    let { title, status } = req.body;

    const task = await Task.findOne({ title });
    if (!task) {
      throw new TaskNotFound(title);
    }
    if (status == "finished") {
      task.status = status;
      task.finishedAt = new Date();
    } else {
      task.status;
    }

    if (req.file && !req.fileError) {
      task.image = req.file.filename;
    }

    if (req.fileError) {
      throw new Error(req.fileError);
    }

    await task.save();

    res.json("task is upadate!");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = await Task.findOneAndDelete({ title });
    if (!task) {
      throw new TaskNotFound(title);
    }
    res.json("task deleted!");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskByUser,
  getTaskByClient,
  deleteTask,
  updateTask,
};
