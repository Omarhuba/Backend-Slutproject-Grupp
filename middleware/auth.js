const jwt = require('jsonwebtoken')

const { User } = require('../models/userModel')

const requireAuthUser = async (req, res, next) => {
    if (!req.headers.authorization) {
        console.log(req.headers.authorization);
        return res.json({ msg: 'please logen first!' })
    }
    try {
        const token = req.headers.authorization.replace("Bearer ", "")
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById({ _id: tokenData._id }).select('-password')

        req.user = user

        // console.log('TEST USER AUTH', req.user);

        next()

    } catch (error) {
        res.status(400).json(error.message)

    }

}

const requireAuthAdminWorker = async (req, res, next) => {
    if (!req.headers.authorization) {
        console.log(req.headers.authorization);
        return res.json({ msg: 'please logen first!' })
    }
    try {
        const token = req.headers.authorization.replace("Bearer ", "")
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById({ _id: tokenData._id })

        console.log(user.role);

        if (user.role == "client") {
            throw new Error('Forbidden')
        }

        req.user = user

        // console.log('TEST AW AUTH', req.user);

        next()



    } catch (error) {
        res.status(400).json(error.message)

    }

}

const requireAuthAdmin = async (req, res, next) => {
    if (!req.headers.authorization) {
        console.log(req.headers.authorization);
        return res.json({ msg: 'please logen first!' })
    }
    try {
        const token = req.headers.authorization.replace("Bearer ", "")
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById({ _id: tokenData._id })
        console.log(user.role);

        if (user.role != "admin") {
            console.log(user.role);
            throw new Error('Forbidden')
        }

        req.user = user

        // console.log('TEST ADMIN AUTH', req.user);

        next()


    } catch (error) {
        res.status(400).json(error.message)

    }

}

module.exports = { requireAuthUser, requireAuthAdminWorker, requireAuthAdmin }