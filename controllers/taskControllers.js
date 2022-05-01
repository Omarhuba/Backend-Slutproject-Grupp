require("../database/connection");
const { Task } = require("../models/taskModel");

const createTask = async (req, res) => {
  const { title, desc, done, worker_id, client_id } = req.body;
  const newTask = async () => {
    try {
      const task = await new Task({
        title,
        desc,
        done,
        worker_id,
        client_id,
      });
      await task.save();
    } catch (err) {
      console.log(err);
    }
  };
  newTask();
  res.json({
    title,
    desc,
    done,
    worker_id,
    client_id,
    msg: "new task is created!",
  });
};

const allTask = async () => {
  const task = await Task.find();
  console.log(task);
};
allTask();

module.exports = { createTask };
