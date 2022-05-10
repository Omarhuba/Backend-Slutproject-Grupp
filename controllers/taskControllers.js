
const { Task } = require("../models/taskModel");
const { User } = require("../models/userModel");
const { TaskNotFound } = require('../error')


const createTask = async (req, res) => {
  try {
    const { title, desc, clientEmail, finishedAt } = req.body;
    // console.log(req.body);
    const { id } = req.user

    let filename = ''

    if (req.file && !req.fileError) {
      filename = req.file.filename
    }

    if(req.fileError) {
      throw new Error(req.fileError)
    }


    const user = await User.findById({ _id: id }).select("-password")

    const client = await User.findOne({ email: clientEmail })
    const task = await new Task({
      title,
      desc,
      image:filename,
      worker_id: user._id,
      client_id: client._id,
      finishedAt

    })

    // await task.image.push(filename)

    await task.save();
    res.json({ task, message: 'A new task created!' })
  } catch (error) {
    res.status(400).json(error.message)
  }
};

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({}).exec()
    res.json(allTasks)
  } catch (error) {
    res.status(400).json(error.message);;
  }

}

// ???
const getTaskByWorker = async (req, res) => {
  try {
    const id = req.params.id
    const tasks = await Task.find({ worker_id: id }).exec()
    if(tasks.length < 1 ){ throw new TaskNotFound(id)}
    res.json(tasks)
  } catch (error) {
    res.status(400).json(error.message);;
  }

}


const updateTask = async (req, res) => {
  try {
    let { title, status } = req.body

    const task = await Task.findOne({ title })
    if(!task ){ throw new TaskNotFound(title)}
    if (status == 'finished') {
      task.status = status
      task.finishedAt = new Date()
    } else {
      task.status
    }


    if (req.file && !req.fileError) {
      task.image = req.file.filename
    }

    if(req.fileError) {
      throw new Error(req.fileError)
    }


    await task.save()

    res.json('task is upadate!')
  } catch (error) {
    res.status(400).json(error.message);
  }
}


const deleteTask = async (req, res) => {
  try {
    const { title } = req.body
   const task =  await Task.findOneAndDelete({ title })
    if(!task ){ throw new TaskNotFound(title)}
    res.json('task deleted!')
  } catch (error) {
    res.status(400).json(error.message);
  }
}




module.exports = { createTask, getAllTasks, getTaskByWorker, deleteTask, updateTask };
