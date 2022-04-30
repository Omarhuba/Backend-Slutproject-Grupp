
const { Users } = require('../../models/userModel')
require('../../database/connection')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
    const { email, password } = req.body;

      // check if user with the email above exist
        let user = await Users.findOne({ email }).exec();
        if (!user) throw new Error('User not found!')

      // compare password before generating token
      user.comparePassword(password, async(err, isMatched)=>{
        if (err) {
            throw new Error('Loging problem :' + err)

        } else if (!isMatched) {

            res.status(400).json('Wrong password!')

        }
        else {

          // Generate token
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

              // Exclude user password before sending json response
              const userData = await Users.findOne({ _id: user._id }).select("-password")

              /* ??? req.session ???
                  session code goes here.......
              */

          //Send json response with particular data

            res.json({userData, token })
         }

    })

    } catch (error) {
      res.status(400).json(error.message);
    }
  };

  module.exports = {login}