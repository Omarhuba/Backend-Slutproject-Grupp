const jwt = require('jsonwebtoken')

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

const requireAuthAdmin = (req,res,next)=>{
    if(!req.headers.authorization){
        console.log(req.headers.authorization);
       return res.json({msg: 'please logen first!'})
    }
    try{
        const token = req.headers.authorization.replace("Bearer ", "")
        const userData = jwt.verify(token, process.env.JWT_SECRET)
        if(userData.role !== 'admin'){
            throw new Error('Forbidden')
          }

        next()

    }catch(error){
        res.status(400).json( error.message)

    }

}

module.exports = {requireAuthAdmin, requireAuthUser}