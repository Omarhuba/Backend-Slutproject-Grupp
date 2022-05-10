const socketAuth = (socket, next) => {
    console.log(socket.handshake);
    if(socket.handshake.auth.token != 'grillkorv'){
      next(new Error('Unauthorized'))
    }else{
      next()
    }
  }


const socketConnection = socket => {
    console.log("Client connected with ID: " + socket.id);

    socket.on('disconnect', () => {
      console.log("Client disconnected");
    })

    socket.on('listen', message => {
      console.log('Recieved: ' + message + ' from ' + socket.id)
      socket.broadcast.emit('send', message)
    })
}

module.exports= {socketAuth, socketConnection}