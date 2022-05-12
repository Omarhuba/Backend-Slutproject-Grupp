const { User } = require("../models/userModel");
const { byggfirmaDB } = require("./connection");

const users = require("./user.json");

const createUsers = async () => {
  await User.deleteMany({});

  users.forEach(async (user) => {
    const newUsers = await new User(user);
    await newUsers.save();
  });

  console.log(`DONE! ${users.length} USERS HAVE BEEN INSERTED INTO DB.`);
};

byggfirmaDB();
createUsers();
