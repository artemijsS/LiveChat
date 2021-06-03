let online = require('../online_users')
const Dialog = require('../models/Dialog')
const User = require('../models/User')

module.exports = (socket,io) => {

    socket.on('newDialog', (dialogId) => {
        findDialog(dialogId).then((dialog) => {
            const p1 = JSON.stringify(dialog.participant1_id);
            const userId = JSON.stringify(socket.userId)
            const userId2 = p1 === userId ? dialog.participant2_id : dialog.participant1_id
            findUser(socket.userId).then((user) => {
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
                    name: user.name, photo: user.photo, id: user.id, status: user.status, description: user.description, email: user.email, telephone: user.telephone
                }
                online.dialogs[dialogId] = online.usersById[socket.userId].concat(online.usersById[userId2])
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

    socket.on('dialogDelete', (dialogId, id) => {
        if (id) {
            console.log('na4alo - ',online.dialogs[dialogId])
            findDialog(dialogId).then((dialog) => {
                findUser(dialog.ex_id).then((user) => {
                    if (online.dialogs[dialogId].length > 1) {
                        let remove = []
                        for (let i = 0; i < online.dialogs[dialogId].length; i++) {
                            const socketId = online.dialogs[dialogId][i]
                            if (online.users[socketId] === id) {
                                io.to(socketId).emit('dialogDelete', dialogId, user.name)
                                remove.push(i)
                            }
                        }
                        console.log(remove)
                        for (let i = remove.length - 1; i >= 0; i--)
                            online.dialogs[dialogId].splice(remove[i], 1);
                        console.log('konec - ',online.dialogs[dialogId])
                    } else {
                        delete online.dialogs[dialogId]
                    }
                })
            })
        }
    })

}