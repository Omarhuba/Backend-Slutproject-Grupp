
require('dotenv').config()
const mongoose = require('mongoose')

const {DATABASE_URL} = process.env

const byggfirmaDB = async () => {

await mongoose.connect(`${DATABASE_URL}byggfirma`)

console.log('connected')


}

// Call function here to avoid calling in every indv. pages.
byggfirmaDB()

module.exports = {byggfirmaDB}
