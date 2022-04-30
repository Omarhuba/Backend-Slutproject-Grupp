/*
    Users will be able to login themselves, if they are created by admin.
    Admin needs resource to create users.
    It needs restrictions codes of user creation unless user role is admin.
    ??? in backend or in frontend ???
*/

const {Users}= require('../../models/userModel')
 require('../../database/connection')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {

    const { name, address, email, password,role } = req.body
    const userFound = await Users.findOne({email}).exec()
    try {
        if (!userFound) {

        const user =  await new Users({
                name,
                address,
                email,
                password,
                role

            })

            await user.save()

            user.comparePassword(password, async(err, isMatched)=>{
                if (err) {
                    throw new Error('Something is wrong!')
                } else {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })


                    // Exclude user password before sending json response
          const newUser = await Users.findOne({ _id: user._id }).select("-password")

          /* ??? req.session ???
              session code goes here.......
           */
                    res.json({newUser ,token, message: 'User created successfully!'})
                 }

            })

        } else {
            // throw new Error ('Forbidden!')
           throw new Error ('User already exist!')
        }



    } catch (error) {
      console.log(error)
        res.status(400).json(error.message)
    }



}

module.exports = {register}
