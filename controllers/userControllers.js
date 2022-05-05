
const { User } = require('../models/userModel')


const getAllUser = async (req, res) => {
   try{
       const allUsers = await User.find({}).exec()
       res.json(allUsers)
   } catch (error)
   {
       res.status(400).json(error.message);
   }
}


const getAllWorkers = async (req, res) => {
    try{
        const allWorker = await User.find({role:'worker'}).exec()
        res.json(allWorker)
    } catch (error)
    {
        res.status(400).json(error.message);;
    }


}


const getAllClients = async (req, res) => {
    try{
        const allClients = await User.find({role:'client'}).exec()
        res.json(allClients)
    } catch (error)
    {
        res.status(400).json(error.message);;
    }

}

const updateUser = async (req, res) => {

    try {
        const data = Object.keys(req.body)
        const { id } = req.user

        const user = await User.findById({ _id: id }).select("-password")
       
        data.forEach(key => {
            if (key && key !== 'role') {
                console.log(key);
                user[key] = req.body[key];
            }
        })
        await user.save()


        res.json({mgs:'User info updated!'})


    } catch (error)
    { res.status(400).json(error.message); }


}





module.exports={getAllUser, getAllWorkers, getAllClients,updateUser}