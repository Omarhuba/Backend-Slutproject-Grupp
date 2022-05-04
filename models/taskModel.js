
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      unique:true,
      required: true
    },
    desc: {
      type: String,
      trim: true
    },
    done: {
      type: Boolean,
      required: true
    },
    image: {
      data: Buffer,
      contentType: String
    },
    status: {
      type: String, default:'Task is in progress!'
    },
    worker_id: {
      type: String
    },
    client_id: {
      type: String
    },

    finishedAt:{
      type: String,
    }

    // messages: {
    //   type: Array, default: ['Hi! Task has been!']
    // }
  },
  {
    timestamps: true
  }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = { Task}
