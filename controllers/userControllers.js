
const {User} = require('../models/userModel')

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
        const { name, newEmail,  } = req.body
        const { userData } = req.user
        console.log(userData);

        const update ={
            userName: name,
            email: newEmail,
        }

        await User.findOneAndUpdate(userData, update, {
            new: true,
            upsert: true, // Make this update into an upsert
            raw:true
        })

    //    const  newUser = await User.findOne({email:update.email})

        res.json({mgs:'User info updated!'})
        // console.log(newUser)

    } catch (error)
    { res.status(400).json(error.message); }


}





module.exports={getAllUser, getAllWorkers, getAllClients,updateUser}