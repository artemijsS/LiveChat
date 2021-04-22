const {Router} = require('express');
const auth = require('../middleware/auth.middleware')

const User = require('../models/User');

const router = Router();

// api/user/find
router.get('/find', auth, async (req, res) => {

    try {
        const id = req.user.userId
        const user = await User.findById(id)

        console.log(user.id)

    } catch (e) {
        res.status(500).json({ message: "Error" })
    }

})

module.exports = router;