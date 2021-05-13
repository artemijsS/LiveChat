let online = require('../online_users')
const Message = require('../models/Message')
const Dialog = require('../models/Dialog')

module.exports = (socket,io) => {

    socket.on('newMessage', (message) => {
        online.dialogs[message.dialogId].map(socketId => {
            io.to(socketId).emit('newMessage', message)
        })
    })

    socket.on('messageAllStatus', (obj) => {
        findMessages(obj.dialogId, obj.id).then(() => {
            online.dialogs[obj.dialogId].map((socketId) => {
                if (online.users[socketId] !== obj.id)
                    io.to(socketId).emit('messageAllStatus', { dialogId: obj.dialogId })
            })
        })
    })

    const findMessages = async (dialogId, id) => {
        await Message.updateMany({ dialogId: dialogId, recipient: id, status: false }, { status: true })
        const dialog = await Dialog.findById(dialogId)
        if (dialog.last_message_owner !== id) {
            dialog.last_message_status = true
            await dialog.save()
        }
    }
}