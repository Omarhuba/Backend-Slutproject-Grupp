require("dotenv").config();
const mongoose = require("mongoose");

const { DATABASE_URL } = process.env;

const byggfirmaDB = async () => {
  await mongoose.connect(`${DATABASE_URL}byggfirma`);

  console.log("connected");
};

module.exports = { byggfirmaDB };
