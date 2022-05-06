
const { Task } = require("../models/taskModel");
const { User } = require("../models/userModel");


const createTask = async (req, res) => {
  try {
    const { title, desc, done, clientEmail, finishedAt } = req.body;
    // console.log(req.body);
    const { id } = req.user

    let originalname = ''
    if (req.file) {
      originalname = req.file.originalname
    }
    console.log(req.file)


   const user = await User.findById({ _id: id }).select("-password")

    const client = await User.findOne({email:clientEmail})
    const task = await new Task({
      title,
      desc,
      done,
      image:originalname,
      worker_id:user._id,
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

// ???
const getTaskByWorker = async (req, res) => {
  try {
    const id = req.params.id
      const tasks = await Task.find({worker_id:id}).exec()
      res.json(tasks)
  } catch (error)
  {
      res.status(400).json(error.message);;
  }

}


const updateTask = async (req, res)=>{
  try {
    const { title, status } = req.body

    console.log(status)

    const task = await Task.findOne({ title })

    if (status == 'Done') {
      task.status = req.body.status
    } 

    console.log('hhhhhhhhhh', task);

    await task.save()

      res.json('task is upadate!')
  }catch(error){
      res.status(400).json(error.message);
  }
}


const deleteTask = async (req, res)=>{
  try{
      const {title} = req.body
      await Task.deleteOne({title})

      res.json('task deleted!')
  }catch(error){
      res.status(400).json(error.message);
  }
}




module.exports = { createTask, getAllTasks,getTaskByWorker, deleteTask , updateTask  };
