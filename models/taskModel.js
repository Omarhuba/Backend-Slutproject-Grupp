
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
    image: {
      type: String

    },

    status: { type: String,enum:['work-in-progress','finished'], default: 'work-in-progress'},

    creator_id: {
      type: String
    },
    client_id: {
      type: String
    },

    finishedAt:{
      type: String,
    }
  },
  {
    timestamps: true
  }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = { Task}
