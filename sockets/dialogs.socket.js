let online = require('../online_users')
const Dialog = require('../models/Dialog')
const User = require('../models/User')

module.exports = (socket,io) => {

    socket.on('newDialog', (dialogId) => {
        findDialog(dialogId).then((dialog) => {
            const p1 = JSON.stringify(dialog.participant1_id);
            const userId = JSON.stringify(socket.userId)
            const userId2 = p1 === userId ? dialog.participant2_id : dialog.participant1_id
            console.log(userId2)
            findUser(userId2).then((user) => {
                const newDialog = {
                    dialog: {
                        id: dialog.id,
                        participant1_id: dialog.participant1_id,
                        participant2_id: dialog.participant2_id,
                        last_message: dialog.last_message,
                        last_message_time: dialog.last_message_time,
                        last_message_owner: dialog.last_message_owner,
                        last_message_status: dialog.last_message_status
                    },
                    name: user.name, photo: user.photo, id: user.id, status: user.status
                }
                online.dialogs[dialogId] = online.usersById[socket.userId].concat(online.usersById[user.id])
                online.dialogs[dialogId].map((socketId) => {
                    if (online.users[socketId] !== socket.userId)
                        io.to(socketId).emit('newDialog', { dialogId, newDialog })
                })
            })
        })
    })

    const findDialog = async (dialogId) => {
        return Dialog.findById(dialogId)
    }

    const findUser = async (id) => {
        return User.findById(id)
    }
}