const jwt = require('jsonwebtoken')
const {User} = require('../models/userModel')




const requireAuthAdmin = async (req,res,next)=>{
    if(!req.headers.authorization){
        console.log(req.headers.authorization);
        return res.json({msg: 'please logen first!'})
    }
    try{
        const token = req.headers.authorization.replace("Bearer ", "")
        const userData = jwt.verify(token, process.env.JWT_SECRET)
        console.log(userData);
        req.user = {
        }
        const user = await User.findById({ _id: userData._id }).select("-password")
        console.log('User ', user);


        if(user.role != 'admin'){
            throw new Error('Forbidden')
        }

        next()

        req.user = {
            user
        }

    }catch(error){
        res.status(400).json( error.message)

    }

}

const requireAuthAdminWorker = async (req,res,next)=>{
    if(!req.headers.authorization){
        console.log(req.headers.authorization);
       return res.json({msg: 'please logen first!'})
    }
    try{
        const token = req.headers.authorization.replace("Bearer ", "")
        const userData = jwt.verify(token, process.env.JWT_SECRET)
        console.log(userData);
        req.user = {
        }
        const user = await User.findById({ _id: userData._id }).select("-password")
        console.log('User added ', user);


        if(  user.role != 'worker'){
            throw new Error('Forbidden')
          }

        next()

        req.user = {
            user
        }

    }catch(error){
        res.status(400).json( error.message)

    }

}




const requireAuthUser = (req,res,next)=>{
    if(!req.headers.authorization){
        console.log(req.headers.authorization);
       return res.json({msg: 'please logen first!'})
    }
    try{
        const token = req.headers.authorization.replace("Bearer ", "")
        const userData = jwt.verify(token, process.env.JWT_SECRET)

        req.user = {
            id:userData._id
        }
        next()

    }catch(error){
        res.status(400).json( error.message)

    }

}

module.exports = {requireAuthAdmin, requireAuthUser, requireAuthAdminWorker}