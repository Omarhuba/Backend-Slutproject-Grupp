const express = require('express')
const app = express()
const { readdirSync } = require('fs')
const {byggfirmaDB}= require("./database/connection")


const morgan = require('morgan')
require('dotenv').config()

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// cookie-session
const session = require('cookie-session')
app.use(session({
    name: 'session',
    keys: [process.env.SESSION_SECRET]
}))

// websocket

const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server)
const { socketAuth, socketConnection } = require('./controllers/socket/socketControllers')

io.use(socketAuth)
.on('connection', socketConnection)


// routers

readdirSync('./routes').map((route) => app.use('/api', require(`./routes/${route}`)))


app.get('/', (req, res) => {
    res.render('pages/chat')
})



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    byggfirmaDB();
    console.log(`SERVER STARTED ON PORT: ${PORT}`)
})


