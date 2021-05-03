let online = require('../online_users')
const User = require('../models/User');

module.exports = (socket,io) => {

    socket.on('userOnline', (userId) => {
        socket.userId = userId
        online.users[socket.id] = userId
        if (online.usersById[userId]) {
            online.usersById[userId].push(socket.id)
        } else {
            online.usersById[userId] = [socket.id]
        }

        console.log(online.usersById)

        changeStatus(userId, true).then((user) => {
            user.dialogs.map((dialogId) => {
                if (online.dialogs[dialogId]) {
                    online.dialogs[dialogId].map(socketId => {
                        if (online.users[socketId] !== socket.userId)
                            io.to(socketId).emit('userOnline', {dialogId, status: true})
                    })
                    online.dialogs[dialogId].push(socket.id)
                } else {
                    online.dialogs[dialogId] = [socket.id]
                }
            })
        })
    })

    socket.on('disconnect', () => {

        if (online.usersById[socket.userId] && online.usersById[socket.userId].length === 1) {
            changeStatus(socket.userId, false).then(deleteOnlineDialog)
        } else {
            findUser(socket.userId).then((user) => {
                user.dialogs.map((dialogId) => {
                    if (online.dialogs[dialogId].length > 1) {
                        online.dialogs[dialogId].splice(online.dialogs[dialogId].indexOf(socket.id), 1)
                    } else {
                        delete online.dialogs[dialogId]
                    }
                })
            })
        }

        if (online.usersById[socket.userId])
            online.usersById[socket.userId].splice(online.usersById[socket.userId].indexOf(socket.id), 1)

        delete online.users[socket.id]
        console.log(online.users)
    })

    const changeStatus = async (userId, status) => {
        const user = await User.findById(userId);
        user.status = status
        await user.save()
        return user
    }

    const findUser = async (userId) => {
        return User.findById(userId);
    }

    const deleteOnlineDialog = (user) => {
        user.dialogs.map((dialogId) => {
            if (online.dialogs[dialogId].length > 1) {
                online.dialogs[dialogId].map(socketId => {
                    if (online.users[socketId] !== socket.userId)
                        io.to(socketId).emit('userOnline', {dialogId, status: false})
                })
                online.dialogs[dialogId].splice(online.dialogs[dialogId].indexOf(socket.id), 1)
            } else {
                delete online.dialogs[dialogId]
            }
        })
    }
}