const {Router} = require('express');
const auth = require('../middleware/auth.middleware');
const Message = require('../models/Message');
const Dialog = require('../models/Dialog');
const User = require('../models/User');

const router = Router();

// api/message/new
router.post('/new', auth, async (req, res) => {

    try {
        const owner = req.user.userId
        const recipient = req.body.recipient
        const text = req.body.text
        const dialogId = req.body.dialogId

        const date_obj = new Date();

        let day = date_obj.getDate();
        if (day < 10) day = '0' + day;

        let month = date_obj.getMonth() + 1;
        if (month < 10) month = '0' + month;

        let year = date_obj.getFullYear();

        let hours = date_obj.getHours();
        if (hours < 10) hours = '0' + hours;

        let minutes = date_obj.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;

        let seconds = date_obj.getSeconds();
        if (seconds < 10) seconds = '0' + seconds;

        const time = `${day}/${month}/${year} ${hours}:${minutes} ${seconds}`;

        const message = new Message({
            text,
            owner,
            recipient,
            time,
            status: false,
            dialogId
        })

        await message.save()

        const dialog = await Dialog.findById(dialogId)

        dialog.last_message = text
        dialog.last_message_time = time
        dialog.last_message_owner = owner
        dialog.last_message_status = false
        dialog.messages.push(message.id)

        await dialog.save()

        res.status(200).json("ok")

    } catch (e) {
        res.status(500).json({ message: "Error" })
    }

})

// api/message/find/:id
router.get('/find/:id', auth, async (req, res) => {

    try {
        const dialogId = req.params.id
        const userId = req.user.userId

        const user = await User.findById(userId)
        if (user.dialogs.indexOf(dialogId) === -1) {
            return res.status(401).json({ message: "You don't have permission" })
        }

        const docs = await Message.find({ "dialogId": dialogId }).sort({time: -1})
        res.json(docs)

    } catch (e) {
        res.status(500).json({ message: "Error" })
    }

})

module.exports = router;