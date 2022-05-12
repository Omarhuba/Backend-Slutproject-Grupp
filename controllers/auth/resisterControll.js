const { User } = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, address, email, password, role } = req.body;
  const userFound = await User.findOne({ email }).exec();

  try {
    if (!userFound) {
      const user = await new User({
        name,
        address,
        email,
        password,
        role,
      });

      await user.save();

      user.comparePassword(password, async (err, isMatched) => {
        if (err) {
          throw new Error("Something is wrong!");
        } else {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });

          const newUser = await User.findOne({ _id: user._id }).select(
            "-password"
          );

          res.json({ newUser, token, message: "User created successfully!" });
        }
      });
    } else {
      throw new Error("User already exist!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports = { register };
