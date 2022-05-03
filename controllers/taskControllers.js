
require("../database/connection");
const { Task } = require("../models/taskModel");
const { User } = require("../models/userModel");


const createTask = async (req, res) => {
  try {
    const { title, desc, done, email, client_id,finishedAt } = req.body;
    const user = await User.findOne({email}).exec()
    const task = await new Task({
      title,
        desc,
        done,
      worker_id:user._id,
      client_id,
      finishedAt

    })

    await task.save();
    res.json({ task , message:'A new task created!'})
  }catch(error){
    res.status(400).json(error.message)
  }
};



module.exports = { createTask };
