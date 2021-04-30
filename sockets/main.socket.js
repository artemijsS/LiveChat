module.exports = (socket,io) => {
    socket.on('userOnline', (userId) => {
        console.log(userId)
        socket.userId = userId
        // socket.broadcast.emit('hello', 'HELLO WORLD!!!'+userId);
        // io.emit('hello', 'HELLO WORLD!!!'+userId);
    })
    socket.on('disconnect', () => {
        console.log('User disconnected', socket.userId)
    })
}