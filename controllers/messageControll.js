
const { Message } = require('../models/messageModel')
const {User} = require('../models/userModel')
const {Task} = require('../models/taskModel')
require('../database/connection')




const createMessage = async (req, res) => {
    try {
        const { title, email, content } = req.body;
        console.log('CQa ' + req.body.title)
        const senders = await User.findOne({ email }).exec()
        console.log('CQb ' + senders._id)

        const tasks = await Task.findOne({ title}).exec()
        console.log('CQc ' + tasks._id)

    const message =  await new Message({
        sender_id:senders._id,
        task_id:tasks._id,
        content

    })

    await message.save()
    res.json(message)

    } catch (error) {
      res.status(400).json(error.message);
    }
};


const getMessageByTask = async (req, res, next) => {

    try {
        const id = req.params.id
        const tasksMessages = await Message.find({task_id:id}).exec()
        // const messagesIDs = await Messages.find({})

        res.json(tasksMessages)
        // console.log(messagesIDs)



        next()


    }catch(error){
        res.status(400).json(error.message)
    }


}

  module.exports = {createMessage, getMessageByTask}