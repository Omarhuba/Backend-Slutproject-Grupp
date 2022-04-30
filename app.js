const express = require('express')
const app = express()
const { register } = require('./controllers/auth/resisterControll')
const {login} = require('./controllers/auth/loginControll')

const morgan = require('morgan')
require('dotenv').config()

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

// routers
app.post('/register', register)
app.post('/login', login)



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT: ${PORT}`)
})


