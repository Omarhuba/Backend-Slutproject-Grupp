const express = require('express')
const app = express()

const morgan = require('morgan')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// websocket

// routers




const port = process.env.PORT || 5000
app.listen(port, () => {
    consol.log('Server listening on port '+ port)
})


