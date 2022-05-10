import {io} from '/socket.io/socket.io.esm.min.js'

let socket = null
const connectBtn = document.querySelector('.message-container .connect-btn')
const disconnectBtn = document.querySelector('.message-container .disconnect-btn')
const textField = document.querySelector('.container .message-text')
const sendBtn = document.querySelector('.container .btn-message')
const container = document.querySelector('.message-container .container')
const toggleDiv = document.querySelector('.message-container .toggle')
const mgsDisplay = document.querySelector('.container .message-display')
const mgsStorage = []
let newMgs = 'No message yet for you!'

connectBtn.addEventListener('click', () => {
    socket = io({
        auth: {
            token: 'mytoken'
        }
    })

    socket.on('connect_error', (error) => {
        console.log(error)
        connectionStatus.innerText = 'Error'
    })

    socket.on('listen', mgs => {
        newMgs = mgs
    })

    connectBtn.style.display = 'none'
    disconnectBtn.style.display = 'block'
    container.style.display = 'block'
    toggleDiv.style.display = 'none'
})

disconnectBtn.addEventListener('click', () => {
    socket.disconnect()
    socket = null

    connectBtn.style.display = 'block'
    disconnectBtn.style.display = 'none'
    container.style.display = 'none'
    toggleDiv.style.display = 'flex'
})

sendBtn.addEventListener('click', () => {
    const { value } = textField
    socket.emit('send', value)
    let now = new Date()
    let times = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
    const singleMgs = { text: newMgs, time: times }
    mgsStorage.push(singleMgs)

    uniqueText(mgsStorage)
    textField.value = ''
})

function uniqueText(newArray) {
    newArray.forEach(message => {
        const mgsTextTag = document.createElement('p')
        const mgsTimeTag = document.createElement('p')
        mgsTextTag.innerText = message.text
        mgsTimeTag.innerText = message.time
        mgsDisplay.appendChild(mgsTextTag)
        mgsDisplay.appendChild(mgsTimeTag)
    })
}
