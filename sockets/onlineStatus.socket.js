let online = require('../online_users')
const User = require('../models/User');

module.exports = (socket,io) => {

    socket.on('userOnline', (userId) => {
        socket.userId = userId
        online.users[socket.id] = userId

        console.log(online.users)

        updateOnlineStatus(true, userId)
    })

    socket.on('disconnect', () => {

        updateOnlineStatus(false, socket.userId, true)

        delete online.users[socket.id]
        console.log(online.users)
    })

    const updateOnlineStatus = (status, userId, del = false) => {
        const findUser = async (status) => {
            const user = await User.findById(userId);
            user.status = status
            await user.save()
            return user
        }

        findUser(status).then(user => {
            user.dialogs.map((dialogId) => {
                if (online.dialogs[dialogId]) {
                    if (online.dialogs[dialogId].length === 1 && del) {
                        delete online.dialogs[dialogId]
                    } else if (online.dialogs[dialogId].length > 1 && del) {
                        online.dialogs[dialogId].splice(online.dialogs[dialogId].indexOf(socket.id), 1)
                    }
                    if (online.dialogs[dialogId]) {
                        online.dialogs[dialogId].map(socketId => {
                            io.to(socketId).emit('userOnline', {dialogId, status: status})
                        })
                    }
                    if (!del)
                        online.dialogs[dialogId].push(socket.id)
                } else {
                    online.dialogs[dialogId] = [socket.id]
                }
            })
            // console.log(online.dialogs)
        }, er => {
            console.log(er)
        })
    }
}