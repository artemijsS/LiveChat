const {Router} = require('express');
const auth = require('../middleware/auth.middleware')

const Dialog = require('../models/Dialog');
const User = require('../models/User');
const Message = require('../models/Message');

const router = Router();

// api/dialog/find
router.get('/find', auth, async (req, res) => {

    try {
        const userId = req.user.userId

        const user = await User.findById(userId)

        if (!user) {
            return res.status(401).json({message: "No Auth"})
        }

        const dialogsAr = user.dialogs

        const dialogs = await Dialog.find({'_id': { $in: dialogsAr }}).sort({last_message_created_at: -1})

        let answer = {}
        let order = []
        for (const obj of dialogs) {
            const userId = JSON.stringify(user.id);
            if (obj.participant2_id && obj.participant1_id) {
                const p1 = JSON.stringify(obj.participant1_id);
                const data = await User.findById(p1 === userId ? obj.participant2_id : obj.participant1_id)
                order.push(obj.id)
                answer[obj.id] = ({
                    dialog: {
                        id: obj.id,
                        participant1_id: obj.participant1_id,
                        participant2_id: obj.participant2_id,
                        last_message: obj.last_message,
                        last_message_time: obj.last_message_time,
                        last_message_owner: obj.last_message_owner,
                        last_message_status: obj.last_message_status
                    },
                    name: data.name, photo: data.photo, id: data.id, status: data.status, description: data.description, email: data.email, telephone: data.telephone
                })
            } else {
                const user2 = await User.findOne(dialogs.ex_id)
                order.push(obj.id)
                answer[obj.id] = ({
                    dialog: {
                        id: obj.id,
                        participant1_id: obj.participant1_id,
                        participant2_id: obj.participant2_id,
                        last_message: obj.last_message,
                        last_message_time: obj.last_message_time,
                        last_message_owner: obj.last_message_owner,
                        last_message_status: obj.last_message_status
                    },
                    name: user2.name, photo: 'DR7pkQw8DqX4F8FmUIHw_a5YEzo0gP3nHOptm6apiyzg_xEs_VcyQq9pQEH6FdY0wOl95xh8_hkepcq', id: '', status: false, description: 'Recipient deleted this chat', email: 'DELETED', telephone: 'DELETED', deleted: true
                })
            }
        }
        res.json({answer, order});
    } catch (e) {
        res.status(500).json({ message: "Error" })
    }

})

// api/dialog/new
router.post('/new', auth, async (req, res) => {

    try {
        const userId = req.user.userId
        const userId2 = req.body.userId

        const isDialog = await Dialog.findOne({$or: [{participant1_id: userId, participant2_id: userId2}, {participant1_id: userId2, participant2_id: userId}]})

        if (isDialog) {
            return res.status(500).json({ message: "This dialog already exist" })
        }

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

        const dialog = new Dialog({
            participant1_id: userId,
            participant2_id: userId2,
            last_message_time: time,
            last_message_created_at: date_obj.toISOString()
        })

        await dialog.save()

        const user1 = await User.findById(userId);
        user1.dialogs.push(dialog.id);
        user1.friends.push(userId2);
        await user1.save();

        const user2 = await User.findById(userId2);
        user2.dialogs.push(dialog.id);
        user2.friends.push(userId);
        await user2.save();

        res.json(dialog.id)
    } catch (e) {
        res.status(500).json({ message: "Error" })
    }

})

// api/dialog/delete
router.post('/delete', auth, async (req, res) => {

    try {
        const dialogId = req.body.dialogId

        const user = await User.findById(req.user.userId)
        const dialog = await Dialog.findById(dialogId)

        if (JSON.stringify(dialog.participant1_id) !== JSON.stringify(user.id) && JSON.stringify(dialog.participant2_id) !== JSON.stringify(user.id)) {
            res.status(500).json({ message: "Error" })
            return false
        }

        if (dialog.participant1_id && dialog.participant2_id) {
            const user2 = await User.findById(req.body.id)
            user.friends.splice(user.friends.indexOf(user2.id), 1)
            user.dialogs.splice(user.dialogs.indexOf(dialogId), 1)
            user2.friends.splice(user.friends.indexOf(user.id), 1)
            dialog.ex_id = user2.id
            if (JSON.stringify(dialog.participant1_id) === JSON.stringify(user.id)) {
                dialog.participant1_id = null
            } else {
                dialog.participant2_id = null
            }
            await dialog.save()
            await user.save()
            await user2.save()
            res.status(200).json({status: "OK"})
            return true
        }

        user.friends.splice(user.friends.indexOf(dialog.ex_id), 1)
        user.dialogs.splice(user.dialogs.indexOf(dialog.id), 1)

        await Message.deleteMany({dialogId: dialogId})
        await user.save()
        await Dialog.deleteOne({_id: dialogId})

        res.status(200).json({status: "OK"})
    } catch (e) {
        res.status(500).json({ message: "Error" })
    }

})

module.exports = router;