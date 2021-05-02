let online = require('../online_users')

module.exports = (socket,io) => {

    socket.on('newMessage', (message) => {
        online.dialogs[message.dialogId].map(socketId => {
            io.to(socketId).emit('newMessage', message)
        })
    })
}