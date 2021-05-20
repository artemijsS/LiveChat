const {Router} = require('express');
const auth = require('../middleware/auth.middleware');
const {check, validationResult} = require('express-validator')

const User = require('../models/User');

const router = Router();

// api/user/find
router.post('/find', auth, async (req, res) => {

    try {
        const id = req.user.userId
        const user = await User.findById(id)
        const telephone = req.body.telephone

        const docs = await User.find({
            telephone: {$regex: telephone, $options: 'i'},
            $and: [ {_id: { $ne: id }}, {_id: { $not: { $in: user.friends }} }]},"name telephone")

        res.json(docs)
    } catch (e) {
        res.status(500).json({ message: "Error" })
    }

})

// api/user/updateName
router.post('/updateName', auth, [
        check('name', 'Name can not be empty').notEmpty()
    ],
    async (req, res) => {

        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Name can not be empty"
                })
            }

            const id = req.user.userId
            const user = await User.findById(id)

            user.name = req.body.name
            await user.save()
            res.json({ name: req.body.name })

        } catch (e) {
            res.status(500).json({ message: "Error" })
        }

})

// api/user/updateAbout
router.post('/updateAbout', auth, async (req, res) => {

        try {

            const id = req.user.userId
            const user = await User.findById(id)

            user.description = req.body.about

            await user.save()
            res.json({ about: req.body.about })

        } catch (e) {
            res.status(500).json({ message: "Error" })
        }

    })


module.exports = router;