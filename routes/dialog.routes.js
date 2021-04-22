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
            res.status(401).json({message: "No Auth"})
        }

        const dialogsAr = user.dialogs

        const dialogs = await Dialog.find({'_id': { $in: dialogsAr }}).sort({last_message_time: -1})

        let answer = []
        for (const obj of dialogs) {
            const p1 = JSON.stringify(obj.participant1_id);
            const userId = JSON.stringify(user.id);
            const data = await User.findById(p1 === userId ? obj.participant2_id : obj.participant1_id);
            answer.push({dialog: obj, name: data.name, photo: data.photo, id: data.id, status: data.status})
        }

        res.json(answer);
    } catch (e) {
        res.status(500).json({ message: "Error" })
    }

})

// api/dialog/new
router.post('/new', auth, async (req, res) => {

        try {
            const userId = req.user.userId
            const userId2 = req.body.userId

            const dialog = new Dialog({
                participant1_id: userId,
                participant2_id: userId2
            })

            await dialog.save()

            const user1 = await User.findById(userId);
            user1.dialogs.push(dialog.id);
            await user1.save();

            const user2 = await User.findById(userId2);
            user2.dialogs.push(dialog.id);
            await user2.save();

            res.json(dialog.id)
        } catch (e) {
            res.status(500).json({ message: "Error" })
        }

    })

module.exports = router;