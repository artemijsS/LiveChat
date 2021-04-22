const {Router} = require('express');
const auth = require('../middleware/auth.middleware');

const User = require('../models/User');

const router = Router();

// api/user/find
router.post('/find', auth, async (req, res) => {

    try {
        const id = req.user.userId
        const user = await User.findById(id)
        const telephone = req.body.telephone

        const docs = await User.find({ telephone: {$regex: telephone, $options: 'i'}},"name telephone")
        //TODO написать проверку, есть ли этот юзер в уже в друзьях
        res.json(docs)
    } catch (e) {
        res.status(500).json({ message: "Error" })
    }

})

module.exports = router;