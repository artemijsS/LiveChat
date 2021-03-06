const mongoose = require("mongoose")
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
        dialog.last_message_created_at = message.created_at
        dialog.last_message_owner = owner
        dialog.last_message_status = false
        dialog.messages.push(message.id)

        await dialog.save()

        res.status(200).json(message)

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

        const docs = await Message.aggregate([
            {
                $match: {
                    'dialogId': mongoose.Types.ObjectId(dialogId)
                }
            },
            {
                $project: {
                    created_at: 1,
                    // created_at: {
                    //     $dateToString: { format:"%d/%m/%Y", date:"$created_at" }
                    // },
                    text:1,
                    owner:1,
                    recipient:1,
                    time:1,
                    status:1,
                    id: '$_id'
                }
            },
            {
                $group: {
                    _id: {
                        $add: [
                            { $dayOfYear: "$created_at"},
                            { $multiply:
                                    [400, {$year: "$created_at"}]
                            }
                        ]
                    },
                    msg: {
                        $push: {
                            text: '$text',
                            owner: '$owner',
                            recipient: '$recipient',
                            time: '$time',
                            status: '$status',
                            id: '$_id'
                        }
                    }
                }
            },
            {
                $sort: {
                    "_id":-1
                }
            }
        ])

        for (let i = 0; i < docs.length; i++) {
            docs[i].msg.reverse()
        }

        res.json(docs)

    } catch (e) {
        res.status(500).json({ message: "Error" })
    }

})

module.exports = router;