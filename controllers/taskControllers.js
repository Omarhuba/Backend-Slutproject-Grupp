
const { Task } = require("../models/taskModel");
const { User } = require("../models/userModel");


const createTask = async (req, res) => {
  try {
    const { title, desc, done, workerEmail, clientEmail, finishedAt } = req.body;
    const worker = await User.findOne({ email:workerEmail})
    const client = await User.findOne({email:clientEmail})
    const task = await new Task({
      title,
      desc,
      done,
      worker_id:worker._id,
      client_id:client._id,
      finishedAt

    })

    await task.save();
    res.json({ task , message:'A new task created!'})
  }catch(error){
    res.status(400).json(error.message)
  }
};

const getAllTasks = async (req, res) => {
  try{
      const allTasks = await Task.find({}).exec()
      res.json(allTasks)
  } catch (error)
  {
      res.status(400).json(error.message);;
  }

}

const getTaskByWorkers = async (req, res) => {
  try{
      const allTasks = await Task.find({}).exec()
      res.json(allTasks)
  } catch (error)
  {
      res.status(400).json(error.message);;
  }

}





module.exports = { createTask, getAllTasks };
