const express = require('express')
const app = express()

const morgan = require('morgan')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// websocket

// routers




const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    consol.log(`SERVER STARTED ON PORT: ${PORT}`)
})


