const express = require('express')
const app = express()
const { readdirSync } = require('fs')
const { byggfirmaDB } = require("./database/connection")
const{errorHandler} = require('./middleware/errorHandler')


const morgan = require('morgan')
require('dotenv').config()

app.use(express.static("public"));
app.set("view engine", "ejs"); // If we use frontend for web-chat
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


// websocket


// routers

readdirSync('./routes').map((route) => app.use('/api', require(`./routes/${route}`)))

// app.use(errorHandler)



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    byggfirmaDB();
    console.log(`SERVER STARTED ON PORT: ${PORT}`)
})


