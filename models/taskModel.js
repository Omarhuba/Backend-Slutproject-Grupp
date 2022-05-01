const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    done: {
      type: Boolean,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    tasksInProgress:{
        type: Array, default:[]
    },
    worker_id: {
      type: Number,
    },
    client_id: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
