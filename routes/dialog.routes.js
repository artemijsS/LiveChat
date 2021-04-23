const {Router} = require('express');
const auth = require('../middleware/auth.middleware')

const Dialog = require('../models/Dialog');
const User = require('../models/User');

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

        const dialogs = await Dialog.find({'_id': { $in: dialogsAr }}).sort({last_message_time: -1})

        let answer = {}
        let order = []
        for (const obj of dialogs) {
            const p1 = JSON.stringify(obj.participant1_id);
            const userId = JSON.stringify(user.id);
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
                name: data.name, photo: data.photo, id: data.id, status: data.status
            })
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

            const dialog = new Dialog({
                participant1_id: userId,
                participant2_id: userId2
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

module.exports = router;