const { User } = require("../models/userModel");

const getUser = async (req, res) => {
  try {
    const { role } = req.query;
    const allUsers = await User.find({}).exec();
    if (role) {
      const userByRole = allUsers.filter((user) => user.role == role);
      res.json(userByRole);
    } else {
      res.json(allUsers);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const data = Object.keys(req.body);
    const { _id } = req.user;

    const user = await User.findById({ _id }).select("-password");

    data.forEach((key) => {
      if (key && key !== "role") {
        console.log(key);
        user[key] = req.body[key];
      }
    });
    await user.save();

    res.json("User info updated!");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    await User.deleteOne({ email });
    res.json("user deleted!");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { getUser, updateUser, deleteUser };
