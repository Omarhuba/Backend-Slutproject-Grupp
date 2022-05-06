
const { Message } = require('../models/messageModel')
const {User} = require('../models/userModel')
const {Task} = require('../models/taskModel')

const createMessage = async (req, res) => {
    try {

        const { title, content } = req.body;
        const sender_id = req.user._id
            console.log('akjdhöksjfhaöskdj'+ req.user);

            const tasks = await Task.findOne({ title }).exec()
            console.log(tasks);
            console.log('task'+ tasks);

    const message =  await new Message({

        sender_id,

        task_id:tasks._id.toString(),
        content

    })

    await message.save()
    res.json(message)

    } catch (error) {
      res.status(400).json(error.message);
    }
}


const getMessageByTask = async (req, res, next) => {

    try {
        const id = req.params.id
        const tasksMessages = await Message.find({task_id:id}).exec()
        res.json(tasksMessages)

     next()

    }catch(error){
        res.status(400).json(error.message)
    }

}


const getALLmessages = async (req, res, next) => {

    try {

    const messages = await Message.find({}).exec()

    res.json(messages)
        next()

    }catch(error){
        res.status(400).json(error.message)
    }
}



  module.exports = {createMessage, getMessageByTask, getALLmessages}